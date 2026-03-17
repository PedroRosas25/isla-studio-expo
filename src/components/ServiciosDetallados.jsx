import { motion } from "framer-motion";
import { Smartphone, Video, Globe, TrendingUp, Megaphone, Lightbulb } from "lucide-react";
import { memo } from "react";

const acentosGraficos = [
  { id: 1, text: "✦", top: "5%", left: "5%", size: "text-4xl" },
  { id: 2, text: "○", top: "15%", right: "10%", size: "text-5xl" },
  { id: 3, text: "//", top: "30%", left: "15%", size: "text-2xl" },
  { id: 4, text: "□", top: "45%", right: "5%", size: "text-6xl" },
  { id: 5, text: "✦", top: "60%", left: "8%", size: "text-4xl" },
  { id: 6, text: "○", top: "75%", right: "15%", size: "text-3xl" },
  { id: 7, text: "//", top: "90%", left: "20%", size: "text-2xl" },
  { id: 8, text: "□", top: "85%", right: "5%", size: "text-5xl" },
];

const servicios = [
  { titulo: "Gestión de Redes y Contenidos", descripcion: "Planificación mensual y producción de piezas audiovisuales para Instagram, TikTok y YouTube. Incluimos la automatización de mensajes privados para optimizar la atención.", icono: <Smartphone size={32} className="text-brand-blue" /> },
  { titulo: "Filmmaking y Edición Profesional", descripcion: "Grabación en locación y edición de primer nivel. Implementamos herramientas de IA para potenciar la calidad, el dinamismo y la innovación.", icono: <Video size={32} className="text-brand-blue" /> },
  { titulo: "Programación Web y Automatizaciones", descripcion: "Desarrollamos páginas web, landing pages y sistemas a medida. Transformamos tu negocio físico en una sucursal digital optimizada para vender 24/7.", icono: <Globe size={32} className="text-brand-blue" /> },
  { titulo: "Alianzas y Publicidad en Medios", descripcion: "Potenciamos tu marca mediante convenios exclusivos con los principales medios locales, garantizando espacios publicitarios preferenciales.", icono: <Megaphone size={32} className="text-brand-blue" /> },
  { titulo: "Análisis, Métricas y Optimización", descripcion: "Monitoreamos el desempeño de tus redes con reportes periódicos para realizar ajustes estratégicos basados en datos reales.", icono: <TrendingUp size={32} className="text-brand-blue" /> },
  { titulo: "Innovación y Fechas Clave", descripcion: "Desarrollamos campañas específicas para fechas comerciales y actualizamos constantemente las dinámicas para mantener una comunicación moderna.", icono: <Lightbulb size={32} className="text-brand-blue" /> }
];

function ServiciosDetallados() {
  return (
    <section id="servicios" className="py-24 bg-zinc-900 text-brand-cream px-4 relative overflow-hidden">
      
      {/* Símbolos optimizados */}
      {acentosGraficos.map((acento) => (
        <motion.div
          key={acento.id}
          className={`absolute text-brand-blue/30 font-black pointer-events-none ${acento.size} drop-shadow-[0_0_10px_rgba(0,122,255,0.5)] will-change-transform`}
          style={{ top: acento.top, left: acento.left, right: acento.right }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {acento.text}
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">Nuestros Servicios</h2>
          <p className="text-xl text-brand-cream max-w-3xl mx-auto">
            Soluciones integrales de comunicación adaptadas a las necesidades de tu marca.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col p-8 bg-zinc-950/50 backdrop-blur-md rounded-2xl border border-brand-blue/30 md:border-zinc-800 hover:border-brand-blue transition-all duration-300 will-change-transform group"
            >
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 w-fit mb-6 group-hover:border-brand-blue/50 transition-colors duration-300">
                {servicio.icono}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">{servicio.titulo}</h3>
                <p className="text-brand-cream/80 leading-relaxed">
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