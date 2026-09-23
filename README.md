# 🧳 Rutas AR — Tienda de Paquetes Turísticos

Aplicación web desarrollada con **React + Vite** que permite explorar paquetes turísticos para distintos destinos de Argentina, agregarlos a un carrito de compras, modificar cantidades y completar una compra mediante un proceso de checkout validado.

Este proyecto corresponde al **Trabajo Práctico Sprint 3** y representa la evolución del catálogo de destinos desarrollado en el Sprint 2. En esta versión se incorpora gestión de estado global mediante Context API, persistencia en LocalStorage y validaciones avanzadas con React Hook Form y Zod.

---

## 🌎 Demo Online Netlify

🔗 **Deploy:** (https://tiendadestinosturisticos.netlify.app/)
---

## 🛠️ Tecnologías Utilizadas

- React 19
- Vite 8
- JavaScript (ES6+)
- Context API
- React Hook Form
- Zod
- @hookform/resolvers
- Tailwind CSS v4
- LocalStorage API
- ESLint

---

## 📦 Dependencias Principales

| Dependencia | Uso |
|------------|-----|
| React | Construcción de interfaces de usuario |
| Vite | Bundler y entorno de desarrollo |
| Tailwind CSS | Estilos utilitarios y diseño responsive |
| React Hook Form | Gestión eficiente de formularios |
| Zod | Validación de datos mediante schemas |
| @hookform/resolvers | Integración entre React Hook Form y Zod |
| Context API | Manejo de estado global |
| LocalStorage | Persistencia de datos del usuario |

---

## 🎯 Objetivos del Sprint

- Implementar una tienda funcional utilizando React.
- Utilizar Context API para compartir estado global.
- Desarrollar un carrito de compras persistente.
- Aplicar React Hook Form para la gestión de formularios.
- Aplicar validaciones robustas mediante Zod.
- Evitar prop drilling mediante Context.
- Reutilizar lógica mediante hooks personalizados.
- Mantener una arquitectura organizada y escalable.

---

## 📋 Funcionalidades

### 🗺️ Catálogo de paquetes turísticos

- Visualización de destinos turísticos argentinos.
- Información detallada de cada producto mediante tarjetas.
- Gestión de stock disponible.
- Interfaz responsive.

### 🔍 Búsqueda de productos

- Filtrado dinámico en tiempo real.
- Actualización automática de resultados.
- Manejo de estados sin coincidencias.

### 🛒 Carrito de compras

- Agregar paquetes al carrito.
- Incrementar cantidades.
- Disminuir cantidades.
- Eliminar productos individuales.
- Vaciar carrito completo.
- Cálculo automático de subtotales y total general.
- Contador dinámico de productos.

### 💾 Persistencia de datos

- Almacenamiento del carrito mediante LocalStorage.
- Recuperación automática al recargar la aplicación.
- Lectura inicial lazy para optimizar el rendimiento.

### 🌙 Tema claro / oscuro

- Alternancia entre modos visuales.
- Persistencia de la preferencia del usuario.
- Aplicación global mediante Context API.

### ✅ Checkout

- Formulario administrado mediante React Hook Form.
- Validación completa mediante Zod.
- Mensajes de error personalizados.
- Validaciones condicionales.
- Confirmación final de compra.

---

# 🏗️ Organización del Proyecto

La aplicación fue estructurada separando responsabilidades por dominio:

- **components/** contiene componentes reutilizables.
- **layout/** agrupa elementos permanentes de la interfaz.
- **ui/** contiene componentes asociados al flujo de compra.
- **context/** centraliza estados globales.
- **hooks/** encapsula lógica reutilizable.
- **schemas/** define reglas de validación.
- **data/** almacena información local de productos y vistas.
- **utils/** agrupa funciones auxiliares.
- **views/** representa las pantallas principales de la aplicación.

---

# 🧠 Contextos Globales

## CarritoContext

### Qué guarda

- carrito
- cantidadTotal
- total

### Funciones disponibles

- agregar()
- cambiarCantidad()
- quitar()
- vaciar()
- estaEnElCarrito()

### Quién lo consume

- Navbar
- ProductoCard
- CarritoModal
- CarritoItem
- Checkout

### Por qué es global

El carrito es utilizado por componentes ubicados en ramas distintas del árbol de componentes. Context permite evitar prop drilling y centralizar toda la lógica relacionada con las compras.

---

## ThemeContext

### Qué guarda

- isDark
- toggleTheme()

### Quién lo consume

- Navbar

### Por qué es global

Aunque hoy solo se utiliza desde la navegación principal, el tema representa una configuración general de la aplicación que potencialmente puede ser consumida por cualquier componente futuro.

---

# 🪝 Hooks Personalizados

## useLocalStorage(key, initialValue)

Hook genérico encargado de sincronizar estado con LocalStorage.

### Responsabilidades

- Lectura inicial lazy.
- Persistencia automática.
- Parseo y serialización JSON.
- Reutilización para distintos dominios.

---

## useCarrito()

Hook de dominio que encapsula toda la lógica del carrito.

### Devuelve

```js
{
  carrito,
  cantidadTotal,
  total,
  estaEnElCarrito,
  agregar,
  cambiarCantidad,
  quitar,
  vaciar
}
```

### Responsabilidades

- Manejo de productos.
- Gestión de cantidades.
- Cálculo de totales.
- Persistencia mediante useLocalStorage.

---

## useToggle(initialState)

Hook reutilizable para estados booleanos.

### Devuelve

```js
[
  estado,
  toggle,
  abrir,
  cerrar
]
```

### Se utiliza para

- Modal del carrito.
- Modal de confirmación.
- Cualquier estado de apertura o cierre.

---

# ✅ Validación del Checkout

El formulario de checkout utiliza **React Hook Form** junto con **Zod** mediante `zodResolver`.

La validación fue desacoplada completamente de los componentes y centralizada en:

```text
src/schemas/checkoutSchema.js
```

### Ventajas

- Reglas de validación concentradas en un único lugar.
- Mayor mantenibilidad.
- Formularios más limpios.
- Reutilización futura del schema.
- Separación de responsabilidades.

### Bonus

Se implementó validación condicional mediante `superRefine()`, permitiendo exigir determinados campos únicamente cuando ciertas condiciones del formulario se cumplen.

---

# 📊 Decisiones de Estado

## Estado Global

Se decidió utilizar Context únicamente para información compartida por múltiples ramas del árbol:

### Carrito

Necesario en:

- Navbar
- Tienda
- Modal del carrito
- Checkout

### Tema

Configuración visual aplicable a toda la aplicación.

---

## Estado Local

### Búsqueda de productos

La búsqueda permanece en `Tienda.jsx` porque únicamente esa vista necesita acceder a dicha información.

### Modal del carrito

Permanece como estado de layout.

### Modal de confirmación

Se mantiene dentro de `CarritoModal.jsx` porque ningún otro componente requiere conocer ese estado.

### Campos del formulario

Son administrados íntegramente por React Hook Form, evitando múltiples useState redundantes.

---

# 🔁 Prop Drilling: Antes y Después

## Antes

App.jsx tendría que distribuir múltiples props relacionadas al carrito:

- carrito
- agregar
- cambiarCantidad
- quitar
- vaciar
- total
- cantidadTotal

Estas props atravesarían componentes intermedios que no las consumen directamente.

## Después

Cada componente obtiene únicamente lo que necesita mediante:

```js
useCarritoContext()
useThemeContext()
```

De esta forma:

- Se elimina el prop drilling.
- Se reduce el acoplamiento.
- Mejora la escalabilidad.
- Se simplifica el mantenimiento de la aplicación.

---

# 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── layout/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   │
│   └── ui/
│       ├── Modal.jsx
│       ├── CarritoItem.jsx
│       ├── CarritoModal.jsx
│       ├── ConfirmationModal.jsx
│       ├── ProductoCard.jsx
│       └── ProductoList.jsx
│
├── context/
│   ├── CarritoContext.jsx
│   └── ThemeContext.jsx
│
├── data/
│   ├── productos.js
│   └── vistas.js
│
├── hooks/
│   ├── useCarrito.js
│   ├── useLocalStorage.js
│   └── useToggle.js
│
├── schemas/
│   └── checkoutSchema.js
│
├── utils/
│   └── formato.js
│
├── views/
│   ├── Tienda.jsx
│   ├── Checkout.jsx
│   └── Confirmacion.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ▶️ Instalación y Ejecución

### Clonar el repositorio

```bash
git clone https://github.com/juanpi24/Sprint3-TP3-TiendaDestinosTuristicos.git
```

### Ingresar a la carpeta del proyecto

```bash
cd Sprint3-TP3-TiendaDestinosTuristicos
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### Generar build de producción

```bash
npm run build
```

### Visualizar build localmente

```bash
npm run preview
```

---

# 🚀 Conceptos Aplicados

- Componentes reutilizables.
- Context API.
- Custom Hooks.
- Persistencia con LocalStorage.
- React Hook Form.
- Validación con Zod.
- Validación condicional.
- Estado global y estado local.
- Manejo inmutable de arrays y objetos.
- Separación de responsabilidades.
- Arquitectura basada en dominios.
- Eliminación de prop drilling.

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto utilicé herramientas de Inteligencia Artificial como apoyo para comprender conceptos, validar decisiones técnicas y mejorar algunas implementaciones específicas.

## Qué partes desarrollé con ayuda de IA

- Generación y organización inicial del archivo README del proyecto.
- Revisión y corrección de validaciones implementadas con **Zod** en el formulario de Checkout.
- Implementación del temporizador de redirección automática en la vista **Confirmacion.jsx** después de finalizar una compra.
- Correcciones y mejoras de estilos realizados con **Tailwind CSS**, especialmente relacionadas con diseño responsive, espaciados y consistencia visual.

## Qué revisé o corregí manualmente

- Adaptación de las soluciones propuestas a la estructura específica del proyecto.
- Ajuste de lógica de negocio relacionada con el carrito de compras.
- Verificación del correcto funcionamiento de Context API y los hooks personalizados.
- Pruebas de validación del formulario y flujos de navegación.
- Ajustes finales de estilos y experiencia de usuario.

## Qué tipo de consultas realicé

- Uso correcto de React Hook Form junto con Zod.
- Validaciones condicionales mediante `superRefine()`.
- Implementación de temporizadores y redirecciones automáticas con React.
- Buenas prácticas para Context API y Custom Hooks.
- Resolución de problemas de estilos utilizando Tailwind CSS.
- Organización y documentación técnica del proyecto mediante README.

---

## 👨‍💻 Autor

**Juan Pablo Millicay**

Proyecto realizado como parte del proceso de formación en desarrollo Frontend con React.