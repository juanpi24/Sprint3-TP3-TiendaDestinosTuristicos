import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCarritoContext } from '../context/CarritoContext.jsx';
import { formatearPrecio } from '../utils/formato.js';
import { checkoutSchema } from '../schemas/checkoutSchema.js';

/**
 * Checkout: resumen del pedido (sale del contexto, no de props) +
 * formulario con React Hook Form + Zod. Cero useState para los campos
 * del form, cero value/onChange a mano, y — desde acá en adelante —
 * cero reglas de validación sueltas en cada register(): TODA la
 * validación vive en checkoutSchema.js, y zodResolver es el puente
 * entre ese schema y formState.errors.
 */
export function Checkout({ onConfirmar, onVolver }) {
  const { carrito, total, vaciar } = useCarritoContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      metodoEnvio: 'domicilio',
      aceptaTerminos: false,
    },
  });

  // watch(): lee el valor actual del radio sin volverlo un estado
  // propio del componente. Cuando cambia, este componente re-renderiza
  // y el campo Dirección aparece/desaparece.
  const metodoEnvio = watch('metodoEnvio');

  const onSubmit = (datos) => {
    // Acá adentro `datos` YA pasó el schema completo — Zod validó los
    // 7 campos antes de que esta función se llame. Pero igual armamos
    // el pedido a mano: RHF no borra el valor de un campo que se
    // desmonta (la dirección), así que si alguien eligió "retiro"
    // después de haber tipeado una dirección, ese valor viejo seguiría
    // en `datos` aunque el schema ya no lo haya exigido.
    const pedido = {
      cliente: {
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        direccion: datos.metodoEnvio === 'domicilio' ? datos.direccion : null,
      },
      envio: datos.metodoEnvio,
      notas: datos.notas || null,
      items: carrito,
      total,
    };

    console.log('Pedido:', pedido); // eslint-disable-line no-console -- pedido para revisar en la Review

    vaciar();
    onConfirmar(pedido);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
      <button
        onClick={onVolver}
        className="self-start text-sm text-on-surface-variant hover:text-on-surface cursor-pointer flex items-center gap-1"
      >
        ← Volver a la tienda
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Resumen del pedido: sale del contexto, no de props */}
        <section className="md:w-2/5 bg-surface-container rounded-default border border-outline-variant/30 p-4 h-fit">
          <h2 className="font-syne font-bold text-on-surface mb-3">Tu pedido</h2>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} className="flex justify-between text-sm py-1.5 text-on-surface">
                <span>
                  {item.title} <span className="text-on-surface-variant">x{item.cantidad}</span>
                </span>
                <span>{formatearPrecio(item.precio * item.cantidad)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-on-surface pt-3 mt-2 border-t border-outline-variant/30">
            <span>Total</span>
            <span>{formatearPrecio(total)}</span>
          </div>
        </section>

        {/* Formulario — fijate que ningún register() de acá abajo lleva
            ya un segundo argumento con reglas. Todas las reglas están
            en checkoutSchema.js; acá solo se "conecta" el input. */}
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-3/5 flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-on-surface mb-1">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              aria-invalid={errors.nombre ? 'true' : 'false'}
              aria-describedby={errors.nombre ? 'nombre-error' : undefined}
              {...register('nombre')}
              className="w-full bg-surface-container px-3 py-2 rounded-md border border-outline-variant/40 text-on-surface"
            />
            {errors.nombre && (
              <p id="nombre-error" className="text-error text-xs mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
              className="w-full bg-surface-container px-3 py-2 rounded-md border border-outline-variant/40 text-on-surface"
            />
            {errors.email && (
              <p id="email-error" className="text-error text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-on-surface mb-1">
              Teléfono
            </label>
            <input
              id="telefono"
              type="text"
              aria-invalid={errors.telefono ? 'true' : 'false'}
              aria-describedby={errors.telefono ? 'telefono-error' : undefined}
              {...register('telefono')}
              className="w-full bg-surface-container px-3 py-2 rounded-md border border-outline-variant/40 text-on-surface"
            />
            {errors.telefono && (
              <p id="telefono-error" className="text-error text-xs mt-1">
                {errors.telefono.message}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-on-surface mb-1">Método de envío</legend>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-on-surface">
                <input type="radio" value="domicilio" {...register('metodoEnvio')} />
                A domicilio
              </label>
              <label className="flex items-center gap-2 text-sm text-on-surface">
                <input type="radio" value="retiro" {...register('metodoEnvio')} />
                Retiro en el local
              </label>
            </div>
            {errors.metodoEnvio && (
              <p className="text-error text-xs mt-1">{errors.metodoEnvio.message}</p>
            )}
          </fieldset>

          {/* Aparece/desaparece según watch('metodoEnvio'). La regla de
              "obligatoria si es a domicilio" vive en el .superRefine()
              del schema, no acá. */}
          {metodoEnvio === 'domicilio' && (
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-on-surface mb-1">
                Dirección
              </label>
              <input
                id="direccion"
                type="text"
                aria-invalid={errors.direccion ? 'true' : 'false'}
                aria-describedby={errors.direccion ? 'direccion-error' : undefined}
                {...register('direccion')}
                className="w-full bg-surface-container px-3 py-2 rounded-md border border-outline-variant/40 text-on-surface"
              />
              {errors.direccion && (
                <p id="direccion-error" className="text-error text-xs mt-1">
                  {errors.direccion.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="notas" className="block text-sm font-medium text-on-surface mb-1">
              Notas (opcional)
            </label>
            <textarea
              id="notas"
              rows={3}
              {...register('notas')}
              className="w-full bg-surface-container px-3 py-2 rounded-md border border-outline-variant/40 text-on-surface"
            />
            {errors.notas && <p className="text-error text-xs mt-1">{errors.notas.message}</p>}
          </div>

          <div>
            <label className="flex items-start gap-2 text-sm text-on-surface">
              <input type="checkbox" {...register('aceptaTerminos')} className="mt-0.5" />
              Acepto los términos y condiciones
            </label>
            {errors.aceptaTerminos && (
              <p className="text-error text-xs mt-1">{errors.aceptaTerminos.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 px-4 py-2.5 rounded-md bg-primary text-on-primary font-medium hover:bg-primary-fixed-dim cursor-pointer"
          >
            Confirmar pedido
          </button>
        </form>
      </div>
    </main>
  );
}
