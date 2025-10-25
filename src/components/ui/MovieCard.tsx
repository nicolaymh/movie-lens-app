/**
 * @file Tarjeta de película reutilizable
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Movie } from '../../types/movie.types'
import { getPosterUrl } from '../../utils/imageUtils'
import { itemVariants, springTransition } from '../../utils/animations'

interface MovieCardProps {
  movie: Movie
}

/**
 * Tarjeta individual de película con hover effect
 */
export function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      transition={springTransition}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 rounded-lg shadow overflow-hidden block"
      >
        <img
          src={getPosterUrl(movie.poster_path, 'large')}
          alt={movie.title}
          className="w-full h-72 sm:h-80 object-cover"
        />
        <div className="p-3">
          <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ⭐ {movie.vote_average.toFixed(1)} — {movie.release_date?.slice(0, 4)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
