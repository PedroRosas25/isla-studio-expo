import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, LogOut, User } from "lucide-react"; 
import { auth, googleProvider } from "../lib/firebase"; 
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  // FUNCIÓN PARA LOGIN DESDE NAVBAR
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setIsOpen(false); 

      if (user.email === "islastudio39@gmail.com") {
        navigate("/admin-isla");
      }
      
    } catch (error) {
      console.error("Error al loguear:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    navigate("/");
  };

  const handleScrollToServicios = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/#servicios-info");
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
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? "py-4 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800" : "py-8 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO - Subí el Z-INDEX a 300 para que se vea sobre el menú */}
        <Link 
          to="/" 
          onClick={scrollToTop} 
          className={`relative z-[300] flex items-center gap-3 group transition-colors duration-500 ${isOpen ? 'text-brand-cream' : ''}`}
        >
          <img 
            src="/logo-isla.png" 
            alt="Isla Studio Logo" 
            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
          />
          <span className="text-xl font-serif font-bold tracking-tighter text-brand-cream font-playfair">
            ISLA <span className="italic text-brand-blue">STUDIO</span>
          </span>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-10 font-sans">
          <Link to="/" onClick={scrollToTop} className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 hover:text-brand-blue transition-colors">Inicio</Link>
          <a href="#servicios-info" onClick={handleScrollToServicios} className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 hover:text-brand-blue transition-colors">Servicios</a>
          
          {user && (
            <Link 
              to="/mis-presupuestos" 
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-blue border-b border-brand-blue/30 pb-1"
            >
              Mis Pedidos
            </Link>
          )}

          <div className="flex items-center gap-4 ml-4 font-sans">
            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-zinc-600 hover:text-red-500 transition-colors text-[9px] uppercase tracking-widest font-bold mr-2"
              >
                <LogOut size={12} /> Salir
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 text-brand-blue hover:text-brand-cream transition-colors text-[9px] uppercase tracking-widest font-bold mr-2"
              >
                <User size={12} /> Acceder
              </button>
            )}

            <a href="https://pedrorosas25.github.io/isla-studio/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 border border-zinc-800 text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-cream hover:border-zinc-600 transition-all rounded-sm">
              Conocé Isla
              <ArrowUpRight size={12} />
            </a>

            <Link to="/servicios" className="px-8 py-2.5 bg-brand-blue text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all">
              Presupuestar
            </Link>
          </div>
        </div>

        {/* BOTÓN HAMBURGUESA - Subí el Z-INDEX a 300 para que la X no desaparezca */}
        <button 
          className="md:hidden relative z-[300] text-brand-cream p-2 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
        </button>
      </div>

      {/* MENÚ MOBILE FULL SCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[250] bg-zinc-950 flex flex-col items-center"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div 
              className="absolute inset-0 opacity-[0.07] pointer-events-none" 
              style={{ 
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
                backgroundSize: '45px 45px' 
              }}
            ></div>

            {/* Contenedor de links centrado */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full pt-10">
              {[
                { name: "Inicio", path: "/", action: scrollToTop },
                { name: "Servicios", path: "#servicios-info", action: handleScrollToServicios },
                { name: "Conocé Isla", path: "https://pedrorosas25.github.io/isla-studio/", external: true },
                user && { name: "Mis Pedidos", path: "/mis-presupuestos" },
                !user && { name: "Iniciar Sesión", action: handleLogin, isLogin: true },
                { name: "Presupuestar", path: "/servicios", highlight: true }
              ].filter(Boolean).map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                  className="w-full text-center mb-6"
                >
                  {link.external ? (
                    <a href={link.path} target="_blank" rel="noreferrer" className="text-5xl font-serif text-brand-cream tracking-tighter hover:text-brand-blue transition-all">
                      {link.name}
                    </a>
                  ) : link.isLogin ? (
                    <button 
                      onClick={link.action}
                      className="text-5xl font-serif text-brand-blue italic tracking-tighter hover:text-brand-cream transition-all"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link 
                      to={link.path.startsWith('#') ? "/" : link.path} 
                      onClick={link.path === "#servicios-info" ? handleScrollToServicios : link.action ? link.action : () => setIsOpen(false)}
                      className={`text-5xl font-serif tracking-tighter transition-all ${
                        link.highlight ? "text-brand-blue italic underline underline-offset-8" : "text-brand-cream hover:text-brand-blue"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {user && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleLogout}
                  className="mt-2 text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-bold flex items-center gap-2 font-sans"
                >
                  <LogOut size={14} /> Salir de la terminal
                </motion.button>
              )}
            </div>

            {/* Detalle inferior corregido para visibilidad en móvil */}
            <div className="relative z-10 pb-16 flex flex-col items-center gap-2 opacity-20">
              <div className="h-[1px] w-40 bg-brand-blue"></div>
              <span className="text-[8px] uppercase tracking-[0.8em] text-brand-cream font-bold font-sans">Isla Studio — Expo 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;