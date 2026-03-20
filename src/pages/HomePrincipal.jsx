import React from 'react';
// IMPORTACIÓN DE ESTILOS VIEJOS
import '../styles/OldLanding.css'; 

// IMPORTACIÓN DE COMPONENTES RENOMBRADOS
import NavbarOld from '../components/NavbarOld';
import HeroOld from '../components/HeroOld';
import Valores from '../components/Valores';
import ServiciosDetallados from '../components/ServiciosDetallados';
import PlanesOld from '../components/PlanesOld';
import EquipoOld from '../components/EquipoOld';
import ContactoOld from '../components/ContactoOld';
import WppFloat from '../components/WppFloat';

const HomePrincipal = () => {

  return (
    /* Usamos una clase wrapper para aislar los estilos viejos */
    <div className="old-landing-wrapper">
      <NavbarOld />
      
      <main>
        <HeroOld />
        
        {/* Secciones intermedias */}
        <Valores />
        <ServiciosDetallados />
        <PlanesOld />
        <EquipoOld />
        <ContactoOld />
      </main>

      {/* Botón flotante de WhatsApp */}
      <WppFloat />

      {/* Si tenías un Footer en la landing vieja que no estaba como componente, 
          podés pegarlo acá abajo o crear FooterOld.jsx */}
    </div>
  );
};

export default HomePrincipal;