import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contacto = () => {
  return (
    <div className="w-full min-h-screen bg-isla-black text-isla-almond font-sans selection:bg-isla-terra selection:text-white">
      
      <Navbar />

      <section className="pt-40 md:pt-56 pb-20 px-6 md:px-12 lg:px-20 max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* COLUMNA IZQUIERDA: Mensaje e Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            <div>
              <span className="text-isla-terra font-bold tracking-[0.4em] text-xs md:text-sm uppercase block mb-6">
                Contacto
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.95] uppercase mb-8">
                Iniciemos <br /> un <span className="text-isla-terra text-opacity-90">proyecto.</span>
              </h1>
              <p className="text-lg md:text-xl text-isla-almond/70 max-w-md leading-relaxed">
                Ya sea que necesites una identidad visual completa, un spot publicitario o desarrollo web a medida, estamos listos para escucharte.
              </p>
            </div>

            <div className="flex flex-col gap-8 mt-4">
              
              <div className="flex items-start gap-4 group">
                <Mail className="text-isla-terra mt-1" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Email</h4>
                  {/* CORRECCIÓN: Enlace directo al compositor de Gmail */}
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=islastudio39@gmail.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-isla-almond/70 group-hover:text-isla-terra transition-colors text-lg md:text-xl"
                  >
                    islastudio39@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <Phone className="text-isla-terra mt-1" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">WhatsApp</h4>
                  <a href="https://wa.me/5492644437135" target="_blank" rel="noreferrer" className="text-isla-almond/70 group-hover:text-isla-terra transition-colors text-lg md:text-xl">
                    +54 9 264 443-7135
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-isla-terra mt-1" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Base de Operaciones</h4>
                  <p className="text-isla-almond/70 text-lg md:text-xl">
                    San Juan, Argentina <br />
                    <span className="text-sm opacity-50 block mt-2">Trabajamos de forma remota para todo el mundo.</span>
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* COLUMNA DERECHA: Formulario Brutalista */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <form className="flex flex-col gap-12 w-full" onSubmit={(e) => {
              e.preventDefault();
              alert("Por ahora el formulario es visual. Escribinos directamente al mail o WhatsApp!");
            }}>
              
              <div className="relative group pt-6">
                <input 
                  type="text" 
                  name="nombre"
                  id="nombre" 
                  className="w-full bg-transparent border-b border-isla-almond/30 py-2 text-xl md:text-2xl focus:outline-none focus:border-isla-terra transition-colors peer placeholder-transparent" 
                  placeholder="Tu Nombre"
                  required 
                />
                <label htmlFor="nombre" className="absolute left-0 top-0 text-xs text-isla-terra font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-isla-almond/50 peer-placeholder-shown:top-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-isla-terra cursor-text">
                  Tu Nombre Completo
                </label>
              </div>

              <div className="relative group pt-6">
                <input 
                  type="email" 
                  name="email"
                  id="email" 
                  className="w-full bg-transparent border-b border-isla-almond/30 py-2 text-xl md:text-2xl focus:outline-none focus:border-isla-terra transition-colors peer placeholder-transparent" 
                  placeholder="Tu Email"
                  required 
                />
                <label htmlFor="email" className="absolute left-0 top-0 text-xs text-isla-terra font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-isla-almond/50 peer-placeholder-shown:top-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-isla-terra cursor-text">
                  Email de Contacto
                </label>
              </div>

              <div className="relative group pt-6">
                <label className="absolute left-0 top-0 text-xs text-isla-terra font-bold uppercase tracking-widest">
                  ¿En qué podemos ayudarte?
                </label>
                <select 
                  name="servicio"
                  className="w-full bg-transparent border-b border-isla-almond/30 py-4 mt-2 text-lg md:text-xl focus:outline-none focus:border-isla-terra transition-colors text-isla-almond/80 appearance-none cursor-pointer"
                  defaultValue=""
                  required
                >
                  <option value="" disabled className="bg-isla-black text-isla-almond/50">Seleccioná un servicio...</option>
                  <option value="branding" className="bg-isla-black">Branding & Diseño</option>
                  <option value="audiovisual" className="bg-isla-black">Estudio Audiovisual</option>
                  <option value="redes" className="bg-isla-black">Planificación en Redes</option>
                  <option value="web" className="bg-isla-black">Desarrollo Web</option>
                  <option value="marketing" className="bg-isla-black">Marketing Digital</option>
                  <option value="automatizaciones" className="bg-isla-black">Automatizaciones</option>
                  <option value="otro" className="bg-isla-black">Otro proyecto</option>
                </select>
                <div className="absolute right-0 top-10 pointer-events-none text-isla-terra">
                  ▼
                </div>
              </div>

              <div className="relative group pt-6">
                <textarea 
                  name="mensaje"
                  id="mensaje" 
                  rows="3"
                  className="w-full bg-transparent border-b border-isla-almond/30 py-2 text-xl md:text-2xl focus:outline-none focus:border-isla-terra transition-colors peer placeholder-transparent resize-none" 
                  placeholder="Detalles..."
                  required 
                ></textarea>
                <label htmlFor="mensaje" className="absolute left-0 top-0 text-xs text-isla-terra font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-isla-almond/50 peer-placeholder-shown:top-8 peer-focus:top-0 peer-focus:text-xs peer-focus:text-isla-terra cursor-text">
                  Contanos sobre tu proyecto
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full md:w-auto self-start mt-4 inline-flex items-center gap-3 bg-isla-terra text-white px-12 py-5 rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:bg-isla-almond hover:text-isla-black transition-colors group"
              >
                Enviar Solicitud
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;