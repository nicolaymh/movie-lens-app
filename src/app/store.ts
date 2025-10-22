/**
 * Configuración central de Redux Toolkit.
 * ---------------------------------------
 * Aquí se crea el store global de la aplicación y se registran
 * los reducers y servicios (RTK Query).
 */

import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from '../api/moviesApi' // se conectará después

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer, // se añadirá luego
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
})

// Tipos inferidos del store para usar en los hooks personalizados
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
