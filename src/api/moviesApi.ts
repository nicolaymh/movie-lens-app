/**
 * @file Servicio de películas con RTK Query.
 * Define los endpoints para consumir la API de TMDB (The Movie Database)
 * y gestiona automáticamente el cacheo, la sincronización y los estados
 * de carga y error.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/** URL base de la API de TMDB */
const BASE_URL = 'https://api.themoviedb.org/3'

/**
 * Definición del servicio de API con RTK Query.
 *
 * RTK Query genera automáticamente hooks para consumir endpoints declarados
 * y maneja la caché de forma inteligente (revalidación, refetching, deduplicación).
 */
export const moviesApi = createApi({
    /** Espacio de nombres único dentro del store de Redux */
    reducerPath: 'moviesApi',

    /**
     * Configura el cliente base de RTK Query usando fetch.
     * Aquí se agrega la API key al header Authorization
     * para autenticar todas las peticiones hacia TMDB.
     */
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY
            headers.set('Authorization', `Bearer ${apiKey}`)
            headers.set('accept', 'application/json')
            return headers
        },
    }),

    /**
     * Definición de los endpoints disponibles.
     * Cada endpoint genera automáticamente un hook con su propio
     * manejo de estado (isLoading, error, data, etc.).
     */
    endpoints: (builder) => ({
        /**
         * Endpoint: Obtener películas populares.
         * - Parámetro opcional `page` para la paginación.
         * - Respuesta en idioma español.
         */
        getPopularMovies: builder.query({
            query: (page = 1) => `/movie/popular?language=es-ES&page=${page}`,
        }),

        /**
         * Endpoint: Obtener el detalle de una película por su ID.
         * Incluye título, sinopsis, géneros y demás metadatos.
         */
        getMovieById: builder.query({
            query: (id: number) => `/movie/${id}?language=es-ES`,
        }),
    }),
})

/**
 * Exportación de hooks generados automáticamente por RTK Query.
 * Permiten consumir los endpoints directamente en los componentes React.
 *
 * @example
 * const { data, isLoading } = useGetPopularMoviesQuery(1)
 */
export const { useGetPopularMoviesQuery, useGetMovieByIdQuery } = moviesApi
