import { useState, useEffect } from "react";

const frases = [
  "Comunicación visual de alto impacto",
  "Diseñamos para marcas que inspiran",
  "No creemos en la publicidad tradicional"
];

const FranjaTypewriter = () => {
  const [textoActual, setTextoActual] = useState("");
  const [isBorrando, setIsBorrando] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [velocidad, setVelocidad] = useState(100);
  
  // NUEVO: Estado para controlar el encendido/apagado del cursor
  const [cursorVisible, setCursorVisible] = useState(true);

  // EFECTO DE PARPADEO REPENTINO (Corte seco, sin gradiente)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Cambia de estado cada medio segundo (500ms)
    
    return () => clearInterval(blinkInterval);
  }, []);

  // Lógica de tipeo
  useEffect(() => {
    const manejarEscritura = () => {
      const i = loopNum % frases.length;
      const fraseCompleta = frases[i];

      setTextoActual(
        isBorrando
          ? fraseCompleta.substring(0, textoActual.length - 1)
          : fraseCompleta.substring(0, textoActual.length + 1)
      );

      setVelocidad(isBorrando ? 40 : 100);

      if (!isBorrando && textoActual === fraseCompleta) {
        setTimeout(() => setIsBorrando(true), 2500);
      } else if (isBorrando && textoActual === "") {
        setIsBorrando(false);
        setLoopNum(loopNum + 1);
        setVelocidad(500); 
      }
    };

    const timer = setTimeout(manejarEscritura, velocidad);
    return () => clearTimeout(timer);
  }, [textoActual, isBorrando, loopNum, velocidad]);

  return (
    // La franja sigue siendo negra para que se mimetice con la página al levantar el telón
    <div className="w-full bg-black py-6 border-b border-[#F4EAE5]/10 flex justify-center items-center font-sans overflow-hidden">
      <p className="text-[#F4EAE5] text-xs md:text-sm lg:text-base uppercase tracking-[0.25em] font-bold flex items-center min-h-[24px]">
        {textoActual}
        
        {/* EL CURSOR ULTRA FINO Y ROBÓTICO */}
        {/* w-[1px] lo hace extremadamente flaco. La opacidad se controla con el estado, cortando de 1 a 0 */}
        <span 
          className="inline-block w-[1px] h-[1.2em] bg-[#C87962] ml-[2px]"
          style={{ opacity: cursorVisible ? 1 : 0 }}
        ></span>
      </p>
    </div>
  );
};

export default FranjaTypewriter;