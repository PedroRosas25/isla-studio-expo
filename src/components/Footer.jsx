import { ArrowUpRight } from "lucide-react";
import FranjaTypewriter from './FranjaTypeWriter'; 
import logoIsotipo from '../assets/logoladrillo.svg';

// 1. Importamos el componente Link de React Router
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative w-full min-h-screen bg-isla-green text-isla-almond flex flex-col font-sans overflow-hidden">
      
      {/* LA FRANJA TYPEWRITER DE TECHO */}
      <div className="relative z-20 w-full shrink-0">
        <FranjaTypewriter />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 flex flex-col flex-1 p-6 md:p-12 lg:p-20">
        
        {/* SECCIÓN SUPERIOR: Layout Asimétrico */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mt-4 md:mt-8">
          
          <div className="max-w-xl flex flex-col items-start gap-8">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1]">
              Hagamos que tu marca <span className="text-isla-terra">hable por sí sola.</span>
            </h3>
            
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=islastudio39@gmail.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-isla-almond/30 px-8 py-4 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-isla-terra hover:text-white hover:border-isla-terra transition-all group backdrop-blur-sm"
            >
              islastudio39@gmail.com
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="flex gap-16 md:gap-24">
            
            <div className="flex flex-col gap-6 text-sm md:text-base font-bold uppercase tracking-widest">
              <span className="text-isla-terra text-xs tracking-[0.2em] mb-2">Explorar</span>
              
              {/* 2. Reemplazamos la etiqueta <a> por <Link> para Servicios */}
              <Link to="/trabajos" className="hover:text-isla-terra transition-colors flex items-center gap-1 group w-fit">
                Trabajos <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link to="/servicios" className="hover:text-isla-terra transition-colors flex items-center gap-1 group w-fit">
                Servicios <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link to="/clientes" className="hover:text-isla-terra transition-colors flex items-center gap-1 group w-fit">
                Clientes <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              {/* 3. Agregamos la barra "/" para que siempre vuelva al Home a buscar la sección */}
              <Link to="/contacto" className="hover:text-isla-terra transition-colors flex items-center gap-1 group w-fit">
                Contáctanos <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-col gap-6 text-sm md:text-base font-bold uppercase tracking-widest">
              <span className="text-isla-terra text-xs tracking-[0.2em] mb-2">Social</span>
              <a href="https://wa.me/5492644437135" target="_blank" rel="noreferrer" className="hover:text-isla-terra transition-colors flex items-center gap-1 group w-fit">
                WhatsApp <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://www.instagram.com/studios_isla/" target="_blank" rel="noreferrer" className="hover:text-isla-terra transition-colors flex items-center gap-1 group w-fit">
                Instagram <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://www.tiktok.com/@isla.studios" target="_blank" rel="noreferrer" className="hover:text-isla-terra transition-colors flex items-center gap-1 group w-fit">
                TikTok <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>

        {/* SECCIÓN MEDIA (EL LOGO) */}
        <div className="flex-1 flex justify-center items-center py-12 md:py-8 pointer-events-none opacity-40">
          <img 
            src={logoIsotipo} 
            alt="Isla Studio Marca de Agua" 
            className="w-full max-w-[15rem] md:max-w-[20rem] lg:max-w-[25rem] object-contain drop-shadow-2xl" 
          />
        </div>

        {/* SECCIÓN INFERIOR: Copyright, Ubicación y Legales */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-isla-almond/20 pt-8 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold gap-6 lg:gap-0 shrink-0">
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center text-center">
            <span>© {new Date().getFullYear()} ISLA STUDIO</span>
            <span className="hidden md:block text-isla-almond/30">|</span>
            <span className="text-isla-terra">San Juan, Argentina</span>
          </div>
          
          <div className="flex gap-8">
            {/* Las páginas legales las dejamos con <a> porque usan target="_blank" para abrirse en pestaña nueva */}
            <a href="/aviso-legal" target="_blank" rel="noreferrer" className="hover:text-isla-terra transition-colors uppercase">Aviso Legal</a>
            <a href="/privacidad" target="_blank" rel="noreferrer" className="hover:text-isla-terra transition-colors uppercase">Privacidad</a>
            <a href="/cookies" target="_blank" rel="noreferrer" className="hover:text-isla-terra transition-colors uppercase">Cookies</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;