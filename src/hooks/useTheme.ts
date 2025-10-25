/**
 * @file Custom hook para manejo del tema (claro/oscuro) con Redux
 */

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme, toggleTheme as toggleThemeAction } from '../app/themeSlice'

/**
 * Hook para gestionar el tema de la aplicación usando Redux
 *
 * @returns Objeto con:
 * - `isDark`: boolean que indica si el tema actual es oscuro
 * - `toggleTheme`: función para alternar entre claro y oscuro
 * - `theme`: valor del tema ('light' | 'dark')
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isDark, toggleTheme } = useTheme()
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       {isDark ? 'Modo Claro' : 'Modo Oscuro'}
 *     </button>
 *   )
 * }
 * ```
 */
export function useTheme() {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const isDark = theme === 'dark'

  // Aplicar el tema al cargar el componente (para el estado inicial)
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    dispatch(toggleThemeAction())
  }

  return { isDark, toggleTheme, theme }
}
