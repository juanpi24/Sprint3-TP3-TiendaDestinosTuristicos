import { useCarritoContext } from '../../context/CarritoContext.jsx';
import { useThemeContext } from '../../context/ThemeContext.jsx';

/**
 * Navbar: logo, botón de tema y botón de carrito con contador.
 * Todo lo que muestra sale de los contextos — cero props que solo
 * pasen de largo desde App.
 */
export function Navbar({ onAbrirCarrito }) {
  const { cantidadTotal } = useCarritoContext();
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <header className="sticky top-0 z-40 bg-surface-container/90 backdrop-blur border-b border-outline-variant/30">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo de PaquetesAR"
            className="h-9 w-9 object-contain rounded-full"
          />
          <span className="font-syne font-bold text-lg text-on-surface">
            Paquetes<span className="text-primary">AR</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high border border-outline-variant/40 hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface text-lg">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button
            onClick={onAbrirCarrito}
            aria-label="Abrir carrito"
            className="relative flex items-center gap-2 bg-surface-container-high px-3.5 py-1.5 rounded-full border border-outline-variant/40 hover:bg-surface-container-highest transition-colors duration-150 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface text-lg">
              shopping_cart
            </span>
            {cantidadTotal > 0 && (
              <span className="bg-primary text-on-primary text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {cantidadTotal}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
