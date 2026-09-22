import { useState } from 'react';
import { useToggle } from './hooks/useToggle.js';
import { VISTAS } from './data/vistas.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CarritoModal } from './components/CarritoModal.jsx';
import { Tienda } from './views/Tienda.jsx';
import { Checkout } from './views/Checkout.jsx';

// este componente es SOLO layout + qué vista se
// muestra. Nada de localStorage, JSON.parse/stringify, filtros del
// catálogo ni lógica del carrito acá — todo eso vive en useCarrito.js /
// CarritoContext.jsx / las vistas. El useToggle de acá abajo es estado
// de LAYOUT (¿el modal del carrito está abierto?), no lógica de carrito.

function App() {
  const [vista, setVista] = useState(VISTAS.TIENDA);
  const [, setPedidoConfirmado] = useState(null);
  const [carritoAbierto, , abrirCarrito, cerrarCarrito] = useToggle(false);

  const irACheckout = () => {
    cerrarCarrito();
    setVista(VISTAS.CHECKOUT);
  };

  return (
    <div className="min-h-screen flex flex-col">
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
