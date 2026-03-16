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

  // 1. Manejo de Scroll y Auth
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

  // 2. BLOQUEO DE SCROLL (Mata el bug del menú desplazado)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
        const offset = 80; // Altura de la navbar para que no tape el título
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-[500] transition-all duration-300 ${
      scrolled ? "py-4 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800" : "py-8 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO - Siempre por encima del menú móvil */}
        <Link 
          to="/" 
          onClick={scrollToTop} 
          className="relative z-[600] flex items-center gap-3 group"
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
          <Link to="/" onClick={scrollToTop} className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 hover:text-brand-blue transition-colors">Inicio</Link>
          <a href="#servicios-info" onClick={handleScrollToServicios} className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 hover:text-brand-blue transition-colors">Servicios</a>
          
          {user && (
            <Link to="/mis-presupuestos" className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-blue border-b border-brand-blue/30 pb-1">
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

            <a href="https://pedrorosas25.github.io/isla-studio/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 border border-zinc-800 text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-cream hover:border-zinc-600 transition-all rounded-sm">
              Conocé Isla <ArrowUpRight size={12} />
            </a>

            <Link to="/servicios" className="px-8 py-2.5 bg-brand-blue text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all">
              Presupuestar
            </Link>
          </div>
        </div>

        {/* BOTÓN HAMBURGUESA - Z-index alto para quedar sobre el menú */}
        <button 
          className="md:hidden relative z-[600] text-brand-cream p-2 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
        </button>
      </div>

      {/* MENÚ MOBILE FULL SCREEN CORREGIDO */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            /* fixed e inset-0 garantizan que cubra todo desde el scroll actual */
            className="fixed inset-0 z-[550] bg-zinc-950 flex flex-col justify-center items-center"
          >
            {/* Grilla técnica */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '45px 45px' }}>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 w-full px-6">
              {[
                { name: "Inicio", path: "/", action: scrollToTop },
                { name: "Servicios", path: "#servicios-info", action: handleScrollToServicios },
                { name: "Conocé Isla", path: "https://pedrorosas25.github.io/isla-studio/", external: true },
                user && { name: "Mis Pedidos", path: "/mis-presupuestos", action: () => setIsOpen(false) },
                !user && { name: "Iniciar Sesión", action: handleLogin, isLogin: true },
                { name: "Presupuestar", path: "/servicios", highlight: true, action: () => setIsOpen(false) }
              ].filter(Boolean).map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="w-full text-center"
                >
                  {link.external ? (
                    <a href={link.path} target="_blank" rel="noreferrer" className="text-4xl font-serif text-brand-cream tracking-tighter hover:text-brand-blue">
                      {link.name}
                    </a>
                  ) : link.isLogin ? (
                    <button onClick={link.action} className="text-4xl font-serif text-brand-blue italic tracking-tighter">
                      {link.name}
                    </button>
                  ) : (
                    <Link 
                      to={link.path.startsWith('#') ? "/" : link.path} 
                      onClick={link.action}
                      className={`text-4xl font-serif tracking-tighter transition-all ${
                        link.highlight ? "text-brand-blue italic" : "text-brand-cream"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {user && (
                <button onClick={handleLogout} className="mt-8 text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-bold flex items-center gap-2">
                  <LogOut size={14} /> Salir de la terminal
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;