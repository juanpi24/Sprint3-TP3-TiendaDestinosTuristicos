import { useCarritoContext } from '../context/CarritoContext.jsx';
import { formatearPrecio } from '../utils/formato.js';
import { useToast } from '../context/ToastContext.jsx'; // 👈 Conectamos el emisor

/**
 * Adaptado de ItemCard.jsx del TP2. En vez de un botón "Agregar/Quitar"
 * de watchlist, ahora es un botón "Agregar al carrito" que respeta el
 * stock disponible.
 */
export function ProductoCard({ producto }) {
  const { carrito, agregar } = useCarritoContext();
  const { mostrarToast } = useToast(); // Traemos la función disparadora

  // Derivado: nada de esto se guarda en un estado propio del componente.
  const itemEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito?.cantidad ?? 0;
  const sinStock = producto.stock === 0;
  const enElTope = cantidadEnCarrito >= producto.stock;

  // Variables para mostrar el estado del botón y su texto según la situación del producto
  const textoBoton = sinStock
    ? 'Sin stock'
    : enElTope
      ? 'Tope alcanzado'
      : cantidadEnCarrito > 0
        ? `En el carrito (${cantidadEnCarrito})`
        : 'Agregar';


  // Variables para cambiar el color del botón según la situación del producto
  const colorBoton = sinStock
    ? 'bg-outline-variant/30 text-on-surface-variant/50 cursor-not-allowed' // Gris Apagado y sutil
    : enElTope
      ? 'bg-error text-on-primary dark:text-bg-surface'                      // Advertencia/Error 
      : cantidadEnCarrito > 0
        ? 'bg-primary-fixed-dim text-on-primary hover:bg-primary-fixed-dim/90'                 // Distingue que ya hay unidades en el carrito
        : 'bg-primary text-on-primary hover:bg-primary-fixed-dim';           // Estado original "Agregar"    
  
  // CONTROL INTERCEPTOR DEL CLICK
  const manejarAgregarAlCarrito = () => {
    if (sinStock || enElTope) {
      // Si el cliente intenta cliquear de más, disparamos el cartel en vez de colgar la app
      mostrarToast(`No hay más stock disponible de "${producto.title}"`);
      return;
    }
    agregar(producto);
  };

  return (
    <article className="bg-surface-container rounded-default overflow-hidden border border-outline-variant/30 flex flex-col">
      <div className="relative h-52 sm:h-56 md:h-60 w-full overflow-hidden">
        <img
          src={producto.img}
          alt={producto.title}
          className="w-full h-full object-cover object-center"
        />
        {producto.destacado && (
          <span className="absolute top-2 left-2 bg-tertiary text-on-primary text-xs font-bold px-2 py-1 rounded-full">
            DESTACADO
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-syne font-semibold text-on-surface">{producto.title}</h3>
        <p className="text-on-surface-variant text-sm">
          {producto.location} · {producto.category}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-bold text-on-surface">
            {formatearPrecio(producto.precio)}
          </span>

          <button
            /*onClick={() => agregar(producto)}
            disabled={sinStock || enElTope}*/
            onClick={manejarAgregarAlCarrito} // Ejecuta el interceptor
            className={`px-3 py-1.5 text-sm font-medium rounded-full ${colorBoton} transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {textoBoton}
          </button>
        </div>
      </div>
    </article>
  );
}
