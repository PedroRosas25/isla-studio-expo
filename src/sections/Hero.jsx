import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Camera, Video, Palette, Code } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-zinc-950 flex flex-col justify-center overflow-hidden pt-32 pb-12 md:py-0">
      
      {/* 1. Logo de la Expo - Versión Desktop (SOLO PANTALLAS GIGANTES) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-32 right-6 md:right-12 z-20 hidden 2xl:block"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-brand-blue/10 blur-3xl rounded-full group-hover:bg-brand-blue/20 transition-colors duration-500"></div>
          <img 
            src="/logo-expo.png" 
            alt="Logo Expo Minera San Juan" 
            className="relative w-32 md:w-44 h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </motion.div>

      {/* 2. Grilla técnica de fondo */}
      <div className="absolute inset-0 opacity-[0.065] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full relative">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-brand-blue/30 bg-brand-blue/5 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              <span className="text-[10px] text-brand-blue font-bold uppercase tracking-[0.2em]">Exposición Minera San Juan 2026</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif text-brand-cream leading-[0.85] mb-10 tracking-tighter">
              Soluciones de <br />
              <span className="text-brand-blue not-italic font-serif pr-4">Impacto</span> <br />
              Para Stands.
            </h1>
            
            {/* ZONA ROJA: Párrafo actualizado */}
            <p className="text-brand-cream text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light">
              Compañía de Negocios presenta Isla Studio para elevar la presencia de su empresa en la Expo Minera con coberturas audiovisuales premium y sistemas interactivos a medida.
            </p>
            
            <div className="flex flex-col gap-10 mb-16 md:mb-0">
              <div className="flex flex-wrap gap-8">
                {/* BOTÓN */}
                <Link to="/servicios" className="px-12 py-5 bg-brand-blue text-white font-bold flex items-center gap-3 hover:bg-blue-600 transition-all group uppercase text-[10px] tracking-[0.2em] rounded-sm text-center w-fit">
                  Ver Catálogo de Servicios
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              {/* ZONA VERDE - VERSIÓN CELULAR (Oculto en PC) */}
              {/* TRUCO: Usamos relative y -top para subir visualmente sin empujar el botón */}
              <div className="flex md:hidden items-center justify-start gap-4 w-full relative -top-12 z-10">
                <img 
                  src="/logo-isla2.png" 
                  alt="Logo Isla Studio" 
                  className="h-50 w-auto object-contain opacity-80" 
                />
                <img 
                  src="/compañiasinfondo.png" 
                  alt="Logo Compañía de Negocios" 
                  className="h-10 w-auto object-contain opacity-80 brightness-0 invert" 
                />
              </div>
            </div>

            {/* Logo de la Expo - Versión Inferior (MÓVILES Y PANTALLAS < 1536px) */}
            {/* Subimos a -top-40 para que persiga a los logos de arriba sin desarmar la página */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block 2xl:hidden text-center mt-0 border-t border-zinc-900 pt-0 relative -top-40 -mb-39"
            >
              <img 
                src="/logo-expo.png" 
                alt="Logo Expo Minera San Juan" 
                className="w-40 lg:w-48 h-auto object-contain mx-auto opacity-60"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* 3. Cuadros flotantes (Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden xl:grid grid-cols-2 gap-4 absolute right-0 top-1/2 -translate-y-1/2 w-[450px]"
        >
          {/* FOTOGRAFÍA */}
          <div className="bg-mining-dark/80 backdrop-blur-sm p-6 border border-zinc-800 flex flex-col justify-between h-40 hover:border-brand-blue/50 transition-colors rounded-sm group">
             <Camera className="text-brand-blue group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
             <span className="text-brand-cream font-bold text-base font-serif leading-tight uppercase tracking-tighter">
               Cobertura <br/> Fotográfica
             </span>
          </div>

          {/* VIDEO */}
          <div className="bg-mining-dark/80 backdrop-blur-sm p-6 border border-zinc-800 translate-y-6 flex flex-col justify-between h-40 hover:border-brand-blue/50 transition-colors rounded-sm group">
             <Video className="text-brand-blue group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
             <span className="text-brand-cream font-bold text-base font-serif leading-tight uppercase tracking-tighter">
               Producción <br/> Audiovisual
             </span>
          </div>

          {/* SOPORTE GRÁFICO */}
          <div className="bg-mining-dark/80 backdrop-blur-sm p-6 border border-zinc-800 flex flex-col justify-between h-40 hover:border-brand-blue/50 transition-colors rounded-sm group">
             <Palette className="text-brand-blue group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
             <span className="text-brand-cream font-bold text-base font-serif leading-tight uppercase tracking-tighter">
               Soporte Gráfico <br/>
               <span className="font-sans italic mr-1">&</span> Identidad
             </span>
          </div>

          {/* DESPLIEGUE WEB */}
          <div className="bg-mining-dark/80 backdrop-blur-sm p-6 border border-zinc-800 translate-y-6 flex flex-col justify-between h-40 hover:border-brand-blue/50 transition-colors rounded-sm group">
             <Code className="text-brand-blue group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
             <span className="text-brand-cream font-bold text-base font-serif leading-tight uppercase tracking-tighter">
              Despliegue Web <br/> 
              <span className="font-sans italic mr-1">&</span> Interactivos
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-12 bottom-12 hidden lg:block">
        <div className="flex flex-col items-center gap-6">
          <span className="text-[9px] text-zinc-700 uppercase tracking-[0.6em] rotate-90 mb-12">Explorar</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-brand-blue to-transparent"></div>
        </div>
      </div>
      {/* 4. ZONA VERDE - VERSIÓN PC (Oculto en Celulares) */}
      <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 items-center justify-center gap-10 w-full z-20 px-4">
        <img 
          src="/logo-isla2.png" 
          alt="Logo Isla Studio" 
          className="h-52 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" 
        />
        <img 
          src="/compañiasinfondo.png" 
          alt="Logo Compañía de Negocios" 
          className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity brightness-0 invert" 
        />
      </div>
    </section>
  );
};

export default Hero;