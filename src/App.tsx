/**
 * @file Componente principal de la aplicación.
 * Define las rutas principales usando React Router.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'
import { Layout } from './components/Layout'

/** Enrutamiento principal de la aplicación */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  )
}

export default App
