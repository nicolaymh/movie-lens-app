/**
 * Servicio de películas con RTK Query.
 * --------------------------------------------------------
 * Se encarga de consumir la API pública de TMDB para
 * obtener listados y detalles de películas.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// URL base de la API de TMDB
const BASE_URL = 'https://api.themoviedb.org/3'

// Definición del servicio RTK Query
export const moviesApi = createApi({
    reducerPath: 'moviesApi', // nombre del slice dentro del store

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY
            headers.set('Authorization', `Bearer ${apiKey}`)
            headers.set('accept', 'application/json')
            return headers
        },
    }),

    endpoints: (builder) => ({
        // Endpoint: obtener películas populares
        getPopularMovies: builder.query({
            query: (page = 1) => `/movie/popular?language=es-ES&page=${page}`,
        }),

        // Endpoint: obtener detalle de una película por ID
        getMovieById: builder.query({
            query: (id: number) => `/movie/${id}?language=es-ES`,
        }),
    }),
})

// Hooks generados automáticamente por RTK Query
export const { useGetPopularMoviesQuery, useGetMovieByIdQuery } = moviesApi
