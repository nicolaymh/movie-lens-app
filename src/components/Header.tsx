/**
 * Encabezado principal de la aplicación (modo claro/oscuro)
 * ----------------------------------------------------------
 * Cambia de color según el tema y mantiene un diseño limpio.
 */

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50
                      bg-blue-600 dark:bg-gray-800
                      text-white shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
          🎬 <span>MovieLens</span>
        </h1>
      </div>
    </header>
  )
}
