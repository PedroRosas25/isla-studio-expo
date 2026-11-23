import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoLadrillo from '../assets/logoladrillo.svg';

const SplashScreen = ({ finishLoading }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Bloqueamos el scroll durante la entrada
    document.body.style.overflow = 'hidden';

    // 1.6 segundos de presencia elegante y limpia antes de disolverse
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1600);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      // Contenedor principal que se funde suavemente a transparente
      className="fixed inset-0 z-[9999] bg-isla-black flex flex-col items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isExiting) {
          document.body.style.overflow = 'unset';
          finishLoading();
        }
      }}
    >
      <motion.div
        className="w-[45vw] md:w-[28vw] max-w-[350px] flex flex-col items-center"
        // Coreografía de entrada y salida con desenfoque de cámara sutil
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ 
          opacity: isExiting ? 0 : 1, 
          y: isExiting ? -15 : 0, 
          filter: isExiting ? 'blur(8px)' : 'blur(0px)' 
        }}
        transition={{ 
          duration: isExiting ? 0.5 : 1.2, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        <img
          src={logoLadrillo}
          alt="Isla Studio"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;