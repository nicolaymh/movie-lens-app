/**
 * @file Servicio de películas con RTK Query.
 * Define los endpoints para consumir la API de TMDB.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://api.themoviedb.org/3'

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
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
        /** Obtiene una lista de películas populares */
        getPopularMovies: builder.query({
            query: (page = 1) => `/movie/popular?language=es-ES&page=${page}`,
        }),
        /** Obtiene el detalle de una película por su ID */
        getMovieById: builder.query({
            query: (id: number) => `/movie/${id}?language=es-ES`,
        }),
    }),
})

export const { useGetPopularMoviesQuery, useGetMovieByIdQuery } = moviesApi
