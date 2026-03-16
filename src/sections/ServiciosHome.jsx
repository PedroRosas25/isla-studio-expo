import { motion } from "framer-motion";
import { Camera, Video, Palette, Code, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const serviciosPrincipales = [
  { 
    title: "Filmografía / Video", 
    desc: "Producción visual adaptada para campañas de impacto en Redes Sociales o presentaciones de Uso Profesional e institucional.",
    icon: <Video className="text-brand-blue" size={32} strokeWidth={1.5} />
  },
  { 
    title: "Fotografía", 
    desc: "Captura de alta fidelidad para catálogos industriales, prensa y contenido estético optimizado para Redes Sociales.",
    icon: <Camera className="text-brand-blue" size={32} strokeWidth={1.5} />
  },
  { 
    title: "Diseño Gráfico", 
    desc: "Identidad visual corporativa, manuales de marca y piezas gráficas de gran formato para stands y vía pública.",
    icon: <Palette className="text-brand-blue" size={32} strokeWidth={1.5} />
  },
  { 
    title: "Software & Web", 
    desc: "Desarrollo de landing pages interactivas y sistemas de captación de clientes diseñados específicamente para el entorno de la Expo.",
    icon: <Code className="text-brand-blue" size={32} strokeWidth={1.5} />
  }
];

const ServiciosHome = () => {
  return (
    <section id="servicios-info" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Grilla técnica de fondo (Igual que el Hero para unión total) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera con estética Hero */}
        <div className="mb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-blue font-bold tracking-[0.5em] text-[10px] uppercase block mb-6">Expertise Técnico</span>
            <h2 className="text-[11vw] xs:text-[10vw] sm:text-7xl md:text-8xl font-serif leading-[0.9] tracking-tighter uppercase">
              SERVICIOS <br />
              <span className="text-brand-blue italic block">
                ESPECIALIZADOS
              </span>
            </h2>
            <div className="h-[1px] w-40 bg-brand-blue/30 mt-10"></div>
          </motion.div>
        </div>

        {/* Grilla de Tarjetas Industriales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
          {serviciosPrincipales.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-950 p-10 flex flex-col justify-between min-h-[350px] hover:bg-zinc-900/50 transition-all duration-500 group relative"
            >
              <div>
                <div className="mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-serif text-brand-cream mb-4 leading-tight">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  {s.desc}
                </p>
              </div>

              {/* Detalle estético: línea de progreso inferior */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-blue group-hover:w-full transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action final */}
        <div className="mt-24 flex flex-col items-center">
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-8">¿Listo para potenciar su stand?</p>
          <Link 
            to="/servicios" 
            className="px-12 py-5 border border-zinc-800 text-brand-cream font-bold hover:bg-brand-blue hover:border-brand-blue transition-all uppercase text-[10px] tracking-[0.2em] rounded-sm flex items-center gap-4 group"
          >
            Configurar Presupuesto Personalizado
            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiciosHome;