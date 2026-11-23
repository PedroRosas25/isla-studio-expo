import { useRef, useState } from "react";
// 1. Importamos Link
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
// 2. Importamos los datos
import { proyectos } from "../data/proyectosData";

const TarjetaDestacada = ({ id, cliente, titulo, imagen, video, isLarge }) => {
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
    // 3. Cambiamos el <div> principal por un <Link> apuntando al id
    <Link 
      to={`/proyecto/${id}`}
      className={`group cursor-pointer flex flex-col ${isLarge ? "w-full mb-12 md:mb-24" : "gap-4"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative w-full overflow-hidden bg-isla-black/50 ${isLarge ? "h-[60vh] md:h-[85vh]" : "aspect-video"}`}>
        <img 
          src={imagen} 
          alt={titulo} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <video 
          ref={videoRef}
          src={video}
          muted loop playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {isLarge && (
          <div className="absolute inset-0 bg-gradient-to-t from-isla-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
        )}

        <div className="absolute inset-0 bg-isla-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
          <div className="bg-isla-terra text-isla-almond rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <ArrowUpRight size={36} strokeWidth={2} />
          </div>
        </div>

        {isLarge && (
          <div className="absolute bottom-8 left-6 md:bottom-16 md:left-12 z-20 flex flex-col">
            <span className="text-isla-almond/90 text-sm md:text-base uppercase tracking-[0.2em] font-bold mb-3">
              +{cliente}
            </span>
            <h3 className="text-isla-almond text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.9] group-hover:text-isla-terra transition-colors duration-500">
              {titulo}
            </h3>
          </div>
        )}
      </div>

      {!isLarge && (
        <div className="flex flex-col mt-2">
          <span className="text-isla-green text-sm md:text-base uppercase tracking-[0.2em] font-bold mb-1">
            +{cliente}
          </span>
          <h3 className="text-isla-black text-3xl md:text-4xl font-bold tracking-tight leading-tight group-hover:text-isla-terra transition-colors">
            {titulo}
          </h3>
        </div>
      )}
    </Link>
  );
};

const ProyectosDestacados = () => {
  // Tomamos los primeros 3 proyectos de la base de datos
  const proyectoPrincipal = proyectos[0];
  const proyectoSecundario1 = proyectos[1];
  const proyectoSecundario2 = proyectos[2];

  return (
    <section className="w-full bg-isla-almond py-20 px-6 md:px-12 lg:px-20" id="trabajo">
      
      {proyectoPrincipal && (
        <TarjetaDestacada 
          isLarge={true}
          {...proyectoPrincipal}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 w-full">
        {proyectoSecundario1 && (
          <TarjetaDestacada isLarge={false} {...proyectoSecundario1} />
        )}
        {proyectoSecundario2 && (
          <TarjetaDestacada isLarge={false} {...proyectoSecundario2} />
        )}
      </div>
    </section>
  );
};

export default ProyectosDestacados;