import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { Header } from "./Header"

export function Layout() {
    const [isDark, setIsDark] = useState(false)

    // Al cargar, leemos el valor del localStorage o el tema del sistema
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true)
        }
    }, [])

    // Alternar y guardar el tema
    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        localStorage.setItem("theme", newTheme ? "dark" : "light")
    }

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
