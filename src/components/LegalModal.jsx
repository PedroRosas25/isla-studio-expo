import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const LegalModal = ({ isOpen, onClose, title, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[1000] cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            className="fixed inset-4 md:inset-x-1/4 md:inset-y-20 z-[1001] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header: X a la izquierda y Título centrado */}
            <div className="flex items-center px-8 py-6 border-b border-zinc-900 bg-zinc-950 shrink-0 relative">
              <button 
                onClick={onClose} 
                className="p-2 text-zinc-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>
              
              <h2 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-brand-cream pointer-events-none">
                {title}
              </h2>
            </div>

            <div className="flex-grow overflow-y-auto p-8 text-zinc-400 text-sm leading-relaxed overscroll-contain">
              {content}
            </div>
            
            {/* Footer: Botón centrado */}
            <div className="p-6 border-t border-zinc-900 bg-zinc-950 flex justify-center shrink-0">
              <button 
                onClick={onClose} 
                className="px-10 py-3 bg-brand-blue text-brand-cream font-bold rounded-full text-xs hover:scale-105 transition-transform active:scale-95"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;