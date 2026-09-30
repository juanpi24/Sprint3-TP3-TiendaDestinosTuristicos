import { useEffect } from 'react';

/**
 * Pantalla de "gracias". El carrito ya se vació dentro del onSubmit
 * de Checkout.jsx — acá no hay que tocar el carrito para nada, solo
 * mostrar el nombre de la persona que compró.
 */

// 💡 Cambiar el 'false' a 'true' para probarlo en 5 segundos
const EN_MODO_PRUEBA = true; 
const TIEMPO_PRUEBA = 5 * 1000;         // 5 segundos
const TIEMPO_PRODUCCION = 5 * 60 * 1000; // 5 minutos

export function Confirmacion({ pedido, onVolver }) {

  useEffect(() => {
    // Definimos el tiempo según el modo actual
    const tiempoEspera = EN_MODO_PRUEBA ? TIEMPO_PRUEBA : TIEMPO_PRODUCCION;

    // Configura el temporizador automático
    const temporizador = setTimeout(() => {
      onVolver();
    }, tiempoEspera);

    // Limpia el temporizador si el componente se desmonta antes de que termine el tiempo
    return () => clearTimeout(temporizador);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array vacío: El temporizador se crea una sola vez al mostrar la pantalla

  return (
    <main className="max-w-md mx-auto px-4 py-16 text-center flex flex-col items-center gap-3">
      <button
        onClick={onVolver}
        className="self-start text-sm text-on-surface-variant hover:text-on-surface cursor-pointer flex items-center gap-1"
      >
        ← Volver a la tienda
      </button>

      <span className="material-symbols-outlined text-primary text-5xl">
        check_circle
      </span>
      <h1 className="font-syne text-2xl font-bold text-on-surface">
        ¡Gracias, {pedido?.cliente?.nombre}!
      </h1>
      <p className="text-on-surface-variant text-sm">
        Tu pedido fue confirmado. Te vamos a escribir a{' '}
        <span className="text-on-surface font-medium">{pedido?.cliente?.email}</span>{' '}
        con los detalles del viaje.
      </p>
    </main>
  );
}
