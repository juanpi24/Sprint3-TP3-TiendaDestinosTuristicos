import { ProductoCard } from './ProductoCard.jsx';

/**
 * Adaptado de ItemList.jsx del TP2. Recibe el catálogo ya filtrado
 * (por búsqueda) desde Tienda.jsx y solo se encarga de mapearlo.
 */
export function ProductoList({ productos }) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-16 text-on-surface-variant">
        <p className="font-syne text-lg text-on-surface mb-1">
          No encontramos paquetes con esa búsqueda
        </p>
        <p className="text-sm">Probá con otro destino o categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {productos.map((producto) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
