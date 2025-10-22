import { useGetPopularMoviesQuery } from '../api/moviesApi'
import { Link } from 'react-router-dom'
import { FeaturedCarousel } from '../components/FeaturedCarousel'
import { motion } from 'framer-motion'

export function Home() {
    const { data, isLoading, error } = useGetPopularMoviesQuery(1)

    if (isLoading)
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Cargando películas...
            </h1>

            {/* Cuadrícula de skeletons */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden animate-pulse"
                    >
                        {/* Imagen placeholder */}
                        <div className="w-full h-80 bg-gray-300 dark:bg-gray-700" />

                        {/* Texto placeholder */}
                        <div className="p-3 space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                Error al cargar las películas 😞
            </div>
        )

    // Variantes de animación para el contenedor y las tarjetas
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Pequeño retardo entre tarjetas
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            {/* Carrusel superior */}
            <div className="max-w-6xl mx-auto mb-10">
                <FeaturedCarousel />
            </div>

            {/* Título principal */}
            <h1 className="text-3xl font-bold mb-6 text-center">
                Películas populares
            </h1>

            {/* Cuadrícula animada de películas */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
                {data?.results.map((movie: any) => (
                    <motion.div
                        key={movie.id}
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                        <Link
                            to={`/movie/${movie.id}`}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden block"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="p-3">
                                <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
                                <p className="text-xs text-gray-500">
                                    ⭐ {movie.vote_average.toFixed(1)} —{' '}
                                    {movie.release_date?.slice(0, 4)}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
