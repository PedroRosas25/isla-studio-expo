import { Link } from "react-router-dom";
import { Instagram, Linkedin, MessageCircle, Globe } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa"; // Necesitás: npm install react-icons

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: MARCA */}
          <div className="col-span-1">
            <h3 className="text-xl font-serif font-bold text-brand-cream mb-4 tracking-tighter uppercase">
              ISLA <span className="text-brand-blue italic text-2xl">STUDIO</span>
            </h3>
            <p className="text-zinc-600 text-[9px] uppercase tracking-[0.4em] leading-relaxed mb-6">
              San Juan, Argentina <br />
              Exploración Visual Industrial
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/studios_isla/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-brand-cream transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@isla.studios" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-brand-cream transition-colors">
                <FaTiktok size={18} />
              </a>
              <a href="https://wa.me/5492645063823" target="_blank" rel="noreferrer" className="text-[#25D366] hover:scale-110 transition-transform">
                <FaWhatsapp size={22} />
              </a>
            </div>
          </div>

        {/* COLUMNA 2: LEGAL */}
        <div>
        <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.3em] block mb-6">Legal</span>
        <ul className="flex flex-col gap-3 text-[10px] uppercase tracking-widest font-bold">
            <li>
            <a href="/aviso-legal" target="_blank" rel="noreferrer" className="hover:text-brand-cream transition-colors text-zinc-500">
                Aviso Legal
            </a>
            </li>
            <li>
            <a href="/privacidad" target="_blank" rel="noreferrer" className="hover:text-brand-cream transition-colors text-zinc-500">
                Privacidad
            </a>
            </li>
            <li>
            <a href="/cookies" target="_blank" rel="noreferrer" className="hover:text-brand-cream transition-colors text-zinc-500">
                Cookies
            </a>
            </li>
        </ul>
        </div>

          {/* COLUMNA 3 & 4: MAPA */}
          <div className="md:col-span-2">
            <span className="text-brand-blue font-bold text-[10px] uppercase tracking-[0.3em] block mb-6">Ubicación Central</span>
            <div className="w-full h-48 bg-zinc-900 rounded-sm overflow-hidden  hover:opacity-100 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.4428521428867!2d-68.5289732!3d-31.539458899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96814026229500e9%3A0xfec2e1813c73216!2sEl%20Nuevo%20Diario!5e0!3m2!1ses-419!2sar!4v1773169931112!5m2!1ses-419!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[8px] text-zinc-700 uppercase tracking-[0.5em]">© 2026 ISLA STUDIO. Made in San Juan.</p>
          <div className="flex items-center gap-2 text-zinc-800">
            <Globe size={10} />
            <span className="text-[8px] uppercase tracking-[0.5em]">Global Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;