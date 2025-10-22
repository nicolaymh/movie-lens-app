import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../api/moviesApi'

export default function MovieDetail() {
    const { id } = useParams<{ id: string }>()
    const { data: movie, isLoading, error } = useGetMovieByIdQuery(Number(id))

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
                Cargando información...
            </div>
        )

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                No se pudo cargar la información 😞
            </div>
        )

    if (!movie) return null

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6"
        >
            <div className="flex flex-col md:flex-row items-start gap-6 max-w-5xl mx-auto">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-lg"
                />

                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-yellow-400 mb-2">⭐ {movie.vote_average.toFixed(1)} / 10</p>

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

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {movie.overview || 'Sin descripción disponible.'}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Fecha de estreno: {movie.release_date}
                    </p>

                    <div className="mt-8">
                        <Link
                            to="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-md shadow transition-colors duration-300"
                        >
                            ← Volver al listado
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
