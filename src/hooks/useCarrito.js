import { useLocalStorage } from './useLocalStorage.js';

/**
 * Hook de dominio para el carrito de compras.
 *
 * Cada item guardado en el carrito es el producto original completo,
 * más un campo `cantidad`. Guardar el producto entero (no solo el id)
 * es lo que permite que el resumen del checkout y el historial de
 * pedidos no dependan de que `productos.js` no haya cambiado.
 */
export function useCarrito() {
  const [carrito, setCarrito] = useLocalStorage('carrito-tienda-destinos', []);

  /**
   * Agrega un producto al carrito. Si ya estaba, le suma 1 a la cantidad
   * en vez de duplicar la fila. Nunca deja pasar la cantidad del stock
   * disponible: si ya está en el tope, el agregar no hace nada.
   */
  const agregar = (producto) => {
    setCarrito((prev) => {
      const yaEsta = prev.find((item) => item.id === producto.id);

      if (yaEsta) {
        if (yaEsta.cantidad >= producto.stock) return prev; // sin stock para sumar más

        return prev.map(
          (item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 } // copia modificada
              : item, // los demás, intactos
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  /**
   * Suma o resta `delta` (normalmente +1 o -1) a la cantidad de un item.
   * Se usa desde los botones "+" y "-" de CarritoItem.
   * - Nunca deja pasar el stock (se limita con Math.min).
   * - Si la cantidad llega a 0 (o menos), el item se saca del carrito.
   */
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.min(item.cantidad + delta, item.stock) }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  /** Saca un item del carrito por completo, sin importar su cantidad. */
  const quitar = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  /** Vacía el carrito entero (lo usa ConfirmationModal antes de confirmar). */
  const vaciar = () => {
    setCarrito([]);
  };

  /** Derivado: ¿este producto ya está en el carrito? */
  const estaEnElCarrito = (id) => carrito.some((item) => item.id === id);

  // Derivados con reduce — NO son useState. Si el total tuviera su propio
  // useState, habría dos fuentes de verdad que se podrían desincronizar.
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return {
    carrito,
    cantidadTotal,
    total,
    estaEnElCarrito,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  };
}
