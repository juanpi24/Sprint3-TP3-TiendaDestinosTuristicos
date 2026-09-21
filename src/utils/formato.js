/**
 * Formatea un número como precio en pesos argentinos.
 *
 * @param {number} numero - El precio, como número (ej: 145000).
 * @returns {string} El precio formateado (ej: "$145.000").
 */
export function formatearPrecio(numero) {
  return numero.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });
}
