export function Header({
  isDark,
  toggleTheme,
}: {
  isDark: boolean
  toggleTheme: () => void
}) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300 ${isDark ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
        }`}
    >
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
      >
        {/* LOGO */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide flex items-center gap-2">
          🎬 <span>MovieLens</span>
        </h1>

        {/* BOTÓN DE MODO OSCURO */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-300 ${isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-white/20 hover:bg-white/30"
            }`}
        >
          {isDark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>
      </div>
    </header>
  )
}
