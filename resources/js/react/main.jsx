import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom'
import Login from "./paginas/Login.jsx"
import Register from "./paginas/Register.jsx"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import ErrorPage from './paginas/ErrorPage.jsx'
import MyCalendar from './paginas/MyCalendar.jsx'
import Tarjetas from './paginas/Tarjetas.jsx'
import MisReservas from './paginas/Reservas.jsx'

function AppLayout(){
  return<>
    <Header></Header>
    <Outlet></Outlet>
    <Footer></Footer>
  </>
}

const router= createBrowserRouter([
  {
    errorElement:<ErrorPage></ErrorPage>,
    element: <AppLayout></AppLayout>,
    children:[{
      path:"/ProyectoRestaurante/public/",
      element:<App/>
    },
    {
      path:"/ProyectoRestaurante/public/login",
      element:<Login/>
    },
    {
      path:"/ProyectoRestaurante/public/register",
      element:<Register/>
    },
    {
      path:"/ProyectoRestaurante/public/calendar",
      element:<MyCalendar/>
    },
    {
      path:"/ProyectoRestaurante/public/tarjetas",
      element:<Tarjetas/>
    },
    {
      path:"/ProyectoRestaurante/public/reservas",
      element:<MisReservas/>
    },
  ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode >  
  <RouterProvider router={router}></RouterProvider>
</React.StrictMode>
)
