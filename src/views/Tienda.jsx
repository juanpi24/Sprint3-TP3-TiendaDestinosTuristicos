import { useState } from 'react';
import { PRODUCTOS } from '../data/productos.js';
import { ProductoList } from '../components/ProductoList.jsx';

/**
 * Adaptado de App.jsx + SearchBar.jsx del TP2, pero como vista.
 * El buscador es un useState LOCAL acá — no va en ningún context,
 * porque ningún otro componente fuera de esta vista lo necesita.
 */
export function Tienda() {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = PRODUCTOS.filter((producto) => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return true;
    return (
      producto.title.toLowerCase().includes(texto) ||
      producto.location.toLowerCase().includes(texto) ||
      producto.category.toLowerCase().includes(texto)
    );
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-4">
      <div>
        <h1 className="font-syne text-2xl font-bold text-on-surface">
          Paquetes a los destinos de Argentina
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Elegí tu próximo viaje y armá tu carrito.
        </p>
      </div>

      <div className="relative">
        <label htmlFor="buscador-destinos" className="sr-only">
          Buscar paquete por destino, provincia o categoría
        </label>
        <input
          id="buscador-destinos"
          type="text"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          placeholder="Buscar por destino, provincia o categoría..."
          className="w-full bg-surface-container px-4 py-3 rounded-full border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <ProductoList productos={productosFiltrados} />
    </main>
  );
}
