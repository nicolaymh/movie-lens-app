import { useState } from 'react'
import { useGetPopularMoviesQuery } from '../api/moviesApi'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FeaturedCarousel } from '../components/FeaturedCarousel'

export function Home() {
    const [page, setPage] = useState(1)

    // ✅ RTK Query hook con opción de refetch
    const { data, isFetching, isLoading, error } = useGetPopularMoviesQuery(page, {
        refetchOnMountOrArgChange: true,
    })

    // ✅ Mostrar indicador de carga mientras se actualiza
    if (isLoading || isFetching)
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
                Cargando películas...
            </div>
        )

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                Error al cargar las películas 😞
            </div>
        )

    // ✅ Variantes de animación
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    const nextPage = () => setPage((p) => p + 1)
    const prevPage = () => setPage((p) => Math.max(p - 1, 1))

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
            <div className="max-w-6xl mx-auto mb-10">
                <FeaturedCarousel />
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">Películas populares</h1>

            {/* ✅ Cuadrícula animada */}
            <motion.div
                key={page} // <-- 👈 CLAVE IMPORTANTE: fuerza re-render al cambiar de página
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
                                    ⭐ {movie.vote_average.toFixed(1)} — {movie.release_date?.slice(0, 4)}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* ✅ Controles de paginación */}
            <div className="flex justify-center items-center mt-8 gap-4">
                <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                    ← Anterior
                </button>

                <span className="text-sm text-gray-700 dark:text-gray-300">Página {page}</span>

                <button
                    onClick={nextPage}
                    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                    Siguiente →
                </button>
            </div>
        </div>
    )
}
