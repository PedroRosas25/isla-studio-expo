import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, memo } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

// --- ELEMENTOS GEOMÉTRICOS EDITORIALES ---
const acentosGraficos = [
  { id: 1, text: "✦", top: "12%", left: "8%", size: "text-3xl", delay: 0 },
  { id: 2, text: "○", top: "22%", left: "20%", size: "text-2xl", delay: 1 },
  { id: 3, text: "+", top: "35%", left: "5%", size: "text-4xl", delay: 2 },
  { id: 4, text: "△", top: "65%", left: "10%", size: "text-3xl", delay: 0.5 },
  { id: 5, text: "//", top: "85%", left: "15%", size: "text-2xl", delay: 1.5 },
  { id: 6, text: "✦", top: "75%", left: "28%", size: "text-xl", delay: 2.5 },
  { id: 7, text: "□", top: "15%", right: "12%", size: "text-4xl", delay: 0.8 },
  { id: 8, text: "✦", top: "25%", right: "25%", size: "text-2xl", delay: 1.8 },
  { id: 9, text: "○", top: "40%", right: "6%", size: "text-3xl", delay: 0.2 },
  { id: 10, text: "//", top: "68%", right: "14%", size: "text-xl", delay: 1.2 },
  { id: 11, text: "+", top: "82%", right: "22%", size: "text-3xl", delay: 2.2 },
  { id: 12, text: "△", top: "88%", right: "8%", size: "text-2xl", delay: 0.7 },
  { id: 13, text: "✦", top: "8%", left: "45%", size: "text-xl", delay: 1.1 },
  { id: 14, text: "○", top: "12%", right: "40%", size: "text-sm", delay: 2.1 },
  { id: 15, text: "□", top: "90%", left: "40%", size: "text-xl", delay: 0.4 },
  { id: 16, text: "✦", top: "85%", right: "35%", size: "text-2xl", delay: 1.6 },
];

const palabrasDinamicas = ["tu Presencia Digital.", "tu Marca.", "tu Contenido Visual.", "tus Ventas."];

function Hero() {
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

  const movX = useTransform(smoothX, [-0.5, 0.5], [40, -40]);
  const movY = useTransform(smoothY, [-0.5, 0.5], [40, -40]);

  const [indexPalabra, setIndexPalabra] = useState(0);
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexPalabra((prev) => (prev + 1) % palabrasDinamicas.length);
    }, 2500);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section 
      style={{ perspective: "1000px" }}
      className="relative min-h-[100dvh] flex flex-col justify-center items-center bg-[#151618] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,122,255,0.06)_0%,transparent_70%)] pointer-events-none z-0"></div>

      {acentosGraficos.map((acento) => (
        <motion.div
          key={acento.id}
          // Agregamos will-change-transform para fluidez máxima
          className={`absolute text-brand-blue/10 md:text-brand-blue/30 font-light pointer-events-none z-0 ${acento.size} will-change-transform`}
          style={{
            top: acento.top,
            left: acento.left,
            right: acento.right,
            x: window.innerWidth >= 768 ? movX : 0,
            y: window.innerWidth >= 768 ? movY : 0,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: acento.delay }}
        >
          {acento.text}
        </motion.div>
      ))}

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto -mt-10 md:mt-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
          transition={{ 
            opacity: { duration: 1 }, 
            scale: { duration: 1 }, 
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="will-change-transform"
        >
          <img 
            src={logo} 
            alt="Isla Studio Logo" 
            className="h-24 md:h-36 w-auto mb-6 drop-shadow-2xl" 
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-brand-cream"
        >
          ISLA STUDIO
        </motion.h1>

        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-brand-blue rounded-full mb-6"
        />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl text-brand-grey font-light mb-12 flex flex-col md:flex-row items-center justify-center gap-2 ml-4"
        >
          <span>Impulsamos y elevamos</span>
          <div className="relative w-full md:w-[280px] h-[32px] md:h-[40px] flex items-center justify-center md:justify-start">
            <AnimatePresence mode="wait">
              <motion.span
                key={indexPalabra}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-brand-cream font-bold absolute text-center w-full md:text-left md:w-auto md:left-0"
              >
                {palabrasDinamicas[indexPalabra]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a 
            href="#valores" 
            className="px-8 py-3.5 border border-brand-blue bg-brand-blue text-brand-cream font-bold rounded-full hover:bg-[#005bb5] transition-all duration-300 backdrop-blur-sm shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:shadow-[0_0_30px_rgba(0,122,255,0.6)]"
          >
            Descubrir Isla
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Hero);