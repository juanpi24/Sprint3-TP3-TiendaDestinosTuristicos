import { createContext, useState, useEffect, useContext } from 'react';

const ToastContext = createContext();
const TIEMPO_TOAST = 3 * 1000;       // 5 segundos
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // Formato: { mensaje: string, tipo: string }

  const mostrarToast = (mensaje, tipo = 'error') => {
    setToast({ mensaje, tipo });
  };

  // EFECTO ASÍNCRONO AUTOMÁTICO
  useEffect(() => {
    if (!toast) return; //si no hay toast, no hacemos nada    

    // Configura el borrado a los 5000ms
    const timer = setTimeout(() => {
      setToast(null);
    }, TIEMPO_TOAST);

    // FUNCIÓN DE LIMPIEZA (Cleanup)
    return () => clearTimeout(timer);
  }, [toast]); // Se re-ejecuta con cada nuevo toast

  return (
    <ToastContext.Provider value={{ toast, mostrarToast }}>
      {children}
    </ToastContext.Provider>
  );
}

//El guardia de acá abajo es lo que convierte un error silencioso en un error ruidoso: si alguien hace useToast() fuera de <ToastContext.Provider>, se rompe con un mensaje claro.
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  
  // El verdadero guardia ruidoso:
  if (!context) {
    throw new Error('useToast debe ser utilizado dentro de un ToastProvider');
  }
  
  return context;
};

