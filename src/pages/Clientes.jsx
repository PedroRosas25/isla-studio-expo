import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DomeGallery from "../components/DomeGallery"; 

const marcas = [
  { id: 1, nombre: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { id: 2, nombre: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { id: 3, nombre: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id: 4, nombre: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
  { id: 5, nombre: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { id: 6, nombre: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
  { id: 7, nombre: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { id: 8, nombre: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" }
];

// Adaptamos el array de marcas al formato que espera DomeGallery
const formattedMarcas = marcas.map((marca) => ({
  src: marca.logo,
  alt: marca.nombre
}));

const Clientes = () => {
  return (
    <div className="w-full min-h-screen bg-isla-black text-isla-almond font-sans selection:bg-isla-terra selection:text-white flex flex-col overflow-hidden">
      
      <Navbar />

      <section className="pt-40 md:pt-56 pb-12 px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-isla-terra font-bold tracking-[0.4em] text-xs md:text-sm uppercase block mb-6"
          >
            Nuestros Socios Comerciales
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.95] uppercase"
          >
            Marcas que <br /> <span className="text-isla-terra text-opacity-90">confían</span> en nosotros.
          </motion.h1>
        </div>
      </section>

      {/* DOME GALLERY */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
        <DomeGallery 
          images={formattedMarcas} 
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={10} /* Le doy un toque más de libertad vertical */
          segments={34}
          dragDampening={2}
          grayscale={true} /* Activa nuestro filtro invert/blanco inyectado */
          overlayBlurColor="#2B2522" /* Reemplazar por el hex exacto de tu bg-isla-black */
        />
      </section>

      <section className="py-32 px-6 flex justify-center text-center relative z-10">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            Tu marca es la próxima.
          </h2>
          <Link 
            to="/contacto" 
            className="inline-flex items-center gap-3 bg-isla-terra text-white px-10 py-5 rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:bg-isla-almond hover:text-isla-black transition-colors group"
          >
            Empezar Proyecto
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clientes;