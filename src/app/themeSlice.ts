/**
 * @file Redux slice para el manejo del tema (claro/oscuro)
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { THEMES, THEME_STORAGE_KEY } from '../utils/constants'

interface ThemeState {
  mode: 'light' | 'dark'
}

// Función para obtener el tema inicial
const getInitialTheme = (): 'light' | 'dark' => {
  // 1. Verificar localStorage
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT) {
    return savedTheme as 'light' | 'dark'
  }

  // 2. Si no hay guardado, usar preferencia del sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Cambiar entre claro y oscuro
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    // Establecer un tema específico
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
    },
  },
})

// Exportar acciones
export const { toggleTheme, setTheme } = themeSlice.actions

// Exportar selector
export const selectTheme = (state: { theme: ThemeState }) => state.theme.mode

// Exportar reducer
export default themeSlice.reducer
