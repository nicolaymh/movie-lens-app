import { motion } from 'framer-motion'
import { FeaturedCarousel } from '../components/features/carousel/FeaturedCarousel'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { MovieGrid } from '../components/features/movies/MovieGrid'
import { Pagination } from '../components/features/movies/Pagination'
import { useMovies } from '../hooks/useMovies'
import { pageTransitionLeft } from '../utils/animations'

export default function Home() {
    const { movies, currentPage, isLoading, error, nextPage, prevPage } = useMovies()

    if (isLoading) return <LoadingSpinner message="Cargando películas..." />

    if (error) return <ErrorMessage message="Error al cargar las películas" />

    return (
        <motion.div
            {...pageTransitionLeft}
            transition={{ duration: 0.3 }}
            className="min-h-screen p-6"
        >
            <div className="max-w-6xl mx-auto mb-10">
                <FeaturedCarousel />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                Películas populares
            </h1>

            <MovieGrid movies={movies} page={currentPage} />

            <Pagination
                currentPage={currentPage}
                onPrevious={prevPage}
                onNext={nextPage}
            />
        </motion.div>
    )
}
