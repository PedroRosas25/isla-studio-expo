import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Manifiesto from '../components/Manifiesto.jsx';
import ProyectosDestacados from '../components/ProyectosDestacados.jsx';
import GridProyectos from '../components/GridProyectos.jsx';
import Footer from '../components/Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

// 1. CAMBIAMOS EL NOMBRE DE LA FUNCIÓN PARA QUE NO CHOQUE CON APP.JSX
function HomePrincipal() {
  return (
    // 2. APLICAMOS LA PALETA DE MARCA (bg-isla-black en vez de bg-black)
    <div className="font-sans antialiased bg-isla-black">
      
      {/* LA MANTA SÓLIDA */}
      <main className="relative z-40 bg-isla-black mb-[100vh] shadow-[0_20px_50px_rgba(0,0,0,1)]">
        <Navbar />
        <Hero />
        <ProyectosDestacados />
        <Manifiesto />
        <GridProyectos />
      </main>

      {/* EL FOOTER CLAVADO AL FONDO */}
      <div className="fixed bottom-0 left-0 w-full h-screen z-0">
        <Footer />
      </div>

    </div>
  );
}

// 3. EXPORTAMOS CON EL NOMBRE CORRECTO
export default HomePrincipal;