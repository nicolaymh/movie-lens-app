/**
 * @file Middleware para sincronizar el tema con el DOM y localStorage
 *
 * Este middleware escucha cambios en el estado del tema y:
 * 1. Agrega/quita la clase 'dark' del elemento <html>
 * 2. Guarda la preferencia en localStorage
 */

import { THEME_STORAGE_KEY } from '../utils/constants'

/**
 * Middleware que sincroniza el tema de Redux con el DOM y localStorage
 */
export const themeMiddleware = (store: any) => (next: any) => (action: any) => {
  // Ejecutar la acción primero
  const result = next(action)

  // Si la acción es relacionada con el tema, sincronizar
  if (action.type?.startsWith('theme/')) {
    const theme = store.getState().theme.mode

    // 1. Actualizar clase en <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // 2. Guardar en localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  return result
}
