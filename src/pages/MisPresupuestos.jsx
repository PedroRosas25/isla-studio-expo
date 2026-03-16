import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

const MisPresupuestos = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Cambiamos a onSnapshot para sincronización en tiempo real e instantánea
    const q = query(
        collection(db, "presupuestos"),
        where("userId", "==", user.uid)
    );

    const unsubscribeSnap = onSnapshot(q, (snapshot) => {
        // 2. Mapeamos los datos
        const docs = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
        
        // 3. Ordenamos nosotros manualmente en el código
        // Esto es "seda pura" y no falla nunca
        const docsOrdenados = docs.sort((a, b) => {
            const fechaA = a.fecha?.seconds || 0;
            const fechaB = b.fecha?.seconds || 0;
            return fechaB - fechaA;
        });

        setPresupuestos(docsOrdenados);
        setLoading(false);
    }, (error) => {
        console.error("Error en Firestore:", error);
        setLoading(false);
    });

    return () => unsubscribeSnap();
}, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center">
        <span className="text-brand-blue font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
          Sincronizando Terminal...
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-6 text-center">
        <h2 className="text-brand-cream font-serif text-3xl mb-4">Acceso Denegado</h2>
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest max-w-xs leading-loose">
          Debe autenticar su identidad para acceder al registro de solicitudes técnicas.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-40 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <span className="text-brand-blue font-bold tracking-[0.5em] text-[10px] uppercase block mb-4">Registro Histórico</span>
        <h1 className="text-5xl md:text-7xl font-serif text-brand-cream leading-none tracking-tighter uppercase mb-12">
          Mis <span className="italic text-brand-blue">Servicios</span>
        </h1>

        {presupuestos.length === 0 ? (
          <div className="border border-zinc-900 p-12 bg-zinc-950/50">
            <p className="text-zinc-600 font-bold uppercase text-[9px] tracking-[0.4em]">Sin registros activos en esta cuenta.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {presupuestos.map((p) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-zinc-900 bg-zinc-950/80 p-8 flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-brand-blue/30 transition-all duration-500"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] text-brand-blue font-bold tracking-[0.4em] uppercase bg-brand-blue/10 px-2 py-1">
                      ID: {p.id.slice(0,8)}
                    </span>
                    <span className="text-zinc-600 text-[10px] font-mono italic">
                      {p.fecha ? new Date(p.fecha.seconds * 1000).toLocaleDateString('es-AR') : 'Sincronizando fecha...'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif text-brand-cream">
                      {Array.isArray(p.servicios) ? p.servicios.join(' + ') : 'Servicio Técnico'}
                    </h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold italic">
                      Mayo {Array.isArray(p.fechas) ? p.fechas.join(', ') : p.fechas} — Expo Minera
                    </p>
                  </div>
                  
                  {p.nivelEdicion && p.nivelEdicion !== "N/A" && (
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                      <span className="text-zinc-500 text-[9px] uppercase tracking-widest font-bold">Nivel: {p.nivelEdicion}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 md:mt-0 flex flex-col items-end gap-3">
                  <div className="px-6 py-2 border border-zinc-800 bg-zinc-900/50">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                      {p.estado || "En Revisión"}
                    </span>
                  </div>
                  <p className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold">
                    Terminal: {p.celular}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisPresupuestos;