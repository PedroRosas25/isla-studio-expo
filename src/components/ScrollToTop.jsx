import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Esto fuerza al navegador a ir arriba de todo al cambiar de ruta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;