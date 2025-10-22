/**
 * @file Header principal de la aplicación con menú hamburguesa responsive.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Encabezado con soporte para tema oscuro y menú móvil.
 * @param {boolean} isDark - Indica si el modo oscuro está activo.
 * @param {() => void} toggleTheme - Función para cambiar el tema.
 */
export function Header({
  isDark,
  toggleTheme,
}: {
  isDark: boolean
  toggleTheme: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Variantes del menú lateral
  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.3 } },
    exit: { x: '100%', transition: { duration: 0.25 } },
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300 ${isDark ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold tracking-wide flex items-center gap-2"
        >
          🎬 <span>MovieLens</span>
        </Link>

        {/* Menú desktop */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 ${isDark
                ? 'bg-white/10 hover:bg-white/20'
                : 'bg-white/20 hover:bg-white/30'
              }`}
          >
            {isDark ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </nav>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1">
            {/* Línea superior */}
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
            {/* Línea del medio */}
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
            {/* Línea inferior */}
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
          </div>
        </button>
      </div>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 right-0 h-full w-2/3 sm:hidden z-40 shadow-lg ${isDark
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-900'
              }`}
          >
            <div className="flex flex-col items-start p-6 space-y-6">
              <Link
                to="/"
                className="text-lg font-semibold hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>

              <button
                onClick={() => {
                  toggleTheme()
                  setIsOpen(false)
                }}
                className="text-lg font-semibold hover:text-blue-500"
              >
                {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
