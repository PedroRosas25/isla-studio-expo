import { motion } from "framer-motion";
import { Smartphone, Video, Globe, TrendingUp, Megaphone, Lightbulb, ArrowRight } from "lucide-react";
import { memo } from "react";

const servicios = [
  { id: "01", titulo: "Gestión de Redes y Contenidos", descripcion: "Planificación mensual y producción de piezas audiovisuales para Instagram, TikTok y YouTube. Incluimos la automatización de mensajes privados para optimizar la atención.", icono: <Smartphone size={24} strokeWidth={1.5} /> },
  { id: "02", titulo: "Filmmaking y Edición Profesional", descripcion: "Grabación en locación y edición de primer nivel. Implementamos herramientas de IA para potenciar la calidad, el dinamismo y la innovación.", icono: <Video size={24} strokeWidth={1.5} /> },
  { id: "03", titulo: "Programación Web y Automatizaciones", descripcion: "Desarrollamos páginas web, landing pages y sistemas a medida. Transformamos tu negocio físico en una sucursal digital optimizada para vender 24/7.", icono: <Globe size={24} strokeWidth={1.5} /> },
  { id: "04", titulo: "Alianzas y Publicidad en Medios", descripcion: "Potenciamos tu marca mediante convenios exclusivos con los principales medios locales, garantizando espacios publicitarios preferenciales.", icono: <Megaphone size={24} strokeWidth={1.5} /> },
  { id: "05", titulo: "Análisis, Métricas y Optimización", descripcion: "Monitoreamos el desempeño de tus redes con reportes periódicos para realizar ajustes estratégicos basados en datos reales.", icono: <TrendingUp size={24} strokeWidth={1.5} /> },
  { id: "06", titulo: "Innovación y Fechas Clave", descripcion: "Desarrollamos campañas específicas para fechas comerciales y actualizamos constantemente las dinámicas para mantener una comunicación moderna.", icono: <Lightbulb size={24} strokeWidth={1.5} /> }
];

function ServiciosDetallados() {
  return (
    <section id="servicios" className="py-32 bg-zinc-950 border-t border-zinc-900 px-6 relative overflow-hidden">
      
      {/* Grilla técnica de fondo */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="text-brand-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">Soluciones Integrales</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 text-brand-cream">
            Nuestros <span className="italic text-brand-blue">Servicios</span>
          </h2>
          <div className="h-[1px] w-24 bg-brand-blue/40"></div>
        </motion.div>

        <div className="flex flex-col border-t border-zinc-900">
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative py-14 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/[0.01] transition-all duration-500 px-4"
            >
              {/* Sección Izquierda: ID, Icono y Título */}
              <div className="flex items-center gap-6 md:gap-12 md:w-5/12">
                <span className="font-mono text-zinc-800 group-hover:text-brand-blue transition-colors duration-500 text-xs tracking-widest">
                  [{servicio.id}]
                </span>
                <div className="text-zinc-600 group-hover:text-brand-blue transition-all duration-500 transform group-hover:scale-110">
                  {servicio.icono}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-brand-cream tracking-tight">
                  {servicio.titulo}
                </h3>
              </div>

              {/* Sección Derecha: Descripción */}
              <div className="md:w-5/12">
                <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                  {servicio.descripcion}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ServiciosDetallados);