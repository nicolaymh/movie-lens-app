/**
 * @file Layout principal de la aplicación.
 * Define la estructura base: header, contenido principal y tema oscuro.
 */

import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { useTheme } from "../../hooks/useTheme"

/**
 * Contenedor general de la aplicación.
 * Maneja el modo oscuro y renderiza las páginas dentro del layout.
 */
export function Layout() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <div
            className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
                }`}
        >
            <Header isDark={isDark} toggleTheme={toggleTheme} />
            <main className="pt-20 max-w-6xl mx-auto px-6">
                <Outlet />
            </main>
        </div>
    )
}
