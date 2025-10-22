/**
 * Componente raíz de la aplicación.
 * -------------------------------------------------
 * Define la estructura principal de rutas con React Router.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal: listado de películas */}
        <Route path="/" element={<Home />} />

        {/* Página de detalle: información completa de una película */}
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
