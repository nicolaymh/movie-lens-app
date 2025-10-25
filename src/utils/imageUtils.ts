/**
 * @file Utilidades para manejo de imágenes de TMDB
 */

import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from './constants'

/**
 * Genera la URL completa de un poster de película
 * @param path - Ruta del poster desde la API
 * @param size - Tamaño deseado (small, medium, large, original)
 * @returns URL completa de la imagen
 */
export function getPosterUrl(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.poster = 'medium'
): string {
  if (!path) return '/placeholder-poster.png'
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.poster[size]}${path}`
}

/**
 * Genera la URL completa de un backdrop de película
 * @param path - Ruta del backdrop desde la API
 * @param size - Tamaño deseado (small, medium, large, original)
 * @returns URL completa de la imagen
 */
export function getBackdropUrl(
  path: string | null,
  size: keyof typeof IMAGE_SIZES.backdrop = 'medium'
): string {
  if (!path) return '/placeholder-backdrop.png'
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop[size]}${path}`
}
