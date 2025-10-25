/**
 * @file Componente de mensaje de error reutilizable
 */

interface ErrorMessageProps {
  message?: string
}

/**
 * Mensaje de error centrado en pantalla
 */
export function ErrorMessage({
  message = 'Ocurrió un error. Por favor intenta de nuevo.',
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen text-red-500">
      <div className="text-center">
        <p className="text-lg">{message}</p>
      </div>
    </div>
  )
}
