import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from './components/Layout'
import { AnimatePresence } from 'framer-motion'

const Home = lazy(() => import('./pages/Home'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))

function App() {
  const location = useLocation()

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
          Cargando contenido...
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default App
