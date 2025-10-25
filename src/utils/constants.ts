/**
 * @file Constantes globales de la aplicación
 */

/** URL base para imágenes de TMDB */
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

/** Tamaños de imágenes disponibles */
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
}

/** Configuración del carrusel */
export const CAROUSEL_CONFIG = {
  autoplayDelay: 4000,
  maxFeaturedMovies: 8,
}

/** Temas disponibles */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

/** Clave para localStorage del tema */
export const THEME_STORAGE_KEY = 'theme'
