import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { toggleTheme, setTheme } from '../app/themeSlice'

export function Layout() {
    const dispatch = useDispatch()
    const isDark = useSelector((state: RootState) => state.theme.isDark)

    // Al montar, cargamos la preferencia del usuario
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
        
        dispatch(setTheme(shouldBeDark))
        document.documentElement.classList.toggle('dark', shouldBeDark)
    }, [dispatch])

    // Sincronizar el DOM cuando cambia el estado
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark)
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    // Cambia el tema manualmente
    const handleToggleTheme = () => {
        dispatch(toggleTheme())
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
            {/* Navbar */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
                <h1 className="text-xl font-bold tracking-wide">🎬 MovieLens</h1>
                <button
                    onClick={handleToggleTheme}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
                </button>
            </header>

            {/* Contenido principal */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-200 dark:border-gray-700">
                © 2025 MovieLens — Todos los derechos reservados
            </footer>
        </div>
    )
}
