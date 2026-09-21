import { useCarritoContext } from '../context/CarritoContext.jsx';
import { formatearPrecio } from '../utils/formato.js';

/** Una fila del carrito, con los botones +/- y el subtotal. */
export function CarritoItem({ item }) {
  const { cambiarCantidad, quitar } = useCarritoContext();

  const subtotal = item.precio * item.cantidad;
  const enElTope = item.cantidad >= item.stock;

  return (
    <li className="flex items-center gap-3 py-3 border-b border-outline-variant/20 last:border-b-0">
      <img
        src={item.img}
        alt={item.title}
        className="w-14 h-14 rounded-md object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-on-surface truncate">
          {item.title}
        </p>
        <p className="text-xs text-on-surface-variant">
          {formatearPrecio(item.precio)} c/u
        </p>

        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => cambiarCantidad(item.id, -1)}
            aria-label="Restar uno"
            className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface cursor-pointer"
          >
            −
          </button>
          <span className="text-sm text-on-surface w-5 text-center">
            {item.cantidad}
          </span>
          <button
            onClick={() => cambiarCantidad(item.id, 1)}
            aria-label="Sumar uno"
            disabled={enElTope}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-semibold text-on-surface">
          {formatearPrecio(subtotal)}
        </span>
        <button
          onClick={() => quitar(item.id)}
          aria-label={`Quitar ${item.title} del carrito`}
          className="text-xs text-error hover:underline cursor-pointer"
        >
          Quitar
        </button>
      </div>
    </li>
  );
}
