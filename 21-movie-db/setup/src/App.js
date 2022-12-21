import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'

function App() {
  return <Routes>
    <Route path='/' element={<Home></Home>} ></Route>
    <Route path='movies/:id' element={<Movie></Movie>}></Route>
  </Routes>
}

export default App
