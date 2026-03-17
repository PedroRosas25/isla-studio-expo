import { useEffect, memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react"; 
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavbarOld() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Bloqueo de scroll cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Función para volver al inicio con scroll suave
  const scrollToTop = (e) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      navigate("/");
      // En navegación entre páginas, el navegador suele resetear al top automáticamente
    }
  };

  // Función para navegación interna y entre páginas
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/[0.05]"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO SECCIÓN - DISEÑO DUAL Y SCROLL SUAVE */}
          <Link to="/" className="flex items-center gap-3 group" onClick={scrollToTop}>
            <img 
              src={logo} 
              alt="Isla Studio" 
              className="h-10 w-auto filter grayscale brightness-200 transition-all group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tighter leading-none">
                <span className="text-white">ISLA</span>
                <span className="text-brand-blue font-bold italic ml-1.5">STUDIO</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-500 font-bold hidden sm:block">
                Creative Agency
              </span>
            </div>
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center gap-10">
            {['valores', 'servicios', 'planes', 'equipo'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                onClick={(e) => handleNavClick(e, item)} 
                className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] hover:text-brand-blue transition-all cursor-pointer relative group"
              >
                {item === 'valores' ? 'Filosofía' : item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full"></span>
              </a>
            ))}
            <Link 
              to="/expo" 
              className="text-[9px] font-bold tracking-[0.2em] border border-brand-blue/30 px-4 py-2 rounded-sm text-brand-blue hover:bg-brand-blue hover:text-white transition-all"
            >
              PROYECTO EXPO 2026
            </Link>
          </div>

          {/* BOTÓN CONTACTO */}
          <a 
            href="#contacto" 
            onClick={(e) => handleNavClick(e, 'contacto')}
            className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-blue-600 transition-all group"
          >
            Contacto
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          {/* BURGER MENU */}
          <button 
            className="md:hidden text-brand-cream p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* MENU MOBILE DESPLEGABLE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[999] bg-zinc-950 flex flex-col"
          >
            {/* Grilla de fondo */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            ></div>

            {/* Header del menú desplegable */}
            <div className="flex items-center justify-between px-6 h-20 shrink-0 border-b border-white/5 relative z-10">
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-tighter leading-none">
                  <span className="text-white">ISLA</span>
                  <span className="text-brand-blue font-bold italic ml-1.5">STUDIO</span>
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white p-2">
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            {/* Links del menú desplegable */}
            <div className="flex flex-col justify-center flex-grow px-10 gap-10 relative z-10">
              {['valores', 'servicios', 'planes', 'equipo', 'contacto'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    onClick={(e) => handleNavClick(e, item)}
                    className="text-4xl font-serif text-white cursor-pointer hover:text-brand-blue transition-colors block"
                  >
                    {item === 'valores' ? 'Filosofía' : item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </motion.div>
              ))}
              
              <Link 
                to="/expo" 
                onClick={() => setIsOpen(false)}
                className="mt-4 text-[11px] font-bold tracking-[0.4em] text-brand-blue uppercase border-t border-brand-blue/20 pt-8"
              >
                — Especial Expo 2026
              </Link>
            </div>

            {/* Footer del menú desplegable */}
            <div className="p-10 relative z-10 flex justify-between items-center opacity-40">
                <span className="text-[8px] tracking-[0.5em] uppercase text-white">San Juan / ARG</span>
                <span className="text-[8px] tracking-[0.5em] uppercase text-white">v2.06</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(NavbarOld);