/**
 * @file Configuración del store global con Redux Toolkit (RTK).
 * Este archivo centraliza la gestión del estado de la aplicación,
 * integrando RTK Query para el manejo eficiente de datos remotos (API caching).
 */

import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from '../api/moviesApi'

/**
 * Configura el store principal de Redux Toolkit.
 *
 * - `moviesApi.reducerPath`: espacio de nombres del slice generado por RTK Query.
 * - `moviesApi.reducer`: reducer que gestiona el estado del cache de la API.
 * - `moviesApi.middleware`: middleware que intercepta las peticiones y
 *   habilita características como refetch automático y actualización optimista.
 */
export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
})

/**
 * Tipos inferidos para el uso seguro con TypeScript.
 * - `RootState`: representa la forma completa del estado global.
 * - `AppDispatch`: tipado del método dispatch para despachar acciones correctamente.
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
