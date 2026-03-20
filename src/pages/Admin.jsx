import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle2, Clock, Building2, Search, Filter, Video, Trash2 } from "lucide-react";
import { collection, query, onSnapshot, updateDoc, doc, orderBy, deleteDoc, writeBatch, getDocs, where } from "firebase/firestore";

// AHORA SE LLAMA ADMIN_EMAILS (EN PLURAL)
const ADMIN_EMAILS = [
  "islastudio39@gmail.com", 
  "pedrorosasaguilar9@gmail.com"
];

const Admin = () => {
  const [user, setUser] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // 1. Verificación de Seguridad
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Cargar Pedidos ordenados por Empresa
  useEffect(() => {
    // CAMBIO: Verificamos si el email está INCLUIDO en el array
    if (user && ADMIN_EMAILS.includes(user.email)) {
      const q = query(collection(db, "presupuestos"), orderBy("empresa", "asc"));
      const unsub = onSnapshot(q, (snapshot) => {
        setPedidos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsub();
    }
  }, [user]);

  // 3. Función para cambiar estado a Finalizado
  const finalizarPedido = async (id) => {
    try {
      const pedidoRef = doc(db, "presupuestos", id);
      await updateDoc(pedidoRef, { estado: "Finalizado" });
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  // 4. Borrar un pedido individual
  const borrarPedido = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este registro?")) {
      try {
        await deleteDoc(doc(db, "presupuestos", id));
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  // 5. Borrar todos los finalizados de una
  const limpiarFinalizados = async () => {
    if (window.confirm("Se eliminarán todos los pedidos marcados como 'Finalizado'. ¿Continuar?")) {
      try {
        const q = query(collection(db, "presupuestos"), where("estado", "==", "Finalizado"));
        const snapshot = await getDocs(q);
        const batch = writeBatch(db);
        
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
      } catch (error) {
        console.error("Error al limpiar finalizados:", error);
      }
    }
  };

  // Pantalla de Carga
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-brand-blue animate-pulse uppercase tracking-[0.3em] text-[10px] font-bold">
          Verificando Credenciales...
        </div>
      </div>
    );
  }

  console.log("Usuario actual:", user?.email);
  
  // CAMBIO: Verificamos el acceso si NO hay usuario o si NO está en la lista de ADMIN_EMAILS
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
         <h1 className="text-4xl text-brand-cream font-serif tracking-tighter uppercase mb-4">
           Acceso Denegado
         </h1>
         <p className="text-zinc-500 text-sm tracking-widest uppercase">
           Esta área es solo para administradores.
         </p>
      </div>
    );
  }

  const pedidosFiltrados = filtroEstado === "Todos" 
    ? pedidos 
    : pedidos.filter(p => p.estado === filtroEstado);

  return (
    <div className="min-h-screen bg-zinc-950 text-brand-cream p-6 md:p-12">
        {/* HEADER CON TÍTULO Y FILTROS */}
        <header className="max-w-7xl mx-auto mb-16 pt-15 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="mt-1">
            <h2 className="text-6xl md:text-8xl font-serif uppercase tracking-tighter text-brand-blue leading-none">
              Master <span className="text-brand-cream not-italic font-serif">Panel</span>
            </h2>
            <div className="h-[1px] w-full bg-brand-blue/30 mt-6 mb-6"></div>
            <p className="text-brand-cream text-[10px] uppercase tracking-[0.4em] font-bold">
              Gestión de Presupuestos — Expo Minera 2026
            </p>
          </div>

          {/* CONTENEDOR DE BOTONES (FILTROS + LIMPIEZA) */}
          <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
            <div className="flex gap-2 bg-zinc-900/50 p-1 border border-zinc-800 self-end md:self-auto">
              {["Todos", "Procesando", "Finalizado"].map(est => (
                <button
                  key={est}
                  onClick={() => setFiltroEstado(est)}
                  className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-all ${
                    filtroEstado === est ? 'bg-brand-blue text-white' : 'text-zinc-500 hover:text-brand-cream'
                  }`}
                >
                  {est}
                </button>
              ))}
            </div>

            {/* BOTÓN DE LIMPIEZA MASIVA */}
            <button 
              onClick={limpiarFinalizados}
              className="px-4 py-2 border border-red-900/30 text-red-500 hover:bg-red-600 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-all h-fit"
            >
              Limpiar Finalizados
            </button>
          </div>
        </header>
        
      <main className="max-w-7xl mx-auto grid gap-4">
        <AnimatePresence>
          {pedidosFiltrados.map((pedido) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={pedido.id}
              className={`group border ${pedido.estado === 'Finalizado' ? 'border-zinc-900 bg-zinc-900/20' : 'border-zinc-800 bg-mining-dark/40'} p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-brand-blue/30 transition-all`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="text-center md:text-left min-w-[200px]">
                  <span className="text-brand-blue text-[10px] font-bold uppercase tracking-widest block mb-1">Empresa</span>
                  <h3 className="text-xl font-serif uppercase text-brand-cream">{pedido.empresa}</h3>
                </div>

                <div className="h-px md:h-8 w-12 md:w-px bg-zinc-800"></div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
                  <div>
                    <span className="text-brand-cream text-[9px] uppercase font-bold block mb-1">Contacto</span>
                    <p className="text-xs font-medium">{pedido.userName}</p>
                    <a href={`https://wa.me/${pedido.celular}`} target="_blank" rel="noreferrer" className="text-brand-blue text-[10px] flex items-center gap-1 mt-1 hover:underline">
                      <Phone size={10} /> {pedido.celular}
                    </a>
                  </div>

                  <div>
                    <span className="text-brand-cream text-[9px] uppercase font-bold block mb-1">Servicios</span>
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-brand-cream italic leading-tight">
                        {pedido.servicios?.join(", ")}
                        </p>
                        
                        {/* NUEVO: Mostrar nivel de edición si existe */}
                        {pedido.nivelEdicion && (
                        <div className="mt-2 inline-flex items-center gap-1.5 bg-brand-blue/5 border border-brand-blue/20 px-2 py-0.5 rounded-sm w-fit">
                            <Video size={10} className="text-brand-blue" />
                            <span className="text-[9px] uppercase font-bold text-brand-blue tracking-tighter">
                            Edición: {pedido.nivelEdicion}
                            </span>
                        </div>
                        )}
                    </div>
                    </div>

                  <div className="hidden md:block">
                    <span className="text-brand-cream text-[9px] uppercase font-bold block mb-1">Estado</span>
                    <span className={`text-[10px] px-2 py-1 rounded-sm font-bold ${pedido.estado === 'Finalizado' ? 'bg-green-500/10 text-green-500' : 'bg-brand-blue/10 text-brand-blue'}`}>
                      {pedido.estado}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                {pedido.estado !== "Finalizado" && (
                    <button
                    onClick={() => finalizarPedido(pedido.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 hover:bg-green-600 text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                    <CheckCircle2 size={14} /> Finalizar
                    </button>
                )}
                
                {/* Botón de Borrar Individual */}
                <button
                    onClick={() => borrarPedido(pedido.id)}
                    className="flex items-center justify-center p-3 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500/50 transition-all"
                    title="Eliminar pedido"
                >
                    <Trash2 size={14} />
                </button>
                </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {pedidosFiltrados.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-900">
            <p className="text-zinc-600 uppercase text-[10px] tracking-[0.3em]">No hay registros con este filtro</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;