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
  *
 * El guardia de acá abajo es lo que convierte un error silencioso
 * en un error ruidoso: si alguien hace useCarritoContext() fuera de
 * <CarritoProvider>, se rompe con un mensaje claro.
 */
export function useCarritoContext() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error('useCarritoContext() tiene que usarse adentro de <CarritoProvider>');
  }

  return contexto;
}
