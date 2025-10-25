import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../api/moviesApi'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { Button } from '../components/ui/Button'
import { getPosterUrl } from '../utils/imageUtils'
import { pageTransitionRight } from '../utils/animations'
import type { Genre } from '../types/movie.types'

export default function MovieDetail() {
    const { id } = useParams<{ id: string }>()
    const { data: movie, isLoading, error } = useGetMovieByIdQuery(Number(id))

    if (isLoading) return <LoadingSpinner message="Cargando información..." />

    if (error) return <ErrorMessage message="No se pudo cargar la información" />

    if (!movie) return null

    return (
        <motion.div
            {...pageTransitionRight}
            transition={{ duration: 0.3 }}
            className="min-h-screen p-6"
        >
            <div className="flex flex-col md:flex-row items-start gap-6 max-w-5xl mx-auto">
                <img
                    src={getPosterUrl(movie.poster_path, 'large')}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-lg"
                />

                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-yellow-400 mb-2">⭐ {movie.vote_average.toFixed(1)} / 10</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres?.map((genre: Genre) => (
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
                        <Link to="/">
                            <Button variant="primary">
                                ← Volver al listado
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
