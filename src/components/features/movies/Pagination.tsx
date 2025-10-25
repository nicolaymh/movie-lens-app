/**
 * @file Controles de paginación reutilizables
 */

import { Button } from '../../ui/Button'

interface PaginationProps {
  currentPage: number
  onPrevious: () => void
  onNext: () => void
}

/**
 * Componente de paginación con botones anterior/siguiente
 */
export function Pagination({ currentPage, onPrevious, onNext }: PaginationProps) {
  return (
    <div className="flex justify-center items-center mt-8 gap-4">
      <Button
        onClick={onPrevious}
        disabled={currentPage === 1}
        variant="secondary"
      >
        ← Anterior
      </Button>

      <span className="text-sm text-gray-700 dark:text-gray-300">
        Página {currentPage}
      </span>

      <Button onClick={onNext} variant="secondary">
        Siguiente →
      </Button>
    </div>
  )
}
