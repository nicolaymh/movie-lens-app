/**
 * @file Variantes de animación de Framer Motion centralizadas
 */

import type { Variants } from 'framer-motion'

/** Animación de contenedor con stagger para hijos */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

/** Animación de elemento hijo individual */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

/** Animación de entrada de página desde la izquierda */
export const pageTransitionLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

/** Animación de entrada de página desde la derecha */
export const pageTransitionRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

/** Animación de fade in suave */
export const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

/** Animación de menú lateral */
export const menuSlideVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.3 } },
  exit: { x: '100%', transition: { duration: 0.25 } },
}

/** Configuración de transición con spring para hover */
export const springTransition = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 15,
}
