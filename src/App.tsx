import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MovieDetail } from './pages/MovieDetail'
import { Layout } from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
