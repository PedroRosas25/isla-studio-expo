import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react'; 
import { AnimatePresence } from 'framer-motion';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import Clientes from './pages/Clientes'
import ProyectoDetalle from './pages/ProyectoDetalle';
import Trabajos from './pages/Trabajos';
import SplashScreen from './components/SplashScreen';
import HomePrincipal from './pages/HomePrincipal';
import Privacidad from './pages/legales/Privacidad';
import Cookies from './pages/legales/Cookies';
import AvisoLegal from './pages/legales/AvisoLegal';

function PageTitleHandler() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = "Isla Studio | Productora Audiovisual";
    } else if (location.pathname.startsWith('/expo')) {
      document.title = "Isla Studio | Expo Minera 2026";
    } else if (location.pathname === '/servicios') {
      document.title = "Isla Studio | Presupuestador Técnico";
    } else if (location.pathname === '/mis-presupuestos') {
      document.title = "Isla Studio | Mis Pedidos";
    }
  }, [location]);

  return null; 
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // ELIMINAMOS EL USE-EFFECT. AHORA EL COMPONENTE SPLASH DECIDE CUÁNDO TERMINAR.

  return (
    <Router>
      <PageTitleHandler />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {showSplash && (
           // Cuando el SplashScreen termina su magia, nos avisa ejecutando finishLoading
          <SplashScreen key="splash" finishLoading={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      
      <div className="flex flex-col min-h-screen bg-isla-black">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePrincipal />} />
            <Route path="/expo" element={<><Navbar /><Hero /><Footer /></>} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
            <Route path="/trabajos" element={<Trabajos />} />
            
            <Route path="/privacidad" element={<><Privacidad /><Footer /></>} />
            <Route path="/cookies" element={<><Cookies /><Footer /></>} />
            <Route path="/aviso-legal" element={<><AvisoLegal /><Footer /></>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;