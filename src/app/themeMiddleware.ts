/**
 * @file Middleware para sincronizar el tema con el DOM y localStorage
 *
 * Este middleware escucha cambios en el estado del tema y:
 * 1. Agrega/quita la clase 'dark' del elemento <html>
 * 2. Guarda la preferencia en localStorage
 */

import type { Middleware } from '@reduxjs/toolkit'
import { THEME_STORAGE_KEY } from '../utils/constants'

interface ThemeState {
  mode: 'light' | 'dark'
}

/**
 * Middleware que sincroniza el tema de Redux con el DOM y localStorage
 */
export const themeMiddleware: Middleware = (store) => (next) => (action) => {
  // Ejecutar la acción primero
  const result = next(action)

  // Si la acción es relacionada con el tema, sincronizar
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const actionType = action.type as string

    if (actionType.startsWith('theme/')) {
      const state = store.getState() as { theme: ThemeState }
      const theme = state.theme.mode

      // 1. Actualizar clase en <html>
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      // 2. Guardar en localStorage
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }

  return result
}
