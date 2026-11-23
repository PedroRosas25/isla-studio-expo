import { motion } from "framer-motion";

const LegalLayout = ({ titulo, contenido }) => {
  return (
    // CAMBIO: Fondo Negro Profundo y texto Blanco Almendra con opacidad
    <div className="min-h-screen bg-isla-black text-isla-almond/80 relative overflow-hidden font-sans">
      
      {/* Grilla técnica de fondo - Adaptada al Blanco Almendra */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#F4EAE5 2px, transparent 2px), linear-gradient(90deg, #F4EAE5 2px, transparent 2px)`, backgroundSize: '60px 60px' }}>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-40 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Título Masivo - Usamos Terracota en vez de azul */}
          <span className="text-isla-terra font-bold tracking-[0.5em] text-[10px] uppercase block mb-4">Documentación Oficial</span>
          <h1 className="text-5xl md:text-7xl font-bold text-isla-almond leading-none tracking-tighter uppercase mb-12">
            {titulo}
          </h1>
          <div className="h-[1px] w-20 bg-isla-terra/60 mb-16"></div>

          {/* Cuerpo del Texto */}
          <div className="space-y-8 text-sm md:text-base leading-relaxed tracking-wide">
            {contenido}
          </div>

          {/* Caja de Contacto - Usamos Verde Pino de fondo para resaltarlo sutilmente */}
          <section className="mt-16 p-8 bg-isla-green/20 border border-isla-almond/10">
            <h3 className="text-isla-terra font-bold mb-4 uppercase text-[10px] tracking-[0.3em]">Consultas Legales y Técnicas</h3>
            <p className="text-sm mb-6 text-isla-almond/60">
                Si tenés dudas sobre nuestros términos, tratamiento de datos o servicios, por favor contactate con nuestra dirección comercial:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <p className="text-isla-almond font-bold text-lg uppercase tracking-tight">Juan Carlos Bataller</p>
                <p className="text-[10px] text-isla-almond/50 tracking-widest">+54 9 264 506-3823</p>
                </div>
                <div>
                <p className="text-isla-almond font-bold text-lg uppercase tracking-tight">Santiago Castro</p>
                <p className="text-[10px] text-isla-almond/50 tracking-widest">+54 9 264 443-7135</p>
                </div>
            </div>
            </section>

            <div className="mt-12 pt-10 border-t border-isla-almond/10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-isla-almond/40">
                Última actualización: Julio 2026 <br />
                Isla Studio — San Juan, Argentina
            </p>
            </div>
        </motion.div>
      </main>
    </div>
  );
};

const AvisoLegal = () => (
  <LegalLayout 
    titulo={<>Aviso<br /><span className="italic text-isla-terra">Legal</span></>}
    contenido={
      <>
        <section>
            <h2 className="text-isla-almond font-bold mb-4 uppercase text-xs tracking-widest">Propiedad Intelectual</h2>
            <p>Todo el contenido audiovisual, códigos de software y diseños presentados en este portal son propiedad exclusiva de Isla Studio. Queda prohibida la reproducción total o parcial del material estético sin autorización previa.</p>
        </section>
        <section>
            <h2 className="text-isla-almond font-bold mb-4 uppercase text-xs tracking-widest">Limitación de Responsabilidad</h2>
            <p>Isla Studio actúa como proveedor técnico independiente. El uso de esta web es meramente informativo y las cotizaciones generadas están sujetas a revisión técnica final por parte de nuestro equipo comercial.</p>
        </section>
      </>
    }
  />
);

export default AvisoLegal;