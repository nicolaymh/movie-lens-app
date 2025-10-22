/**
 * @file Header principal de la aplicación.
 * Muestra el logo y un botón para alternar entre modo claro y oscuro.
 */

/**
 * Encabezado con soporte para tema oscuro.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isDark - Indica si el modo oscuro está activo.
 * @param {() => void} props.toggleTheme - Función para cambiar el tema.
 */
export function Header({
  isDark,
  toggleTheme,
}: {
  isDark: boolean
  toggleTheme: () => void
}) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300 ${isDark ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide flex items-center gap-2">
          🎬 <span>MovieLens</span>
        </h1>

        {/* Botón de modo oscuro */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-300 ${isDark
              ? 'bg-white/10 hover:bg-white/20'
              : 'bg-white/20 hover:bg-white/30'
            }`}
        >
          {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
        </button>
      </div>
    </header>
  )
}
