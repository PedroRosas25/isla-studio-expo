import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, LogOut, User, ShieldCheck } from "lucide-react"; 
import { auth, googleProvider } from "../lib/firebase"; 
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Email administrativo
  const ADMIN_EMAIL = "islastudio39@gmail.com";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      if (user.email === ADMIN_EMAIL) {
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
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? "py-4 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800" : "py-8 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link 
          to="/expo" 
          onClick={scrollToTop} 
          className={`relative z-[200] flex items-center gap-3 group transition-colors duration-500 ${isOpen ? 'text-brand-cream' : ''}`}
        >
          <img 
            src="/logo-isla.png" 
            alt="Isla Studio Logo" 
            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
          />
          <span className="text-xl font-serif font-bold tracking-tighter text-brand-cream">
            ISLA <span className="italic text-brand-blue">STUDIO</span>
          </span>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/expo" onClick={scrollToTop} className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 hover:text-brand-blue transition-colors">Inicio</Link>
          <a href="#servicios-info" onClick={handleScrollToServicios} className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 hover:text-brand-blue transition-colors">Servicios</a>
          
          {/* ACCESO RÁPIDO ADMIN (Solo si es el mail de Isla) */}
          {user?.email === ADMIN_EMAIL && (
            <Link 
              to="/admin-isla" 
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-amber-400 border border-amber-400/30 px-3 py-1.5 rounded-sm hover:bg-amber-400 hover:text-black transition-all"
            >
              <ShieldCheck size={12} /> Master Panel
            </Link>
          )}

          {user && user.email !== ADMIN_EMAIL && (
            <Link 
              to="/mis-presupuestos" 
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-blue border-b border-brand-blue/30 pb-1"
            >
              Mis Pedidos
            </Link>
          )}

          <div className="flex items-center gap-4 ml-4">
            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-600 hover:text-red-500 transition-colors text-[9px] uppercase tracking-widest font-bold mr-2">
                <LogOut size={12} /> Salir
              </button>
            ) : (
              <button onClick={handleLogin} className="flex items-center gap-2 text-brand-blue hover:text-brand-cream transition-colors text-[9px] uppercase tracking-widest font-bold mr-2">
                <User size={12} /> Acceder
              </button>
            )}

            <Link to="/" className="flex items-center gap-2 px-5 py-2.5 border border-zinc-800 text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-cream hover:border-zinc-600 transition-all rounded-sm">
              Productora <ArrowUpRight size={12} />
            </Link>

            <Link to="/servicios" className="px-8 py-2.5 bg-brand-blue text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all">
              Presupuestar
            </Link>
          </div>
        </div>

        <button 
          className="md:hidden relative z-[200] text-brand-cream p-2 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 top-0 left-0 w-full h-[100dvh] z-[150] bg-zinc-950 flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '45px 45px' }}></div>

            <div className="relative z-10 flex flex-col items-center gap-8 w-full pt-20">
              {[
                { name: "Inicio", path: "/expo", action: scrollToTop },
                { name: "Servicios", path: "#servicios-info", action: handleScrollToServicios },
                { name: "Ir a Productora", path: "/" },
                // Mostrar Master Panel en Mobile si es el admin
                user?.email === ADMIN_EMAIL && { name: "MASTER PANEL", path: "/admin-isla", isAdmin: true },
                user && user.email !== ADMIN_EMAIL && { name: "Mis Pedidos", path: "/mis-presupuestos" },
                !user && { name: "Iniciar Sesión", action: handleLogin, isLogin: true },
                { name: "Presupuestar", path: "/servicios", highlight: true }
              ].filter(Boolean).map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }} className="w-full text-center">
                  {link.isLogin ? (
                    <button onClick={link.action} className="text-5xl font-serif text-brand-blue italic tracking-tighter hover:text-brand-cream transition-all">{link.name}</button>
                  ) : (
                    <Link 
                      to={link.path.startsWith('#') ? "/expo" : link.path} 
                      onClick={link.path === "#servicios-info" ? handleScrollToServicios : link.action ? link.action : () => setIsOpen(false)}
                      className={`text-5xl font-serif tracking-tighter transition-all 
                        ${link.isAdmin ? "text-amber-400 not-italic" : 
                          link.highlight ? "text-brand-blue not-italic underline underline-offset-8" : 
                          "text-brand-cream hover:text-brand-blue"}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {user && (
                <motion.button onClick={handleLogout} className="mt-4 text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-bold flex items-center gap-2">
                  <LogOut size={14} /> Salir de la terminal
                </motion.button>
              )}
            </div>

            <div className="absolute bottom-16 flex flex-col items-center gap-2 opacity-20 pb-4">
              <div className="h-[1px] w-40 bg-brand-blue"></div>
              <span className="text-[8px] uppercase tracking-[0.8em] text-brand-cream font-bold">Isla Studio — Expo 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;