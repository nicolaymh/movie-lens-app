/**
 * @file Custom hook para manejo de películas con paginación
 */

import { useState } from 'react'
import { useGetPopularMoviesQuery } from '../api/moviesApi'

/**
 * Hook para gestionar la obtención de películas populares con paginación
 * @returns Objeto con datos de películas, estado de carga, errores y controles de paginación
 */
export function useMovies() {
  const [page, setPage] = useState(1)

  const { data, isFetching, isLoading, error } = useGetPopularMoviesQuery(page, {
    refetchOnMountOrArgChange: true,
  })

  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(p - 1, 1))
  const goToPage = (newPage: number) => setPage(Math.max(newPage, 1))

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    currentPage: page,
    isLoading: isLoading || isFetching,
    error,
    nextPage,
    prevPage,
    goToPage,
  }
}
