import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { proyectos } from "../data/proyectosData";

const TarjetaProyecto = ({ id, cliente, titulo, imagen, video }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; 
    }
  };

  return (
    <Link 
      to={`/proyecto/${id}`}
      className="flex flex-col gap-6 cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-isla-black/50">
        <img 
          src={imagen} alt={titulo} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <video 
          ref={videoRef} src={video} muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-isla-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-isla-terra text-isla-almond rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <ArrowUpRight size={32} strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-isla-green text-sm md:text-base uppercase tracking-[0.2em] font-bold mb-2">
          +{cliente}
        </span>
        <h3 className="text-isla-almond text-4xl md:text-5xl font-bold tracking-tighter group-hover:text-isla-terra transition-colors leading-tight">
          {titulo}
        </h3>
      </div>
    </Link>
  );
};

const GridProyectos = () => {
  // Evitamos mostrar los primeros 3 (que ya están en destacados)
  const proyectosGrilla = proyectos.slice(3);

  const columnaIzquierda = proyectosGrilla.filter((_, index) => index % 2 === 0);
  const columnaDerecha = proyectosGrilla.filter((_, index) => index % 2 !== 0);

  return (
    <section className="relative w-full bg-isla-black py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="hidden lg:block absolute top-20 right-20 z-10 opacity-40 pointer-events-none text-isla-terra"
      >
        <svg viewBox="0 0 100 100" width="200" height="200">
          <defs>
            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text fontSize="4.7" className="fill-current font-bold uppercase tracking-[0.15em]">
            <textPath href="#circle">
              comunicación visual - estudio audiovisual - contenido de redes -
            </textPath>
          </text>
        </svg>
      </motion.div>

      <div className="w-full relative z-20">
        <div className="flex flex-col md:flex-row gap-16 md:gap-12 lg:gap-24 w-full">
          <div className="flex-1 flex flex-col gap-24 md:gap-40">
            {columnaIzquierda.map((proyecto) => (
              <TarjetaProyecto key={proyecto.id} {...proyecto} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-24 md:gap-40 md:mt-64">
            {columnaDerecha.map((proyecto) => (
              <TarjetaProyecto key={proyecto.id} {...proyecto} />
            ))}
          </div>
        </div>
        
        <div className="mt-40 flex justify-center w-full">
          {/* El botón ahora es un Link a la página completa de Trabajo */}
          <Link to="/trabajo" className="flex items-center gap-4 text-isla-almond hover:text-isla-terra transition-colors font-bold text-2xl uppercase tracking-[0.2em] group border-b border-transparent hover:border-isla-terra pb-2">
            Ver Todos Los Proyectos
            <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" size={32} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GridProyectos;