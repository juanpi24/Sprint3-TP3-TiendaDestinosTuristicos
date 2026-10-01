import { useEffect, useState } from 'react';

/**
 * Pantalla de "gracias". El carrito ya se vació dentro del onSubmit
 * de Checkout.jsx — acá no hay que tocar el carrito para nada, solo
 * mostrar el nombre de la persona que compró y la cuenta regresiva.
 */

// 💡 Cambiar el 'false' a 'true' para probarlo en 5 segundos
const EN_MODO_PRUEBA = true; 
const TIEMPO_PRUEBA = 5 * 1000;         // 5 segundos
const TIEMPO_PRODUCCION = 5 * 60 * 1000; // 5 minutos

export function Confirmacion({ pedido, onVolver }) {
  // Definimos el tiempo total según el modo actual
  const tiempoEspera = EN_MODO_PRUEBA ? TIEMPO_PRUEBA : TIEMPO_PRODUCCION;
  
  // Estado para guardar los segundos restantes en pantalla
  const [timeLeft, setTimeLeft] = useState(Math.ceil(tiempoEspera / 1000));

  useEffect(() => {
    // 1. Intervalo para actualizar la cuenta regresiva en pantalla segundo a segundo
    const intervalo = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2. Temporizador automático para ejecutar la acción final
    const temporizador = setTimeout(() => {
      onVolver();
    }, tiempoEspera);

    // Limpieza de ambos controles si el componente se desmonta antes
    return () => {
      clearInterval(intervalo);
      clearTimeout(temporizador);
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array vacío: Se ejecuta una sola vez al montar

  // Función auxiliar para formatear los segundos (ej: 5:00 en vez de 300 segundos)
  const formatearTiempo = (segundosTotales) => {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;
    return minutos > 0 
      ? `${minutos}:${segundos.toString().padStart(2, '0')} minutos`
      : `${segundos} segundos`;
  };

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

      {/* Mensaje visual de la cuenta regresiva */}
      <p className="text-xs text-on-surface-variant/80 mt-4 bg-surface-variant/20 px-3 py-1.5 rounded-full heavy">
        Redireccionando automáticamente en{' '}
        <span className="font-semibold text-primary">{formatearTiempo(timeLeft)}</span>...
      </p>
    </main>
  );
}
