import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
// Asegurate de que las rutas a tus componentes Navbar y Footer sean correctas
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

const listaServicios = [
  {
    id: "01",
    titulo: "Branding & Diseño",
    descripcion: "Construimos identidades visuales que no pasan desapercibidas. Desde manuales de marca y logotipos hasta la dirección de arte completa de tu empresa, asegurando coherencia en cada punto de contacto."
  },
  {
    id: "02",
    titulo: "Estudio Audiovisual",
    descripcion: "Filmmaking, fotografía comercial y producción de video de alto impacto. Capturamos la esencia de tu marca con calidad cinematográfica para contar historias que conectan visceralmente."
  },
  {
    id: "03",
    titulo: "Planificación en Redes",
    descripcion: "No publicamos por publicar. Diseñamos estrategias de contenido, calendarios editoriales y gestionamos tu comunidad online para convertir seguidores en clientes fieles."
  },
  {
    id: "04",
    titulo: "Desarrollo Web",
    descripcion: "Diseñamos y programamos sitios web a medida, landing pages y aplicaciones web orientadas a la conversión. Código limpio, tiempos de carga rápidos y diseños responsivos."
  },
  {
    id: "05",
    titulo: "Marketing Digital",
    descripcion: "Campañas de publicidad en Meta Ads y Google Ads basadas en datos. Optimizamos tu presupuesto para maximizar el retorno de inversión (ROI) y escalar tus ventas."
  },
  {
    id: "06",
    titulo: "Automatizaciones",
    descripcion: "Optimizamos el tiempo de tu equipo integrando flujos de trabajo automáticos, respuestas inteligentes y sistemas de CRM para que tu negocio funcione las 24 horas del día."
  }
];

const Servicios = () => {
  return (
    <div className="w-full min-h-screen bg-isla-black text-isla-almond font-sans selection:bg-isla-terra selection:text-white">
      
      {/* Importamos la Navbar para que se vea en esta página */}
      <Navbar />

      {/* HEADER DE LA PÁGINA */}
      <section className="pt-40 md:pt-56 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-isla-terra font-bold tracking-[0.4em] text-xs md:text-sm uppercase block mb-6"
          >
            Nuestros Servicios
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.95] uppercase"
          >
            Hacemos que lo <br /> complejo se vea <span className="text-isla-terra text-opacity-90">impecable.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 text-lg md:text-xl text-isla-almond/70 max-w-2xl leading-relaxed"
          >
            Somos un equipo multidisciplinario enfocado en resolver problemas comerciales a través del diseño, la tecnología y la estrategia.
          </motion.p>
        </div>
      </section>

      {/* GRILLA DE SERVICIOS */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-isla-almond/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-24 lg:gap-y-32">
          {listaServicios.map((servicio, index) => (
            <motion.div 
              key={servicio.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col group cursor-default"
            >
              {/* Número e Ícono */}
              <div className="flex justify-between items-end border-b border-isla-almond/20 pb-4 mb-6 group-hover:border-isla-terra transition-colors duration-500">
                <span className="text-4xl md:text-5xl font-bold text-isla-almond/20 group-hover:text-isla-terra transition-colors duration-500">
                  {servicio.id}
                </span>
                <ArrowUpRight className="text-isla-almond/0 group-hover:text-isla-terra transition-all duration-500 transform translate-y-4 group-hover:translate-y-0" size={32} />
              </div>
              
              {/* Título y Descripción */}
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight uppercase mb-4 group-hover:text-isla-terra transition-colors duration-500">
                {servicio.titulo}
              </h3>
              <p className="text-isla-almond/70 leading-relaxed text-sm md:text-base">
                {servicio.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LLAMADO A LA ACCIÓN (CTA) */}
      <section className="py-32 px-6 flex justify-center text-center">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            ¿Listo para empezar?
          </h2>
          <a 
            href="mailto:islastudio39@gmail.com" 
            className="inline-flex items-center gap-3 bg-isla-terra text-white px-10 py-5 rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:bg-isla-almond hover:text-isla-black transition-colors group"
          >
            Contactar al equipo
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer integrado */}
      <Footer />
    </div>
  );
};

export default Servicios;