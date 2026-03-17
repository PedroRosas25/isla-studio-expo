import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WppFloat = () => {
  const phone = "5492645063823"; // El número de Juan Carlos
  const message = "Hola! Vi la web de Isla Studio y me gustaría realizar una consulta.";
  
  // Codificamos el mensaje para que los espacios y símbolos funcionen en la URL
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.3)] flex items-center justify-center group"
    >
      {/* Tooltip opcional que aparece al pasar el mouse */}
      <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-800">
        ¡Hablemos por WhatsApp!
      </span>

      {/* Icono con animación de pulso sutil */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaWhatsapp size={28} />
      </motion.div>
    </motion.a>
  );
};

export default WppFloat;