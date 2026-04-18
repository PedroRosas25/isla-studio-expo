import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Camera, Video, Palette, Code, Mail, Phone, ArrowUpRight, Play, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from '@emailjs/browser';

// Importamos la configuración de Firebase
import { auth, googleProvider, db } from "../lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Nombres actualizados para la base de datos y los correos
const SERVICIOS_NOMBRES = {
  foto: 'Fotografía y Diseño Estratégico',
  video: 'Soluciones de Filmografía y Video',
  diseño: 'Diseño y Branding',
  web: 'Despliegue Web'
};

const Servicios = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // ARREGLO 1: El estado del video tiene que estar acá adentro
  const [videoAbierto, setVideoAbierto] = useState(null);

  const [formData, setFormData] = useState({
    fechas: [],
    servicios: [],
    nivelEdicion: [], 
    celular: "",
    empresa: "" 
  });

  // Bloquear/Desbloquear scroll cuando aparece el modal (y ahora también cuando se abre el video)
// Bloquear/Desbloquear scroll cuando aparece el modal o el video (VERSIÓN LIMPIA)
  useEffect(() => {
    if (showSuccess || videoAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Limpieza de seguridad por si el usuario cambia de página de golpe
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSuccess, videoAbierto]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al loguearse:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  // Función clave para tildar/destildar opciones
  const toggleOption = (list, item) => 
    list.includes(item) ? list.filter(i => i !== item) : [...list, item];

  // FUNCIÓN PARA GUARDAR EN FIREBASE Y ENVIAR EMAIL
  const handleFinalizarPresupuesto = async () => {
    if (!formData.empresa || !formData.celular || formData.servicios.length === 0 || formData.fechas.length === 0) {
      alert("Por favor, complete todos los campos requeridos para continuar.");
      return;
    }

    setIsSending(true);

    const nivelesEdicionTexto = formData.nivelEdicion.length > 0 
      ? formData.nivelEdicion.join(", ") 
      : "N/A";

    try {
      const docRef = await addDoc(collection(db, "presupuestos"), {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        empresa: formData.empresa,
        celular: formData.celular,
        fechas: formData.fechas.sort(),
        servicios: formData.servicios.map(s => SERVICIOS_NOMBRES[s]),
        nivelEdicion: formData.nivelEdicion,
        fecha: serverTimestamp(),
        estado: "Procesando"
      });

      const emailParams = {
        empresa: formData.empresa,
        userName: user.displayName,
        userEmail: user.email,
        celular: formData.celular,
        servicios: formData.servicios.map(s => SERVICIOS_NOMBRES[s]).join(", "),
        fechas: formData.fechas.sort().join(", ") + " de Mayo",
        nivelEdicion: nivelesEdicionTexto,
        id_pedido: docRef.id 
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setShowSuccess(true);
      
      setFormData({
        fechas: [],
        servicios: [],
        nivelEdicion: [],
        celular: "",
        empresa: ""
      });

    } catch (error) {
      console.error("Error en el proceso:", error);
      alert("Hubo un error al procesar la solicitud. Intente nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  const isFormComplete = formData.empresa && formData.celular && formData.servicios.length > 0 && formData.fechas.length > 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-brand-cream overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      <main className="max-w-7xl mx-auto px-6 relative z-10 pb-32 pt-24">
        <header className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.85] tracking-tighter mb-4 uppercase">
              Configure su <br />
              <span className="text-brand-blue not-italic font-serif">Presencia</span>
            </h2>
            <div className="h-[1px] w-40 bg-brand-blue/40 mt-6 mb-4"></div>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold italic">
              {user ? `Bienvenido, ${user.displayName}` : "Exposición Internacional Minera San Juan"}
            </p>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-20 items-start">
          <div className="space-y-20">
            {/* 01. FECHAS */}
            <section>
              <h3 className="text-xs font-bold tracking-[0.4em] text-brand-white uppercase mb-8 flex items-center gap-4 font-serif">
                <span className="text-brand-blue italic">01</span> Seleccione Jornadas
              </h3>
              <div className="grid grid-cols-3 gap-1">
                {[6, 7, 8].map(dia => (
                  <button
                    key={dia}
                    onClick={() => setFormData({...formData, fechas: toggleOption(formData.fechas, dia)})}
                    className={`group relative p-8 transition-all duration-300 border ${formData.fechas.includes(dia) ? 'bg-brand-blue border-brand-blue' : 'bg-mining-dark/40 border-zinc-500 hover:border-zinc-700'}`}
                  >
                    <span className={`block text-5xl font-sans italic mb-1 ${formData.fechas.includes(dia) ? 'text-white' : 'text-brand-white'}`}>{dia}</span>
                    <span className={`text-[10px] uppercase tracking-widest ${formData.fechas.includes(dia) ? 'text-blue-100' : 'text-brand-white'}`}>Mayo 2026</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 02. SERVICIOS */}
            <section>
              <h3 className="text-xs font-bold tracking-[0.4em] text-brand-white uppercase mb-8 flex items-center gap-4 font-serif">
                <span className="text-brand-blue italic">02</span> Categoría Técnica
              </h3>
              <div className="grid md:grid-cols-1 gap-2">
                {[
                  { 
                    id: 'foto', 
                    label: 'Fotografía y Diseño Estratégico', 
                    desc: 'Cobertura Fotográfica Profesional. Captura de hitos y relaciones públicas durante la jornada. Entrega de 30 a 50 fotografías finales, ajustadas según los requerimientos y el contrato.',
                    icon: <Camera size={20}/> 
                  },
                  { 
                    id: 'video', 
                    label: 'Soluciones de Filmografía y Video (Por Jornada)', 
                    desc: '',
                    icon: <Video size={20}/> 
                  },
                  { 
                    id: 'diseño', 
                    label: 'Diseño y Branding', 
                    desc: 'Servicio completo de desarrollo visual por marca. Incluye manual de marca para el evento, folletería técnica y carruseles de alto impacto.',
                    icon: <Palette size={20}/> 
                  },
                  { 
                    id: 'web', 
                    label: 'Despliegue Web', 
                    desc: '',
                    icon: <Code size={20}/>,
                    hasWhatsApp: true 
                  },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setFormData({...formData, servicios: toggleOption(formData.servicios, item.id)})}
                    className={`flex items-start justify-between p-6 border transition-all duration-300 text-left ${
                      formData.servicios.includes(item.id) 
                        ? 'border-brand-blue bg-brand-blue/10' 
                        : 'border-zinc-500 bg-mining-dark/20 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <div className={`mt-1 ${formData.servicios.includes(item.id) ? 'text-brand-blue' : 'text-brand-white'}`}>
                        {item.icon}
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <span className="font-serif text-xl text-brand-cream">
                          {item.label}
                        </span>
                        
                        {item.desc && (
                          <p className="text-brand-white text-sm font-light leading-relaxed max-w-xl pr-4">
                            {item.desc}
                          </p>
                        )}

                        {/* BOTÓN WHATSAPP */}
                        {item.hasWhatsApp && (
                          <div className="mt-2">
                            <a 
                              href="https://wa.me/542645624688?text=Hola! Me gustaría consultar el precio por el servicio de Despliegue Web."
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-fit px-3 py-1.5 bg-green-600/20 border border-green-500/50 text-green-400 text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-green-600 hover:text-white transition-all flex items-center gap-2 group/wa"
                            >
                              <FaWhatsapp size={14} className="text-green-500 group-hover/wa:text-white transition-colors" />
                              Consultar Precio
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`mt-1 transition-opacity duration-300 ${formData.servicios.includes(item.id) ? 'opacity-100' : 'opacity-0'}`}>
                      <Check size={18} className="text-brand-blue" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 03. EDICIÓN */}
            <AnimatePresence>
              {formData.servicios.includes('video') && (
                <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-xs font-bold tracking-[0.4em] text-brand-white uppercase mb-8 flex items-center gap-4 font-serif">
                    <span className="text-brand-blue italic">03</span> Post-Producción
                  </h3>
                  
                  {/* GRILLA DE PLANES CON DESCRIPCIONES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        id: 'Básico',
                        titulo: 'Plan básico (Volumen alto)',
                        desc: 'Optimizado para la cobertura en tiempo real. Incluye la entrega de 10 historias de Instagram. Captura vertical, perfeccionamiento de audio y subtitulado para consumo rápido y directo.',
                        video: '/BASICA.mp4' 
                      },
                      {
                        id: 'Intermedio',
                        titulo: 'Plan intermedio (Narrativo)',
                        desc: 'Enfoque narrativo. Incluye hasta 5 contenidos (Reels) con cortes rítmicos, selección musical según contexto y diseño visual de subtítulos para mayor retención.',
                        video: '/INTERMEDIO.mp4' 
                      },
                      {
                        id: 'Avanzado',
                        titulo: 'Plan avanzado (Cine-Digital)',
                        desc: 'El estándar más alto. Incluye hasta 5 contenidos (Reels/Video de alta calidad) con edición profesional, corrección de color, recursos premium y animaciones avanzadas.',
                        video: '/AVANZADA.mp4' 
                      },
                      {
                        id: 'Institucional',
                        titulo: 'Plan institucional',
                        desc: 'Entrega de 1 contenido institucional de edición cinematográfica. Diseñado para medios masivos y presentaciones de alto nivel, con sonido masterizado para proyección institucional.'
                      },
                      {
                        id: 'Integral',
                        titulo: 'Plan Integral',
                        desc: 'Máxima cobertura con tarifa preferencial. Incluye edición de nivel basico, intermedio y avanzado para un flujo constante de contenido. No incluye producción institucional.'
                      }
                    ].map(plan => (
                      <div 
                        key={plan.id}
                        className={`relative p-6 border text-left flex flex-col justify-between gap-3 transition-all duration-300 cursor-pointer ${
                          formData.nivelEdicion.includes(plan.id) 
                            ? 'bg-brand-blue/10 border-brand-blue shadow-[0_0_15px_rgba(0,112,243,0.1)]' 
                            : 'bg-mining-dark/20 border-zinc-500 hover:border-zinc-700'
                        }`}
                        onClick={() => setFormData({...formData, nivelEdicion: toggleOption(formData.nivelEdicion, plan.id)})}
                      >
                        <div>
                          <div className="flex justify-between items-start w-full gap-4 mb-3">
                            <span className={`text-[10px] uppercase font-bold tracking-widest leading-relaxed ${
                              formData.nivelEdicion.includes(plan.id) ? 'text-brand-blue' : 'text-brand-white'
                            }`}>
                              {plan.titulo}
                            </span>
                            <div className={`transition-opacity duration-300 ${formData.nivelEdicion.includes(plan.id) ? 'opacity-100' : 'opacity-0'}`}>
                              <Check size={14} className="text-brand-blue" />
                            </div>
                          </div>
                          <p className="text-white text-xs font-light leading-relaxed">
                            {plan.desc}
                          </p>
                        </div>

                        {/* BOTÓN DE VER EJEMPLO */}
                        {plan.video && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); 
                              setVideoAbierto(plan.video);
                            }}
                            className="mt-4 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-400 hover:text-brand-cream transition-colors w-fit border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-sm bg-zinc-900/50"
                          >
                            <Play size={12} className="text-brand-blue" />
                            Ejemplo
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <aside className="sticky top-10 space-y-6">
            <div className="bg-mining-dark/40 border border-zinc-500 p-8 rounded-sm">
              <h4 className="text-[10px] font-bold tracking-[0.4em] text-brand-blue uppercase mb-8 border-b border-zinc-800 pb-4 font-serif italic">Resumen de Solicitud</h4>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-brand-white text-[10px] uppercase tracking-widest block font-bold">Jornadas:</span>
                  <div className="text-brand-white font-serif text-sm italic tracking-wide">
                    {formData.fechas.length > 0 ? formData.fechas.sort().map(d => `${d} de Mayo`).join(', ') : '---'}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-brand-white text-[10px] uppercase tracking-widest block font-bold">Servicios:</span>
                  <div className="flex flex-col gap-2">
                    {formData.servicios.length > 0 ? (
                      formData.servicios.map(id => (
                        <div key={id} className="flex items-center gap-2 text-brand-cream font-serif text-sm tracking-wide">
                          <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                          {SERVICIOS_NOMBRES[id]}
                        </div>
                      ))
                    ) : (
                      <span className="text-brand-white font-serif text-sm italic">Ninguno seleccionado</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                {/* 1. LÓGICA DE GOOGLE / FORMULARIO */}
                {!user ? (
                  <button 
                    onClick={handleLogin}
                    className="w-full bg-white text-black py-4 font-bold flex items-center justify-center gap-3 hover:bg-brand-blue hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase border border-zinc-200 hover:shadow-lg"
                  >
                    <FcGoogle size={18} />
                    Identificarse con Google
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue">
                         <span className="text-[10px] font-bold">@</span>
                      </div>
                      <input 
                        type="text"
                        placeholder="NOMBRE DE EMPRESA / STAND"
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value.toUpperCase()})}
                        className="w-full bg-zinc-950 border border-zinc-500 py-4 pl-12 pr-4 text-[10px] font-bold tracking-widest text-brand-white focus:border-brand-blue outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue" size={14} />
                      <input 
                        type="tel"
                        placeholder="CELULAR DE CONTACTO"
                        value={formData.celular}
                        onChange={(e) => setFormData({...formData, celular: e.target.value})}
                        className="w-full bg-zinc-950 border border-zinc-500 py-4 pl-12 pr-4 text-[10px] font-bold tracking-widest text-brand-white focus:border-brand-blue outline-none transition-colors"
                      />
                    </div>

                    <button 
                      onClick={handleFinalizarPresupuesto}
                      disabled={isSending || !isFormComplete}
                      className={`w-full py-4 font-bold flex items-center justify-center gap-3 transition-all text-[10px] tracking-[0.2em] uppercase ${
                        !isFormComplete 
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-900' 
                        : 'bg-brand-blue text-white hover:bg-blue-600 shadow-lg'
                      }`}
                    >
                      <Mail size={14} />
                      {isSending ? "Sincronizando..." : "Enviar a Isla Studio"}
                    </button>
                  </motion.div>
                )}

                <a 
                  href="https://wa.me/542645063823?text=Hola! Me gustaría consultar el tarifario y la personalización de servicio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-green-500/40 bg-green-500/10 text-green-400 py-4 font-bold flex items-center justify-center gap-3 hover:bg-green-600 hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase text-center px-4 mt-8"
                >
                  <FaWhatsapp size={18} className="flex-shrink-0" />
                  Consultar tarifario y personalización de servicio
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL DE ÉXITO */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-zinc-950/80" 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ 
                backfaceVisibility: "hidden", 
                transform: "translateZ(0)",
                willChange: "transform, opacity" 
              }}
              className="relative z-50 bg-zinc-900 border border-zinc-800 p-10 text-center max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                   style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-blue/10 border border-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ArrowUpRight className="text-brand-blue" size={32} />
                </div>

                <h2 className="text-4xl font-serif uppercase tracking-tighter mb-2 text-brand-cream">
                  Solicitud <br />
                  <span className="text-brand-blue italic">Procesada</span>
                </h2>

                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] leading-relaxed mb-10 font-medium font-sans">
                  Tu configuración ha sido enviada al equipo de ingeniería visual. Nos contactaremos a la brevedad.
                </p>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setShowSuccess(false);
                      navigate("/mis-presupuestos");
                    }}
                    className="w-full bg-brand-blue text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-blue-600 transition-colors"
                  >
                    Ver mis pedidos
                  </button>
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="w-full border border-zinc-800 text-brand-cream py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-900 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

{/* REPRODUCTOR DE VIDEO MODAL (OPTIMIZADO) */}
      <AnimatePresence>
        {videoAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // OPTIMIZACIÓN 1: Chau blur, usamos un fondo oscuro sólido (bg-black/95)
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/95 p-4 sm:p-10"
            onClick={() => setVideoAbierto(null)} 
            style={{ willChange: "opacity" }}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
              onClick={() => setVideoAbierto(null)}
            >
              <X size={36} strokeWidth={1} />
            </button>

            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              // OPTIMIZACIÓN 2: Transición más rápida y fluida
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} 
              // OPTIMIZACIÓN 3: Aceleración por hardware forzada (GPU)
              style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
              // Le saqué la sombra gigante y dejé un shadow-2xl estándar que es más ligero
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
            >
              <video 
                src={videoAbierto} 
                controls 
                autoPlay 
                playsInline 
                className="w-full h-full object-contain bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Servicios;