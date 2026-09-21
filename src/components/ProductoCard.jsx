import { useCarritoContext } from '../context/CarritoContext.jsx';
import { formatearPrecio } from '../utils/formato.js';

/**
 * Adaptado de ItemCard.jsx del TP2. En vez de un botón "Agregar/Quitar"
 * de watchlist, ahora es un botón "Agregar al carrito" que respeta el
 * stock disponible.
 */
export function ProductoCard({ producto }) {
  const { carrito, agregar } = useCarritoContext();

  // Derivado: nada de esto se guarda en un estado propio del componente.
  const itemEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito?.cantidad ?? 0;
  const sinStock = producto.stock === 0;
  const enElTope = cantidadEnCarrito >= producto.stock;

  const textoBoton = sinStock
    ? 'Sin stock'
    : enElTope
      ? 'Tope alcanzado'
      : cantidadEnCarrito > 0
        ? `En el carrito (${cantidadEnCarrito})`
        : 'Agregar';

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
            onClick={() => agregar(producto)}
            disabled={sinStock || enElTope}
            className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {textoBoton}
          </button>
        </div>
      </div>
    </article>
  );
}
