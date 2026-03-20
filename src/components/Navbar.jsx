import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, LogOut, User, ShieldCheck } from "lucide-react"; 
import { auth, googleProvider } from "../lib/firebase"; 
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const ADMIN_EMAILS = [
    "islastudio39@gmail.com", 
    "pedrorosasaguilar9@gmail.com"
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setIsOpen(false); 
      if (ADMIN_EMAILS.includes(user.email)) {
        navigate("/admin-isla");
      }
    } catch (error) {
      console.error("Error al loguear:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    navigate("/expo");
  };

  const handleScrollToServicios = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== "/expo") {
      navigate("/expo#servicios-info");
    } else {
      const element = document.getElementById("servicios-info");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
    if (location.pathname !== "/expo") navigate("/expo");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-zinc-950/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
          
          {/* 1. ZONA IZQUIERDA: LOGO */}
          <Link 
            to="/expo" 
            onClick={scrollToTop} 
            className={`relative z-[200] flex items-center gap-3 group transition-colors duration-500 ${isOpen ? 'text-brand-cream' : ''}`}
          >
            <img 
              src="/logo-isla.png" 
              alt="Isla Studio" 
              className="h-8 w-auto transition-all group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tighter leading-none">
                <span className="text-white">ISLA</span>
                <span className="text-brand-blue font-bold italic ml-1.5">STUDIO</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-500 font-bold hidden sm:block mt-1">
                Creative Agency
              </span>
            </div>
          </Link>

          {/* 2. ZONA DERECHA: TODOS LOS LINKS Y BOTONES UNIFICADOS */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            
            <a href="#servicios-info" onClick={handleScrollToServicios} className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] hover:text-brand-blue transition-all cursor-pointer relative group">
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full"></span>
            </a>
            
            {user && !ADMIN_EMAILS.includes(user.email) && (
              <Link to="/mis-presupuestos" className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] hover:text-brand-blue transition-all cursor-pointer relative group">
                Mis Pedidos
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full"></span>
              </Link>
            )}

            {user && ADMIN_EMAILS.includes(user.email) && (
              <Link to="/admin-isla" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-amber-400 border border-amber-400/30 px-3 py-1.5 rounded-sm hover:bg-amber-400 hover:text-black transition-all">
                <ShieldCheck size={12} /> Master Panel
              </Link>
            )}

            {/* Separador vertical sutil */}
            <div className="h-5 w-px bg-white/10 mx-1"></div>

            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-600 hover:text-red-500 transition-colors text-[9px] uppercase tracking-widest font-bold">
                <LogOut size={12} /> Salir
              </button>
            ) : (
              <button onClick={handleLogin} className="flex items-center gap-2 text-brand-blue hover:text-brand-cream transition-colors text-[9px] uppercase tracking-widest font-bold">
                <User size={12} /> Acceder
              </button>
            )}

            <Link to="/" className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] border border-brand-blue/30 px-4 py-2 rounded-sm text-brand-blue hover:bg-brand-blue hover:text-white transition-all uppercase">
              Productora <ArrowUpRight size={12} />
            </Link>

            <Link to="/servicios" className="flex items-center gap-3 px-6 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-blue-600 transition-all group shadow-[0_0_15px_rgba(0,122,255,0.2)]">
              Presupuestar
            </Link>
          </div>

          {/* MENÚ MÓVIL BURGER */}
          <button 
            className="lg:hidden relative z-[200] text-brand-cream p-2 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* MENÚ MOBILE DESPLEGABLE (Sin cambios) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-zinc-950 flex flex-col"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

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

            <div className="flex flex-col justify-center flex-grow px-10 gap-8 relative z-10">
              {[
                { name: "Inicio", path: "/expo", action: scrollToTop },
                { name: "Servicios", path: "#servicios-info", action: handleScrollToServicios },
                { name: "Ir a Productora", path: "/" },
                user && ADMIN_EMAILS.includes(user.email) && { name: "MASTER PANEL", path: "/admin-isla", isAdmin: true },
                user && !ADMIN_EMAILS.includes(user.email) && { name: "Mis Pedidos", path: "/mis-presupuestos" },
                !user && { name: "Iniciar Sesión", action: handleLogin, isLogin: true },
              ].filter(Boolean).map((link, index) => (
                <motion.div key={link.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
                  {link.isLogin ? (
                    <button onClick={link.action} className="text-4xl font-serif text-brand-blue italic hover:text-brand-cream transition-colors block">{link.name}</button>
                  ) : (
                    <Link 
                      to={link.path.startsWith('#') ? "/expo" : link.path} 
                      onClick={link.path === "#servicios-info" ? handleScrollToServicios : link.action ? link.action : () => setIsOpen(false)}
                      className={`text-4xl font-serif cursor-pointer transition-colors block ${link.isAdmin ? "text-amber-400" : "text-white hover:text-brand-blue"}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <Link 
                to="/servicios" 
                onClick={() => setIsOpen(false)}
                className="mt-4 text-[11px] font-bold tracking-[0.4em] text-brand-blue uppercase border-t border-brand-blue/20 pt-8"
              >
                — Armar Presupuesto
              </Link>
              
              {user && (
                <motion.button onClick={handleLogout} className="mt-4 text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-bold flex items-center gap-2 text-left w-fit">
                  <LogOut size={14} /> Salir de la cuenta
                </motion.button>
              )}
            </div>

            <div className="p-10 relative z-10 flex justify-between items-center opacity-40">
                <span className="text-[8px] tracking-[0.5em] uppercase text-white">San Juan / ARG</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;