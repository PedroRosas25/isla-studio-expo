import { motion } from "framer-motion";

const Manifiesto = () => {
  // Configuramos la "cascada" de animación para los párrafos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    // CAMBIO VITAL: Volvemos a bg-isla-black. Ahora sí renderizará el #2B2522 oficial.
    <section className="w-full bg-isla-black text-isla-almond py-32 md:py-56 px-6 md:px-12 lg:px-20 flex justify-center font-sans">
      
      <motion.div 
        className="max-w-[85rem] w-full flex flex-col gap-10 md:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        <motion.p 
          variants={itemVariants} 
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight"
        >
          Nacimos como un estudio creativo que no creía en la publicidad tradicional.
        </motion.p>
        
        <motion.p 
          variants={itemVariants} 
          // text-isla-almond/70 funciona perfecto gracias a las nuevas variables CSS
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-isla-almond/70"
        >
          Una productora sin más principio rector que generar comunicación visual de alto impacto para marcas que inspiran.
        </motion.p>
        
        <motion.p 
          variants={itemVariants} 
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-isla-almond/40"
        >
          Buscamos ser el espacio donde las mentes creativas vengan a hacer el mejor trabajo de sus vidas, usando la estrategia digital para realmente <span className="text-isla-terra font-bold">decir algo</span>.
        </motion.p>

      </motion.div>
    </section>
  );
};

export default Manifiesto;