import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

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

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <div className="flex flex-col min-h-screen bg-zinc-950">
        
        <main className="flex-grow">
          <Routes>
            {/* 1. LANDING PRINCIPAL (LA VIEJA) */}
            {/* Aquí no ponemos el Navbar nuevo porque HomePrincipal ya trae su propio NavbarOld */}
            <Route path="/" element={<HomePrincipal />} />

            {/* 2. LANDING EXPO Y SUS RUTAS */}
            {/* Envolvemos estas rutas para que SI tengan el Navbar y Footer de la Expo */}
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
            
            {/* Rutas Legales (Podés decidir qué Navbar usar, acá puse el de la Expo) */}
            <Route path="/privacidad" element={<><Navbar /><Privacidad /><Footer /></>} />
            <Route path="/cookies" element={<><Navbar /><Cookies /><Footer /></>} />
            <Route path="/aviso-legal" element={<><Navbar /><AvisoLegal /><Footer /></>} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;