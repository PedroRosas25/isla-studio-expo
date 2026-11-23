import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // El setTimeout garantiza que el DOM ya exista antes de intentar subir
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" // "instant" evita que el usuario vea un salto brusco
      });
    }, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;