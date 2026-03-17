import { motion } from "framer-motion";
import { User } from "lucide-react";
import { memo } from "react";

const acentosGraficos = [
  { id: 1, text: "✦", top: "5%", left: "10%", size: "text-3xl" },
  { id: 2, text: "○", top: "20%", right: "8%", size: "text-4xl" },
  { id: 3, text: "//", top: "45%", left: "5%", size: "text-2xl" },
  { id: 4, text: "□", top: "60%", right: "12%", size: "text-5xl" },
  { id: 5, text: "+", top: "90%", left: "15%", size: "text-4xl" },
];

const equipo = [
  { nombre: "Juan C. Bataller", cargo: "Co-Founder & Director General", descripcion: "Estrategia de negocios y dirección general de la agencia.", imagen: "./equipo/juan.jpg" },
  { nombre: "Santiago Castro", cargo: "Co-Founder & Director Creativo", descripcion: "Dirección de arte, alianzas estratégicas y relaciones públicas.", imagen: "./equipo/santiago.jpg" },
  { nombre: "Andrés Yurcic", cargo: "Director Audiovisual / Filmmaker", descripcion: "Grabación en locación y edición de video con implementación de IA.", imagen: "./equipo/andres.jpg" },
  { nombre: "Pedro Rosas", cargo: "Tech Lead & Web Developer", descripcion: "Desarrollo de software, automatizaciones y arquitectura web.", imagen: "./equipo/pedro.jpg" }
];

function Equipo() {
  return (
    <section id="equipo" className="py-24 bg-zinc-900 border-t border-zinc-800 text-brand-cream px-4 relative overflow-hidden">
      
      {/* Símbolos optimizados: animación solo al entrar al viewport */}
      {acentosGraficos.map((acento) => (
        <motion.div
          key={acento.id}
          className={`absolute text-brand-blue/30 font-black pointer-events-none ${acento.size} drop-shadow-[0_0_10px_rgba(0,122,255,0.3)]`}
          style={{ top: acento.top, left: acento.left, right: acento.right }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          viewport={{ once: true }}
        >
          {acento.text}
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">Nuestro Equipo</h2>
          <p className="text-xl text-brand-cream max-w-2xl mx-auto">
            Las mentes detrás de Isla Studio. Combinamos estrategia, arte y código para escalar tu negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipo.map((miembro, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center bg-zinc-950/40 p-6 rounded-3xl border border-brand-blue/30 md:border-zinc-800/50 hover:border-brand-blue transition-all duration-300 will-change-transform hover:shadow-[0_0_15px_rgba(0,122,255,0.1)]"
            >
              <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden bg-zinc-800 border-4 border-zinc-900 group-hover:border-brand-blue transition-colors duration-300">
                <img 
                  src={miembro.imagen} 
                  alt={miembro.nombre}
                  className="w-full h-full object-cover transition-all duration-500"
                  loading="lazy"
                />
              </div>

              <h3 className="text-2xl font-bold mb-1">{miembro.nombre}</h3>
              <p className="text-brand-blue font-semibold text-sm mb-3 uppercase tracking-wider">
                {miembro.cargo}
              </p>
              <p className="text-brand-cream/80 text-sm leading-relaxed px-2">
                {miembro.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Equipo);