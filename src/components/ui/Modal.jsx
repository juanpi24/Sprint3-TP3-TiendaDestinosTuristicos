import { useEffect } from 'react';

/**
 * Modal genérico y reutilizable. No sabe nada de carrito ni de
 * productos — solo sabe mostrar una caja con children adentro, y
 * cerrarse con Escape.
 *
 */
export function Modal({ isOpen, onClose, children }) {
  // Bonus: cerrar con Escape. Mismo patrón que ListPanel del TP2.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-surface-container rounded-lg p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}
