/**
 * Componente raíz de la aplicación.
 * -------------------------------------------------
 * Define la estructura principal de rutas con React Router.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'
import { Header } from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <Header />
        <main className="pt-20 px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}


export default App
