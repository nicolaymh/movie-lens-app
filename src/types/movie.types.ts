/**
 * @file Tipos TypeScript para la aplicación de películas
 */

/** Género de una película */
export interface Genre {
  id: number
  name: string
}

/** Película individual */
export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
  genres?: Genre[]
}

/** Respuesta de la API para películas populares */
export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
