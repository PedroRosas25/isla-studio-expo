import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, memo } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

const palabrasDinamicas = ["tu Presencia Digital.", "tu Marca.", "tu Contenido Visual.", "tus Ventas."];

function HeroOld() {
  const xMouse = useMotionValue(0);
  const yMouse = useMotionValue(0);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleMouseMove = (e) => {
      xMouse.set(e.clientX / window.innerWidth - 0.5);
      yMouse.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [xMouse, yMouse]);

  const smoothX = useSpring(xMouse, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(yMouse, { damping: 50, stiffness: 100 });

  const [indexPalabra, setIndexPalabra] = useState(0);
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexPalabra((prev) => (prev + 1) % palabrasDinamicas.length);
    }, 2500);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section 
      className="relative min-h-[100dvh] flex flex-col justify-center items-center bg-zinc-950 overflow-hidden"
    >
      {/* 1. GRILLA TÉCNICA (Identidad Expo) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      {/* 2. GRADIENTE DE FONDO AZUL SUAVE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,122,255,0.08)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto"
      >
        {/* BADGE SUPERIOR TIPO TERMINAL */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-brand-blue/30 bg-brand-blue/5 rounded-full mb-10"
        >
          <span className="text-[10px] text-brand-blue font-bold uppercase tracking-[0.3em]">Productora Audiovisual</span>
        </motion.div>

        {/* LOGO CON FLOAT ANIMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
          transition={{ 
            opacity: { duration: 1 }, 
            scale: { duration: 1 }, 
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="mb-8"
        >
          <img 
            src={logo} 
            alt="Isla Studio Logo" 
            className="h-20 md:h-28 w-auto filter grayscale brightness-200 opacity-90" 
          />
        </motion.div>

        {/* TÍTULO PRINCIPAL (Estética Serif) */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-brand-cream leading-none mb-8 tracking-tighter"
        >
          ISLA <span className="not-italic font-serif text-brand-blue">STUDIO</span>
        </motion.h1>

        {/* TEXTO DINÁMICO REFINADO */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl text-zinc-500 font-light mb-16 flex flex-col items-center gap-2"
        >
          <span className="uppercase tracking-[0.2em] text-[12px] font-bold text-zinc-600 mb-2">Impulsamos y elevamos</span>
          <div className="relative h-[40px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={indexPalabra}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-brand-cream font-serif italic text-3xl md:text-4xl"
              >
                {palabrasDinamicas[indexPalabra]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* BOTÓN ESTILO EXPO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a 
            href="#valores" 
            className="px-10 py-4 bg-brand-blue text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-blue-600 transition-all flex items-center gap-4 group"
          >
            Descubrir Isla
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>

      {/* DECORACIÓN INFERIOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <div className="h-12 w-[1px] bg-gradient-to-b from-brand-blue to-transparent"></div>
      </div>
    </section>
  );
}

export default memo(HeroOld);