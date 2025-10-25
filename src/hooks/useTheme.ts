/**
 * @file Custom hook para manejo del tema (claro/oscuro)
 */

import { useState, useEffect } from 'react'
import { THEMES, THEME_STORAGE_KEY } from '../utils/constants'

/**
 * Hook para gestionar el tema de la aplicación con persistencia en localStorage
 * @returns Objeto con el estado del tema y función para cambiarlo
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // Verificar preferencia guardada en localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme) {
      return savedTheme === THEMES.DARK
    }
    // Si no hay preferencia guardada, usar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Aplicar el tema al documento
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev
      localStorage.setItem(
        THEME_STORAGE_KEY,
        newTheme ? THEMES.DARK : THEMES.LIGHT
      )
      return newTheme
    })
  }

  return { isDark, toggleTheme }
}
