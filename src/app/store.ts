/**
 * @file Configuración del store global con Redux Toolkit.
 * Registra los reducers y la capa de servicios de RTK Query.
 */

import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from '../api/moviesApi'

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
})

// Tipos inferidos para usar con los hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
