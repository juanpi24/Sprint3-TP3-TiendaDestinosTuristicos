/**
 * Pantalla de "gracias". El carrito ya se vació dentro del onSubmit
 * de Checkout.jsx — acá no hay que tocar el carrito para nada, solo
 * mostrar el nombre de la persona que compró.
 */
export function Confirmacion({ pedido }) {
  return (
    <main className="max-w-md mx-auto px-4 py-16 text-center flex flex-col items-center gap-3">
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
