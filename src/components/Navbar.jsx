import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. IMPORTAMOS LINK DE REACT ROUTER
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 2. CREAMOS UN ARREGLO DE RUTAS INTELIGENTE
  // Los que tienen "/#" apuntan a la Home y scrollean. El de "/servicios" va a tu página nueva.
const navLinks = [
    { title: 'Trabajos', url: '/trabajos' },
    { title: 'Servicios', url: '/servicios' },
    { title: 'Clientes', url: '/clientes' }, // ¡NUEVO!
    { title: 'Contacto', url: '/contacto' } 
  ];

  return (
    <>
      {/* BARRA SUPERIOR ABSOLUTA */}
      {/* Limpiamos la clase font-sans porque se hereda del global */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center text-isla-almond mix-blend-difference">
        
        {/* LOGO: Ahora es un Link que te lleva a la Home (/) */}
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tighter uppercase cursor-pointer hover:text-isla-terra transition-colors duration-300"
        >
          Isla Studio
        </Link>
        
        {/* BOTÓN ABRIR MENÚ */}
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 hover:text-isla-terra transition-colors duration-300 uppercase tracking-widest text-sm font-bold"
        >
          Menú <Menu size={28} strokeWidth={2} />
        </button>
      </nav>

      {/* MENÚ DESPLEGABLE A PANTALLA COMPLETA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-isla-black flex flex-col"
          >
            
            {/* CABECERA DEL MENÚ */}
            <div className="px-6 md:px-12 py-8 flex justify-between items-center text-isla-almond">
              <Link 
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold tracking-tighter uppercase hover:text-isla-terra transition-colors"
              >
                Isla Studio
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-isla-terra hover:text-isla-almond transition-colors duration-300 uppercase tracking-widest text-sm font-bold"
              >
                Cerrar <X size={28} strokeWidth={2} />
              </button>
            </div>

            {/* ENLACES GIGANTES INTERACTIVOS */}
            <div className="flex-1 flex flex-col justify-center items-center gap-8 md:gap-12 text-center">
              {navLinks.map((item) => (
                <Link 
                  key={item.title} 
                  to={item.url}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-isla-almond hover:text-isla-terra transition-colors duration-300 tracking-tighter uppercase relative group"
                >
                  {item.title}
                  {/* Subrayado animado en Terracota */}
                  <span className="absolute -bottom-2 left-0 w-0 h-[4px] bg-isla-terra transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            
            {/* PIE DEL MENÚ */}
            <div className="py-10 text-center text-isla-green uppercase tracking-[0.3em] text-xs md:text-sm font-bold">
              Comunicación Visual — San Juan, Argentina
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;