import { motion } from "framer-motion";
import { useEffect, memo } from "react";
import { CheckCircle2, LayoutGrid, Package, ArrowRight } from "lucide-react";

const planesIntegrales = [
  { nombre: "Mensual", duracion: "1 Mes", descripcion: "Renovación mes a mes. Ideal para proyectos puntuales o validación de marca.", destacado: false },
  { nombre: "Trimestral", duracion: "3 Meses", descripcion: "Previsibilidad estratégica y mejora en el valor final del servicio.", destacado: false },
  { nombre: "Semestral", duracion: "6 Meses", descripcion: "Planificación a mediano plazo con condiciones preferenciales.", destacado: false },
  { nombre: "Anual", duracion: "12 Meses", descripcion: "Estrategia sostenida con la mejor relación costo-beneficio del estudio.", destacado: true }
];

const serviciosModulares = [
  { categoria: "Marketing & Redes", incluye: ["Planificación mensual", "Producción IG/TikTok/YT", "Automatización de mensajes", "Reportes de métricas"] },
  { categoria: "Filmmaking", incluye: ["Grabación en locación", "Edición profesional", "IA para calidad", "Cobertura de eventos"] },
  { categoria: "Programación Web", incluye: ["Landing Pages", "E-commerce", "Sistemas a medida", "Integración & automatizaciones"] }
];

function PlanesOld() {
  return (
    <section id="planes" className="py-32 bg-zinc-950 border-t border-zinc-900 text-brand-cream px-6 relative overflow-hidden">
      
      {/* Grilla técnica de fondo */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-brand-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Inversión & Escala</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">Planes <span className="italic text-brand-white">&</span> Cotizaciones</h2>
          <div className="h-[1px] w-24 bg-brand-blue/40 mx-auto"></div>
        </motion.div>

        {/* 1. MODULARES (Diseño Minimalista) */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <LayoutGrid className="text-brand-blue" size={20} strokeWidth={1.5} />
            <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-zinc-500">Contratación Modular</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviciosModulares.map((mod, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-mining-dark/10 border border-zinc-900 p-10 rounded-sm group hover:border-brand-blue/30 transition-all duration-500"
              >
                <h4 className="text-2xl font-serif mb-8 text-brand-cream">
                    {mod.categoria.includes("&") ? (
                        <>
                        {mod.categoria.split("&")[0]} 
                        <span className="font-sans italic text-brand-white mx-1">&</span> 
                        {mod.categoria.split("&")[1]}
                        </>
                    ) : mod.categoria}
                </h4>
                <ul className="space-y-4">
                  {mod.includes ? mod.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full opacity-40" />
                      {item}
                    </li>
                  )) : mod.incluye.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full opacity-40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. PLANES INTEGRALES (Diseño de Alto Impacto) */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <Package className="text-brand-blue" size={20} strokeWidth={1.5} />
            <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-zinc-500">Planes Integrales</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planesIntegrales.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-10 border flex flex-col h-full relative transition-all duration-500 rounded-sm ${
                  plan.destacado 
                    ? 'bg-brand-blue/5 border-brand-blue shadow-[0_0_40px_rgba(0,122,255,0.1)]' 
                    : 'bg-zinc-950 border-zinc-900 hover:border-zinc-700'
                }`}
              >
                {plan.destacado && (
                    <span className="absolute top-4 right-4 text-[8px] font-bold tracking-[0.2em] text-brand-blue border border-brand-blue/30 px-2 py-1 uppercase italic">
                        Recomendado
                    </span>
                )}
                
                <h4 className="text-3xl font-serif mb-2 text-brand-cream">{plan.nombre}</h4>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-blue mb-8">
                    Contrato {plan.duracion}
                </span>
                
                <p className="text-zinc-500 text-sm font-light leading-relaxed mb-10 flex-grow">
                    {plan.descripcion}
                </p>

                <a 
                  href="#contacto" 
                  className={`group flex items-center justify-center gap-3 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm ${
                    plan.destacado 
                        ? 'bg-brand-blue text-white hover:bg-blue-600' 
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-brand-cream'
                  }`}
                >
                  Consultar Valor
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(PlanesOld);