import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import NaoEncontrada from './pages/NaoEncontrada'
import Detalhes from './pages/Detalhes'
import Busca from './pages/Busca'
import Favoritos from './pages/Favoritos'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="filmes/:id" element={<Detalhes />} />
          <Route path='busca' element={<Busca />} />
          <Route path='favoritos' element={<Favoritos />} />

          <Route path='*' element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
