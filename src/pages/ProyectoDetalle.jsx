import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { proyectos } from '../data/proyectosData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProyectoDetalle = () => {
  const { id } = useParams();
  const proyecto = proyectos.find(p => p.id === id);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // ESTADOS DEL REPRODUCTOR
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  if (!proyecto) {
    return <Navigate to="/" />;
  }

  // FUNCIÓN MAESTRA: Expande/Desmutea o Contrae/Mutea
  const togglePlay = () => {
    if (videoRef.current) {
      if (isExpanded) {
        videoRef.current.pause();
        videoRef.current.muted = true;
        setIsExpanded(false);
      } else {
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsExpanded(true);
      }
    }
  };

  // CÁLCULO INTELIGENTE DEL MOUSE PARA NO TAPAR LOS CONTROLES NATIVOS
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const yPosDentroDelVideo = e.clientY - rect.top;
      
      // Si el video está expandido y el mouse entra en el 15% de abajo (zona controles)
      // apagamos el cursor personalizado para que el usuario pueda usar la línea de tiempo.
      if (isExpanded && yPosDentroDelVideo > rect.height * 0.85) {
        setShowCustomCursor(false);
      } else {
        setShowCustomCursor(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-isla-black text-isla-almond font-sans">
      <Navbar />

      <main className="pt-32 pb-20">
        
        {/* BOTÓN VOLVER */}
        <div className="px-6 md:px-12 lg:px-20 mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-isla-terra uppercase tracking-widest text-xs font-bold hover:text-isla-almond transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
        </div>

        {/* TÍTULO GIGANTE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-12 lg:px-20 mb-12 md:mb-20"
        >
          <span className="text-isla-terra font-bold tracking-[0.3em] text-xs md:text-sm uppercase block mb-4">
            Cliente: {proyecto.cliente}
          </span>
          <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] uppercase text-isla-almond">
            {proyecto.titulo}
          </h1>
        </motion.div>

        {/* IMAGEN PRINCIPAL */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full h-[50vh] md:h-[80vh] mb-20 md:mb-32"
        >
          <img 
            src={proyecto.imagenPrincipal} 
            alt={proyecto.titulo} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* TEXTO / DESCRIPCIÓN */}
        <div className="px-6 md:px-12 lg:px-20 mb-20 md:mb-32 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h3 className="text-isla-terra font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
              El Desafío
            </h3>
          </div>
          <div className="md:col-span-8">
            {proyecto.descripcion.map((parrafo, index) => (
              <p 
                key={index} 
                className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.6] tracking-tight mb-8 text-isla-almond/90"
              >
                {parrafo}
              </p>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* REPRODUCTOR DE VIDEO ESTILO WIEDEN+KENNEDY */}
        {/* ========================================================= */}
        {proyecto.videoPrincipal && (
          <div className="w-full px-6 md:px-12 lg:px-20 mb-20 md:mb-32">
            
            <motion.div 
              ref={containerRef}
              // Animación de altura: arranca apaisado y se vuelve gigante al hacer play
              animate={{ height: isExpanded ? '85vh' : '40vh' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Curva brutalista suave
              className={`relative w-full bg-isla-black overflow-hidden ${showCustomCursor ? 'cursor-none' : 'cursor-auto'}`}
              onMouseEnter={() => setShowCustomCursor(true)}
              onMouseLeave={() => setShowCustomCursor(false)}
              onMouseMove={handleMouseMove}
            >
              
              <video 
                ref={videoRef}
                src={proyecto.videoPrincipal}
                loop
                muted // Arranca muteado por defecto
                playsInline
                // Solo activamos controles nativos si está expandido
                controls={isExpanded} 
                className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${!isExpanded ? 'opacity-60 grayscale scale-100' : 'opacity-100 grayscale-0 scale-100'}`}
              />

              {/* CAPA INVISIBLE DE CLIC: Protege la zona inferior para no pisar los controles nativos */}
              <div 
                className="absolute top-0 left-0 w-full z-10"
                style={{ height: isExpanded ? '85%' : '100%' }}
                onClick={togglePlay}
              />

              {/* CURSOR PERSONALIZADO (PLAY o X) */}
              <AnimatePresence>
                {showCustomCursor && (
                  <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center mix-blend-difference text-isla-almond"
                    animate={{
                      x: mousePosition.x - 40, // Centramos el texto en el mouse
                      y: mousePosition.y - 20,
                      scale: 1,
                      opacity: 1
                    }}
                    initial={{ scale: 0.5, opacity: 0, x: mousePosition.x - 40, y: mousePosition.y - 20 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", mass: 0.1, stiffness: 200, damping: 20 }}
                  >
                    {isExpanded ? (
                      <X size={64} strokeWidth={1} className="drop-shadow-2xl" />
                    ) : (
                      <span className="text-5xl md:text-7xl font-bold uppercase tracking-tighter drop-shadow-2xl">
                        Play
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}

        {/* GALERÍA DE IMÁGENES */}
        {proyecto.galeria && proyecto.galeria.length > 0 && (
          <div className="px-6 md:px-12 lg:px-20 mb-32 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {proyecto.galeria.map((img, index) => (
              <div key={index} className="aspect-square bg-isla-black/50 overflow-hidden">
                <img 
                  src={img} 
                  alt={`${proyecto.titulo} Detalle ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProyectoDetalle;