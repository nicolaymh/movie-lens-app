/**
 * Página de detalle de película.
 * -------------------------------------------------
 * Muestra la información completa de una película
 * obtenida desde la API de TMDB por su ID.
 */

import { useParams, Link } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../api/moviesApi'

export function MovieDetail() {
    // Obtenemos el ID desde la URL
    const { id } = useParams<{ id: string }>()

    // Consulta a la API según el ID recibido
    const { data: movie, isLoading, error } = useGetMovieByIdQuery(Number(id))

    // Muestra un estado de carga mientras llegan los datos
    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
                Cargando información...
            </div>
        )

    // Muestra un mensaje de error si algo falla
    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                No se pudo cargar la información 😞
            </div>
        )

    // Si no hay datos (caso raro)
    if (!movie) return null

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            {/* Botón para volver al listado */}
            <Link
                to="/"
                className="inline-block mb-6 text-blue-500 hover:underline text-sm"
            >
                ← Volver al listado
            </Link>

            {/* Contenedor principal del detalle */}
            <div className="flex flex-col md:flex-row items-start gap-6 max-w-5xl mx-auto">
                {/* Imagen grande del póster */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-lg"
                />

                {/* Información general */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

                    {/* Calificación */}
                    <p className="text-yellow-400 mb-2">
                        ⭐ {movie.vote_average.toFixed(1)} / 10
                    </p>

                    {/* Géneros */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres?.map((genre: any) => (
                            <span
                                key={genre.id}
                                className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {movie.overview || 'Sin descripción disponible.'}
                    </p>

                    {/* Información adicional */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Fecha de estreno: {movie.release_date}
                    </p>
                </div>
            </div>
        </div>
    )
}
