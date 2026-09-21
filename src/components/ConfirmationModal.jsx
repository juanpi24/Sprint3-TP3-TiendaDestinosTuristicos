import { Modal } from './ui/Modal.jsx';

/**
 * Adaptado del ConfirmationModal.jsx del TP2. La diferencia con esta
 * versión: en vez de tener su propio backdrop/caja duplicados, se
 * construye ARRIBA de components/ui/Modal.jsx (composición) — Modal
 * no sabe nada de "confirmar" ni "cancelar", solo sabe mostrar una
 * caja con contenido adentro.
 */
export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-sm w-full">
        <h3 className="text-lg font-bold text-on-surface mb-2">{title}</h3>
        <p className="text-sm text-on-surface-variant mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-on-surface bg-surface-container-high rounded-md hover:bg-surface-container-highest cursor-pointer transition-colors duration-150"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
           className="px-4 py-2 text-sm font-medium text-on-error-container bg-error-container rounded-md hover:bg-error-container/80 cursor-pointer transition-colors duration-150"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}
