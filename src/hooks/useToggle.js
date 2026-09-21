import { useState } from 'react';

/**
 * Hook para manejar un estado booleano de tipo toggle (activar/desactivar).
 * Se usa para el modal del carrito y cualquier otro panel simple abierto/cerrado.
 *
 * 👉 Nota respecto al TP2: acá se sacó el useCallback que tenía la versión
 * original. En el Sprint 3 useCallback/useMemo no se pueden usar, y de
 * hecho no cumplían ninguna función real: estas funciones no se pasaban
 * a un componente envuelto en memo() ni entraban como dependencia de
 * otro efecto, así que memorizarlas no cambiaba nada.
 *
 * @param {boolean} initialState - Estado inicial del toggle.
 * @returns {Array} [estado, toggle, abrir, cerrar]
 */
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((prev) => !prev);
  const setOpen = () => setState(true);
  const setClose = () => setState(false);

  return [state, toggle, setOpen, setClose];
}
