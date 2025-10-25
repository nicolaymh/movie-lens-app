/**
 * @file Componente de spinner de carga reutilizable
 */

interface LoadingSpinnerProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

const sizeClasses = {
  small: 'h-6 w-6 border-2',
  medium: 'h-12 w-12 border-4',
  large: 'h-16 w-16 border-4',
}

/**
 * Spinner de carga con mensaje opcional
 */
export function LoadingSpinner({
  message = 'Cargando...',
  size = 'medium'
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
      <div
        className={`animate-spin ${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full mb-4`}
      />
      {message && <p className="text-sm">{message}</p>}
    </div>
  )
}
