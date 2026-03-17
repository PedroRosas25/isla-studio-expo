import { motion } from "framer-motion";
import { Instagram, Mail, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { memo, useState, useEffect } from "react";
import LegalModal from "./LegalModal";
import { Link } from 'react-router-dom';

function ContactoOld() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "" });

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "unset";
  }, [modalOpen]);

  const openLegal = (title, content) => {
    setModalData({ title, content });
    setModalOpen(true);
  };

  const textos = {
    privacidad: `En Isla Studio, la privacidad de nuestros clientes es prioridad...`, // (Mantener tus textos originales aquí)
    aviso: `Este sitio web es propiedad de Isla Studio...`,
    cookies: `En Isla Studio utilizamos cookies técnicas...`
  };

  return (
    <section id="contacto" className="py-32 bg-zinc-950 border-t border-zinc-900 text-brand-cream px-6 relative overflow-hidden">
      
      {/* Grilla técnica de fondo */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-brand-blue font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">Next Step</span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 text-white">
            Impulsá tu <span className="italic text-brand-blue">Presencia</span>
          </h2>
          <p className="text-xl text-zinc-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            ¿Listo para llevar tu marca al siguiente nivel? Escribinos para coordinar una reunión y armar una propuesta técnica a tu medida.
          </p>

          {/* Botones de Contacto Directo */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-20">
            <a href="https://wa.me/5492645063823" target="_blank" rel="noopener noreferrer" 
               className="group flex items-center justify-between gap-6 bg-zinc-900 border border-zinc-800 p-6 rounded-sm hover:border-brand-blue/50 transition-all duration-500 md:w-72">
               <div className="flex items-center gap-4">
                 <FaWhatsapp size={20} className="text-[#25D366]" />
                 <div className="text-left">
                   <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">WhatsApp</p>
                   <p className="font-serif text-lg text-white">Juan Bataller</p>
                 </div>
               </div>
               <ArrowRight size={16} className="text-zinc-700 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
            </a>

            <a href="https://wa.me/5492644437135" target="_blank" rel="noopener noreferrer" 
               className="group flex items-center justify-between gap-6 bg-zinc-900 border border-zinc-800 p-6 rounded-sm hover:border-brand-blue/50 transition-all duration-500 md:w-72">
               <div className="flex items-center gap-4">
                 <FaWhatsapp size={20} className="text-[#25D366]" />
                 <div className="text-left">
                   <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">WhatsApp</p>
                   <p className="font-serif text-lg text-white">Santiago Castro</p>
                 </div>
               </div>
               <ArrowRight size={16} className="text-zinc-700 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Redes Sociales Secundarias */}
          <div className="flex justify-center gap-8 mb-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <a href="https://www.instagram.com/studios_isla/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
            <a href="https://www.tiktok.com/@isla.studios" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
              <FaTiktok size={20} />
            </a>
            <button 
              onClick={(e) => {
                e.preventDefault();
                const email = "islastudio39@gmail.com";
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile) {
                  window.location.href = `mailto:${email}`;
                } else {
                  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
                }
              }}
              className="hover:text-brand-blue transition-colors"
            >
              <Mail size={22} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        {/* --- MAPA DE UBICACIÓN AJUSTADO --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto aspect-[21/9] md:aspect-[3/1] rounded-sm overflow-hidden mb-24 border border-zinc-900 shadow-2xl relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.4428521428867!2d-68.5289732!3d-31.539458899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96814026229500e9%3A0xfec2e1813c73216!2sEl%20Nuevo%20Diario!5e0!3m2!1ses-419!2sar!4v1773169931112!5m2!1ses-419!2sar"
            width="100%" 
            height="100%" 
            style={{ 
              border: 0, 
              filter: 'contrast(1.1) brightness(0.9) saturate(1.2)' // Color vivo pero integrado al fondo oscuro
            }} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        {/* FOOTER FINAL */}
        <footer className="pt-16 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-serif font-bold text-white tracking-tighter uppercase">ISLA <span className="italic text-brand-blue">STUDIO</span></span>
              </div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em]">Creative Intelligence Agency — 2026</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex flex-wrap justify-center gap-10 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">
              <Link 
                to="/privacidad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-blue transition-colors duration-300 relative group"
              >
                Privacidad
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full"></span>
              </Link>

              <Link 
                to="/aviso-legal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-blue transition-colors duration-300 relative group"
              >
                Aviso Legal
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full"></span>
              </Link>

              <Link 
                to="/cookies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-blue transition-colors duration-300 relative group"
              >
                Cookies
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all group-hover:w-full"></span>
              </Link>
            </div>
              <p className="text-[9px] text-zinc-700 tracking-[0.1em]">© ISLA STUDIO. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </div>

      <LegalModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={modalData.title}
        content={<div className="whitespace-pre-line font-sans text-sm leading-relaxed text-zinc-400">{modalData.content}</div>}
      />
    </section>
  );
}

export default memo(ContactoOld);