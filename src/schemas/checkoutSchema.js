import { z } from 'zod';

/**
 * Schema de validación del formulario de Checkout.
 *
 * Toda la validación vive en UN solo lugar: acá. React Hook Form solo conecta los inputs (`register`) y
 * le pasa cada envío a este schema a través de `zodResolver`. Si el schema dice que algo está mal, RHF llena
 * `formState.errors` solo, con los mismos mensajes que definimos acá.
 */
export const checkoutSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(1, 'Ingresá tu nombre completo')
      .regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios')
      .min(3, 'El nombre tiene que tener al menos 3 caracteres'),

    email: z
      .string()
      .trim()
      .min(1, 'Ingresá tu email')
      .email('Ingresá un email válido'),

    telefono: z
      .string()
      .trim()
      .min(1, 'Ingresá tu teléfono')
      .regex(/^[0-9]+$/, 'El teléfono solo puede tener números')
      .min(8, 'El teléfono tiene que tener al menos 8 dígitos'),

     // La dirección es opcional por defecto y limpia los espacios al principio y al final. La regla de "obligatoria si el método de envío es a domicilio" se resuelve en .superRefine() más abajo.
    metodoEnvio: z.enum(['domicilio', 'retiro'], {
      errorMap: () => ({ message: 'Elegí un método de envío' }),
    }),

    // Sin .min() ni required acá: si es obligatoria o no depende del
    // método de envío, y eso NO se puede expresar campo por campo.
    // Se resuelve en el .superRefine() de abajo, que sí ve el objeto
    // completo (todos los campos a la vez).
    direccion: z.string().trim().optional(),

    notas: z
      .string()
      .trim()
      .max(200, 'Máximo 200 caracteres')
      .optional(),

    // Un checkbox sin marcar llega como `false`, así que "obligatorio"
    // acá significa "tiene que valer exactamente true".
    aceptaTerminos: z.boolean().refine((valor) => valor === true, {
      message: 'Tenés que aceptar los términos para continuar',
    }),
  })
  // superRefine ve el objeto ENTERO (no un campo aislado), así que es
  // el lugar correcto para una regla que depende de dos campos a la
  // vez: "la dirección es obligatoria SOLO SI el envío es a domicilio".
  .superRefine((datos, ctx) => {

    // Si direccion es undefined o vino vacío después del .trim(), se considera vacía
    const direccionVacia = !datos.direccion || datos.direccion.length === 0;

    if (datos.metodoEnvio === 'domicilio' && direccionVacia) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['direccion'], // ← esto hace que el error caiga en errors.direccion
        message: 'La dirección es obligatoria',
      });
    }
  });
