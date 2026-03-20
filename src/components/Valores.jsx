import { motion } from "framer-motion";
import { Target, Zap, Cpu } from "lucide-react";
import { memo } from "react";

const valores = [
  {
    icono: <Target size={28} strokeWidth={1.5} />,
    titulo: "Orientados a Resultados",
    descripcion: "Acompañamos a marcas y empresas en su presencia digital mediante estrategias de contenido creativas y profesionales, siempre adaptadas a los objetivos de cada cliente."
  },
  {
    icono: <Cpu size={28} strokeWidth={1.5} />,
    titulo: "Innovación & Tecnología",
    descripcion: "Nuestro enfoque se basa en el uso de herramientas tecnológicas avanzadas, incluyendo Inteligencia Artificial, para optimizar la calidad y el impacto de lo que producimos."
  },
  {
    icono: <Zap size={28} strokeWidth={1.5} />,
    titulo: "Planificación Estratégica",
    descripcion: "No publicamos por publicar. Garantizamos coherencia estética, narrativa visual y un seguimiento de métricas reales para asegurar el crecimiento."
  }
];

function Valores() {
  return (
    <section id="valores" className="py-32 bg-zinc-950 border-t border-zinc-900 text-brand-cream px-6 relative overflow-hidden">
      
      {/* Grilla técnica de fondo (sutil) */}
      <div className="absolute inset-0 opacity-[0.065] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-brand-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Filosofía de Trabajo</span>
          <h2 className="text-5xl md:text-6xl font-serif tracking-tighter mb-8">Nuestra <span className="not-italic font-serif text-brand-blue">Esencia</span></h2>
          <p className="text-xl text-zinc-500 max-w-2xl font-light leading-relaxed">
            Somos una agencia especializada en comunicación, marketing digital y producción audiovisual de alto impacto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {valores.map((valor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-10 bg-mining-dark/20 border border-zinc-500 hover:border-brand-blue/40 transition-all duration-500 rounded-sm"
            >
              {/* Overlay de gradiente sutil al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {valor.icono}
                </div>
                
                <h3 className="text-2xl font-serif mb-6 text-brand-cream">
                  {/* Lógica para el ampersand en el título */}
                  {valor.titulo.includes("&") ? (
                    <>
                      {valor.titulo.split("&")[0]} 
                      <span className="font-sans italic text-brand-white mx-1">&</span> 
                      {valor.titulo.split("&")[1]}
                    </>
                  ) : (
                    valor.titulo
                  )}
                </h3>
                
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                  {valor.descripcion}
                </p>
              </div>

              {/* Detalle técnico en la esquina */}
              <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-800 group-hover:text-brand-blue/30 transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Valores);