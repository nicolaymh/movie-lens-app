/**
 * Página principal: listado de películas populares.
 * -------------------------------------------------
 * Consume el endpoint de TMDB usando RTK Query y
 * muestra las películas en una cuadrícula responsive.
 */

import { useGetPopularMoviesQuery } from '../api/moviesApi'
import { Link } from 'react-router-dom'

export function Home() {
    // Consulta a la API (página 1 por defecto)
    const { data, isLoading, error } = useGetPopularMoviesQuery(1)

    // Muestra mensaje de carga mientras se obtienen los datos
    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
                Cargando películas...
            </div>
        )

    // Muestra mensaje de error si la solicitud falla
    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                Error al cargar las películas 😞
            </div>
        )

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            {/* Título principal */}
            <h1 className="text-3xl font-bold mb-6 text-center">
                Películas populares
            </h1>

            {/* Cuadrícula de películas */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {data?.results.map((movie: any) => (
                    <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition-transform overflow-hidden"
                    >
                        {/* Imagen del póster */}
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-80 object-cover"
                        />

                        {/* Información básica */}
                        <div className="p-3">
                            <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
                            <p className="text-xs text-gray-500">
                                ⭐ {movie.vote_average.toFixed(1)} —{' '}
                                {movie.release_date?.slice(0, 4)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
