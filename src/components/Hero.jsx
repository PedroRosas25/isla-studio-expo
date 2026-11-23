import { useRef, useState, useEffect } from "react";
import { ArrowDown, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const sliderRef = useRef(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const proyectosHero = [
    { 
      id: 1, 
      tipo: "video", 
      media: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4" 
    },
    { 
      id: 2, 
      tipo: "imagen", 
      media: "https://images.unsplash.com/photo-1772306105241-fc51849ab40d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    { 
      id: 3, 
      tipo: "imagen", 
      media: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070&auto=format&fit=crop" 
    },
  ];

  const extendedProyectos = [
    { ...proyectosHero[proyectosHero.length - 1], id: 'clone-end' },
    ...proyectosHero,
    { ...proyectosHero[0], id: 'clone-start' }
  ];

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.clientWidth;
    }
  }, []);

  const handleScroll = (e) => {
    if (isDragging) return; 
    
    const slider = e.target;
    const width = slider.clientWidth;
    const total = proyectosHero.length;
    
    if (slider.scrollLeft === 0) {
      slider.scrollLeft = width * total;
    } 
    else if (slider.scrollLeft >= width * (total + 1) - 1) {
      slider.scrollLeft = width;
    }
  };

  const slideSiguiente = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      slider.scrollTo({ left: slider.scrollLeft + slider.clientWidth, behavior: 'smooth' });
    }
  };

  const slideAnterior = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      slider.scrollTo({ left: slider.scrollLeft - slider.clientWidth, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    
    const slider = sliderRef.current;
    const width = slider.clientWidth;
    const total = proyectosHero.length;
    
    const distance = (e.pageX - startX) * 1.5; 
    let newScrollLeft = scrollLeft - distance;
    
    if (newScrollLeft <= 0) {
      newScrollLeft += width * total;
      setStartX(e.pageX);
      setScrollLeft(newScrollLeft);
    } else if (newScrollLeft >= width * (total + 1)) {
      newScrollLeft -= width * total;
      setStartX(e.pageX);
      setScrollLeft(newScrollLeft);
    }
    
    slider.scrollLeft = newScrollLeft;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const slider = sliderRef.current;
    if (!slider) return;
    
    const width = slider.clientWidth;
    const diff = slider.scrollLeft - scrollLeft; 
    const indexInicial = Math.round(scrollLeft / width);

    if (diff > 50) {
      slider.scrollTo({ left: (indexInicial + 1) * width, behavior: 'smooth' });
    } else if (diff < -50) {
      slider.scrollTo({ left: (indexInicial - 1) * width, behavior: 'smooth' });
    } else {
      slider.scrollTo({ left: indexInicial * width, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full bg-isla-black overflow-hidden group">
      
      <div 
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className={`absolute inset-0 flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none ${
          isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
        }`}
      >
        {extendedProyectos.map((proyecto, index) => (
          <div key={`${proyecto.id}-${index}`} className="min-w-full h-full relative shrink-0 snap-center">
            
            {/* CAMBIO: bg-black genérico reemplazado por bg-isla-black para mantener la temperatura tonal */}
            <div className="absolute inset-0 bg-isla-black/40 z-10 pointer-events-none"></div>
            
            {proyecto.tipo === "video" ? (
              <video 
                src={proyecto.media} 
                autoPlay 
                muted 
                loop 
                playsInline 
                draggable="false" 
                className="w-full h-full object-cover pointer-events-none"
              />
            ) : (
              <img 
                src={proyecto.media} 
                alt="Proyecto Isla Studio" 
                draggable="false" 
                className="w-full h-full object-cover pointer-events-none"
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between px-4 md:px-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* CAMBIO: Colores de marca en los botones y hover en Terracota */}
        <button 
          onClick={slideAnterior}
          className="pointer-events-auto bg-isla-black/30 hover:bg-isla-black/80 text-isla-almond hover:text-isla-terra p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={slideSiguiente}
          className="pointer-events-auto bg-isla-black/30 hover:bg-isla-black/80 text-isla-almond hover:text-isla-terra p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-6 md:p-10 z-20">
        <div className="flex justify-between items-end pointer-events-auto w-full">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-[9rem] font-sans font-bold text-isla-almond leading-[0.85] tracking-tighter pointer-events-none uppercase"
            >
              Nuestro <br /> Trabajo
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-isla-almond/70 font-sans text-xs md:text-sm uppercase tracking-[0.3em] mt-8 flex items-center gap-4 pointer-events-none"
            >
              <span className="w-12 h-[1px] bg-isla-almond/70"></span>
              Arrastrar para explorar
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            // CAMBIO: Hover en Terracota para la flecha indicadora
            className="hidden md:flex flex-col items-center gap-4 mb-4 text-isla-almond cursor-pointer hover:text-isla-terra transition-colors"
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ArrowDown size={32} strokeWidth={1.5} className="animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;