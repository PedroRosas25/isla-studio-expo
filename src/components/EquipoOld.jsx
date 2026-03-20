import { motion } from "framer-motion";
import { memo } from "react";

const equipo = [
  { nombre: "Juan C. Bataller", cargo: "Co-Founder & Director General", descripcion: "Estrategia de negocios y dirección general de la agencia.", imagen: "./equipo/juan.jpg" },
  { nombre: "Santiago Castro", cargo: "Co-Founder & Director Creativo", descripcion: "Dirección de arte, alianzas estratégicas y relaciones públicas.", imagen: "./equipo/santiago.jpg" },
  { nombre: "Andrés Yurcic", cargo: "Director Audiovisual / Filmmaker", descripcion: "Grabación en locación y edición de video con implementación de IA.", imagen: "./equipo/andres.jpg" },
  { nombre: "Pedro Rosas", cargo: "Tech Lead & Web Developer", descripcion: "Desarrollo de software, automatizaciones y arquitectura web.", imagen: "./equipo/pedro.jpg" }
];

function EquipoOld() {
  return (
    <section id="equipo" className="py-24 bg-zinc-950 border-t border-zinc-900 text-brand-cream px-6 relative overflow-hidden">
      
      {/* Grilla técnica de fondo */}
      <div className="absolute inset-0 opacity-[0.065] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-brand-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">Capital Humano</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tighter mb-6">Nuestro <span className="not-italic font-serif text-brand-blue">Equipo</span></h2>
          <div className="h-[1px] w-20 bg-brand-blue/40"></div>
        </motion.div>

        {/* Grid ajustado: fotos más pequeñas (max-w-xs) y centradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipo.map((miembro, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-mining-dark/5 border border-zinc-500 rounded-sm overflow-hidden hover:border-brand-blue/40 transition-all duration-500"
            >
              {/* Contenedor de Imagen: Achicamos el aspect ratio a 1/1 (cuadrado) para que no ocupe tanto alto */}
              <div className="relative aspect-square overflow-hidden transition-all duration-700">
                <img 
                  src={miembro.imagen} 
                  alt={miembro.nombre}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay sutil para que el nombre destaque si la foto es muy clara */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
                
              </div>

              {/* Información: Padding más compacto */}
              <div className="p-6 flex flex-col flex-grow bg-zinc-950/50">
                <h3 className="text-xl font-serif mb-1 text-brand-cream group-hover:text-brand-blue transition-colors duration-300">
                  {miembro.nombre}
                </h3>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-blue mb-4 block italic">
                  {miembro.cargo}
                </span>
                <p className="text-brand-cream text-xs font-light leading-relaxed line-clamp-3 group-hover:text-zinc-400 transition-colors duration-500">
                  {miembro.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(EquipoOld);