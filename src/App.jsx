import { useState } from 'react';
import { useToggle } from './hooks/useToggle.js';
import { VISTAS } from './data/vistas.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CarritoModal } from './components/CarritoModal.jsx';
import { Tienda } from './views/Tienda.jsx';
import { Checkout } from './views/Checkout.jsx';
import { Confirmacion } from './views/Confirmacion.jsx';
import { useToast } from './context/ToastContext.jsx'; // 👈 Consumo global

// este componente es SOLO layout + qué vista se
// muestra. Nada de localStorage, JSON.parse/stringify, filtros del
// catálogo ni lógica del carrito acá — todo eso vive en useCarrito.js /
// CarritoContext.jsx / las vistas. El useToggle de acá abajo es estado
// de LAYOUT (¿el modal del carrito está abierto?), no lógica de carrito.

function App() {
  const [vista, setVista] = useState(VISTAS.TIENDA);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [carritoAbierto, , abrirCarrito, cerrarCarrito] = useToggle(false);
  const { toast } = useToast(); // Escuchamos el canal de notificaciones

  const irACheckout = () => {
    cerrarCarrito();
    setVista(VISTAS.CHECKOUT);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* RENDERIZADO DEL TOAST: Visible en cualquier sección de la App */}
    {toast && (
        <div className="fixed top-4 right-4 bg-error text-on-primary px-4 py-2 rounded shadow-lg z-50 flex items-center gap-2">
          <span className="flex items-center justify-center text-base leading-none">⚠️</span>
          <p className="text-sm font-medium m-0 leading-none">{toast.mensaje}</p>
        </div>
     )}

      <Navbar onAbrirCarrito={abrirCarrito} />

      {vista === VISTAS.TIENDA && <Tienda />}

      {vista === VISTAS.CHECKOUT && (
        <Checkout
          onVolver={() => setVista(VISTAS.TIENDA)}
          onConfirmar={(pedido) => {
            setPedidoConfirmado(pedido);
            setVista(VISTAS.CONFIRMACION);
          }}
        />
      )}

      {vista === VISTAS.CONFIRMACION && 
      <Confirmacion pedido={pedidoConfirmado} onVolver={() => setVista(VISTAS.TIENDA)} />}

      <CarritoModal
        isOpen={carritoAbierto}
        onClose={cerrarCarrito}
        onIrACheckout={irACheckout}
      />

      <Footer authorName="Juan Pablo Millicay" />
    </div>
  );
}

export default App;
