/**
 * @file Grid de películas con animaciones
 */

import { motion } from 'framer-motion'
import type { Movie } from '../../../types/movie.types'
import { MovieCard } from '../../ui/MovieCard'
import { containerVariants } from '../../../utils/animations'

interface MovieGridProps {
  movies: Movie[]
  page: number
}

/**
 * Grid responsivo de películas con animación staggered
 */
export function MovieGrid({ movies, page }: MovieGridProps) {
  return (
    <motion.div
      key={page}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </motion.div>
  )
}
