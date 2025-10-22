/**
 * @file Componente principal de la aplicación.
 * Define las rutas principales usando React Router con lazy loading.
 */

import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from './components/Layout'

/**
 * Lazy loading de páginas
 * - React cargará cada módulo solo cuando el usuario visite esa ruta.
 */
const Home = lazy(() => import('./pages/Home'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))

/** Enrutamiento principal con carga diferida */
function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
          Cargando contenido...
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
