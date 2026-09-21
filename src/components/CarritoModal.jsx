import { useState } from 'react';
import { Modal } from './ui/Modal.jsx';
import { CarritoItem } from './CarritoItem.jsx';
import { ConfirmationModal } from './ConfirmationModal.jsx';
import { useCarritoContext } from '../context/CarritoContext.jsx';
import { formatearPrecio } from '../utils/formato.js';

/**
 * El drawer/modal del carrito. Se arma sobre el Modal genérico (mismo
 * patrón de composición que ConfirmationModal). El "¿está abierto el
 * modal de confirmación de vaciar?" es un estado LOCAL acá adentro —
 * solo este componente lo necesita, igual que en ListPanel del TP2.
 */
export function CarritoModal({ isOpen, onClose, onIrACheckout }) {
  const { carrito, total, vaciar } = useCarritoContext();
  const [confirmandoVaciar, setConfirmandoVaciar] = useState(false);

  const carritoVacio = carrito.length === 0;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-80 max-w-full flex flex-col max-h-[70vh]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-syne font-bold text-on-surface">Tu carrito</h2>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant cursor-pointer"
            >
              ✕
            </button>
          </div>

          {carritoVacio ? (
            <p className="text-sm text-on-surface-variant py-8 text-center">
              Todavía no agregaste ningún paquete. Elegí un destino y armá tu
              viaje.
            </p>
          ) : (
            <ul className="overflow-y-auto flex-1">
              {carrito.map((item) => (
                <CarritoItem key={item.id} item={item} />
              ))}
            </ul>
          )}

          {/* El footer siempre se muestra: los botones se deshabilitan si
              el carrito está vacío, en vez de desaparecer. Así "no se
              puede entrar al checkout con el carrito vacío" es literal:
              el botón está ahí, pero disabled. */}
          <div className="pt-3 mt-2 border-t border-outline-variant/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant">Total</span>
              <span className="font-bold text-on-surface">
                {formatearPrecio(total)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setConfirmandoVaciar(true)}
                disabled={carritoVacio}
                className="flex-1 px-3 py-2 text-sm font-medium text-on-surface bg-surface-container-high rounded-md hover:bg-surface-container-highest cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Vaciar
              </button>
              <button
                onClick={onIrACheckout}
                disabled={carritoVacio}
                className="flex-1 px-3 py-2 text-sm font-medium text-on-primary bg-primary rounded-md hover:bg-primary-fixed-dim cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ir a pagar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={confirmandoVaciar}
        onClose={() => setConfirmandoVaciar(false)}
        onConfirm={() => {
          vaciar();
          setConfirmandoVaciar(false);
          onClose();
        }}
        title="¿Vaciar el carrito?"
        message="Vas a sacar todos los paquetes que agregaste. Esta acción no se puede deshacer."
      />
    </>
  );
}
