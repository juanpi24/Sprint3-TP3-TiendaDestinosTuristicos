import { createContext, useContext } from 'react';
import { useCarrito } from '../hooks/useCarrito.js';

// Lo único que sale de este archivo es el Provider y el hook consumidor de más abajo. Así se
// garantiza que nadie en la app pueda hacer useContext(CarritoContext)

const CarritoContext = createContext(null);

/**
 * Provider del carrito. Se monta UNA sola vez, en main.jsx, envolviendo
 * <App />. Usa useCarrito() por dentro sin reescribir ni un poco de su
 * lógica — el Provider es solo el "cableado" de Context.
 */
export function CarritoProvider({ children }) {
  const valor = useCarrito();

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}

/**
 * Hook consumidor. Es la ÚNICA forma permitida de leer el carrito desde
 * un componente — nunca useCarrito() directo fuera de este archivo, porque cada llamada a useCarrito() crea su propia instancia de estado.
  *
 * El guardia de acá abajo es lo que convierte un error silencioso
 * en un error ruidoso: si alguien hace useCarritoContext() fuera de
 * <CarritoProvider>, se rompe con un mensaje claro.
 */
// El archivo también exporta el Provider; este hook debe permanecer aquí para
// compartir exactamente la misma instancia del contexto.
// eslint-disable-next-line react-refresh/only-export-components
export function useCarritoContext() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error('useCarritoContext() tiene que usarse adentro de <CarritoProvider>');
  }

  return contexto;
}
