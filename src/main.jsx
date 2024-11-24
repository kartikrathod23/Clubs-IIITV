import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx' 
import Dashboard from './pages/Dashboard.jsx'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Profile from './pages/Profile.jsx'
import Clubs from './pages/clubs.jsx'
import Commitees from './pages/commitees.jsx'
import Events from './pages/Events.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'


const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/clubs' element={<Clubs/>}/>
      <Route path='/committees' element={<Commitees/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
