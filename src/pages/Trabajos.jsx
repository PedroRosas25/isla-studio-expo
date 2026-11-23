import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// IMPORTAMOS LA BASE DE DATOS ÚNICA
import { proyectos } from "../data/proyectosData";

// Reutilizamos la lógica de la tarjeta interactiva
const TarjetaArchivo = ({ id, cliente, titulo, imagen, video }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/proyecto/${id}`}
      className="flex flex-col gap-4 cursor-pointer group"
      onMouseEnter={() => { setIsHovered(true); if (videoRef.current) videoRef.current.play(); }}
      onMouseLeave={() => { setIsHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
    >
      <div className="relative w-full aspect-video md:aspect-[4/5] overflow-hidden bg-isla-black/50">
        <img 
          src={imagen} 
          alt={titulo} 
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
      <div className="flex flex-col mt-2">
        <span className="text-isla-green text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-1">
          +{cliente}
        </span>
        <h3 className="text-isla-almond text-2xl md:text-3xl font-bold tracking-tighter group-hover:text-isla-terra transition-colors leading-tight uppercase">
          {titulo}
        </h3>
      </div>
    </Link>
  );
};

const Trabajos = () => {
  return (
    <div className="w-full min-h-screen bg-isla-black text-isla-almond font-sans selection:bg-isla-terra selection:text-white flex flex-col">
      <Navbar />

      <section className="pt-40 md:pt-56 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-isla-terra font-bold tracking-[0.4em] text-xs md:text-sm uppercase block mb-6"
          >
            Archivo de Proyectos
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.95] uppercase"
          >
            Nuestro <br /> <span className="text-isla-terra text-opacity-90">Trabajo.</span>
          </motion.h1>
        </div>
      </section>

      {/* GRILLA MASIVA DINÁMICA */}
      {/* Mapeamos TODOS los proyectos del JS sin importar cuántos sean */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-isla-almond/10 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {proyectos.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }} // Efecto cascada por fila
            >
              <TarjetaArchivo {...proyecto} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trabajos;