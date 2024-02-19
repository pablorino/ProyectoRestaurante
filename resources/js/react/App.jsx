import { useState } from 'react'

import './App.css'
import NavIcon from './components/NavIcon'
import Home from './components/Home'
import About from './components/About'
import Recipe from './components/Recipe'
import Contact from './components/Contact'
import {Routes,Route, Link, NavLink} from 'react-router-dom'
import Login from './paginas/Login'
import Register from './paginas/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <NavIcon></NavIcon>
        <Home></Home>
        <About></About>
        <Recipe></Recipe>
        <Contact></Contact>
      </div>
    </>
  )
}

export default App