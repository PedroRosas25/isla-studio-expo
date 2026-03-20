import { motion } from "framer-motion";

const LegalLayout = ({ titulo, contenido }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 relative overflow-hidden">
      {/* Grilla técnica de fondo - Continuidad Estética */}
      <div className="absolute inset-0 opacity-[0.065] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 3px, transparent 3px), linear-gradient(90deg, #ffffff 3px, transparent 3px)`, backgroundSize: '60px 60px' }}>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-40 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Título Masivo Estilo Hero */}
          <span className="text-brand-blue font-bold tracking-[0.5em] text-[10px] uppercase block mb-4">Documentación Oficial</span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-cream leading-none tracking-tighter uppercase mb-12">
            {titulo}
          </h1>
          <div className="h-[1px] w-20 bg-brand-blue/40 mb-16"></div>

          {/* Cuerpo del Texto */}
          <div className="space-y-8 font-sans text-sm md:text-base leading-relaxed tracking-wide">
            {contenido}
          </div>

          <section className="mt-16 p-8 bg-mining-dark/20 border border-zinc-900">
            <h3 className="text-brand-blue font-bold mb-4 uppercase text-[10px] tracking-[0.3em]">Consultas Legales y Técnicas</h3>
            <p className="text-sm mb-6 text-zinc-500">
                Si tiene dudas sobre nuestros términos, tratamiento de datos o servicios, por favor contáctese con nuestra dirección comercial:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <p className="text-brand-cream font-serif text-lg italic">Juan Carlos Bataller</p>
                <p className="text-[10px] text-zinc-600 tracking-widest">+54 9 264 506-3823</p>
                </div>
                <div>
                <p className="text-brand-cream font-serif text-lg italic">Santiago Castro</p>
                <p className="text-[10px] text-zinc-600 tracking-widest">+54 9 264 443-7135</p>
                </div>
            </div>
            </section>

            <div className="mt-12 pt-10 border-t border-zinc-900">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Última actualización: Marzo 2026 <br />
                Isla Studio — San Juan, Argentina
            </p>
            </div>
        </motion.div>
      </main>
    </div>
  );
};

const Cookies = () => (
  <LegalLayout 
    titulo={<>Uso de<br /><span className="italic text-brand-blue">Cookies</span></>}
    contenido={
      <>
        <section>
          <h2 className="text-brand-cream font-bold mb-4 uppercase text-xs tracking-widest text-serif">01. Cookies Técnicas</h2>
          <p>Este sitio utiliza cookies esenciales de Firebase y Google para permitir el inicio de sesión seguro y mantener la persistencia de su presupuesto mientras navega por las distintas secciones.</p>
        </section>
        <section>
          <h2 className="text-brand-cream font-bold mb-4 uppercase text-xs tracking-widest text-serif">02. Desactivación</h2>
          <p>Al ser cookies estrictamente necesarias para el funcionamiento de la herramienta interactiva, la desactivación de las mismas podría impedir el acceso a las funciones de personalización de servicios.</p>
        </section>
      </>
    }
  />
);

export default Cookies;