import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import ServiciosHome from './sections/ServiciosHome';
import Servicios from './pages/Servicios';
import MisPresupuestos from './pages/MisPresupuestos';
import Admin from "./pages/Admin";

// Importamos las legales
import Privacidad from './pages/legales/Privacidad';
import Cookies from './pages/legales/Cookies';
import AvisoLegal from './pages/legales/AvisoLegal';

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <div className="flex flex-col min-h-screen bg-zinc-950">
        <Navbar /> 
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ServiciosHome />
              </>
            } />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/mis-presupuestos" element={<MisPresupuestos />} />
            <Route path="/admin-isla" element={<Admin />} />
            
            {/* Rutas Legales */}
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;