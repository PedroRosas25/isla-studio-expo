import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Corregido: useLocation en minúscula
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';

// COMPONENTES EXPO
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import ServiciosHome from './sections/ServiciosHome';
import Servicios from './pages/Servicios';
import MisPresupuestos from './pages/MisPresupuestos';
import Admin from "./pages/Admin";

// COMPONENTES PRINCIPALES (VIEJOS)
import HomePrincipal from './pages/HomePrincipal';

// LEGALES
import Privacidad from './pages/legales/Privacidad';
import Cookies from './pages/legales/Cookies';
import AvisoLegal from './pages/legales/AvisoLegal';

// 1. CREAMOS ESTE COMPONENTE PARA MANEJAR EL TÍTULO
function PageTitleHandler() {
  const location = useLocation();

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

  return null; // Este componente no renderiza nada visualmente
}

function App() {
  return (
    <Router>
      {/* 2. LO PONEMOS AQUÍ, ADENTRO DEL ROUTER */}
      <PageTitleHandler />
      <ScrollToTop /> 
      
      <div className="flex flex-col min-h-screen bg-zinc-950">
        <main className="flex-grow">
          <Routes>
            {/* 1. LANDING PRINCIPAL (LA VIEJA) */}
            <Route path="/" element={<HomePrincipal />} />

            {/* 2. LANDING EXPO Y SUS RUTAS */}
            <Route path="/expo" element={
              <>
                <Navbar />
                <Hero />
                <ServiciosHome />
                <Footer />
              </>
            } />

            <Route path="/servicios" element={<><Navbar /><Servicios /><Footer /></>} />
            <Route path="/mis-presupuestos" element={<><Navbar /><MisPresupuestos /><Footer /></>} />
            <Route path="/admin-isla" element={<><Navbar /><Admin /><Footer /></>} />
            
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