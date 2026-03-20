import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  // Guardamos la ruta en la que estamos cuando carga la página
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Si la ruta nueva es distinta a la ruta anterior, significa que 
    // navegamos a otra página. Ahí sí subimos el scroll.
    if (prevPathname.current !== pathname) {
      window.scrollTo(0, 0);
      // Actualizamos la ruta anterior para la próxima vez
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;