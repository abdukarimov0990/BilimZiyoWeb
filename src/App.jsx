import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import MainLayout from './Layouts/MainLayout'
import Home from './pages/Home'
import School from './pages/School'
import StudyCenter from './pages/StudyCenter'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route element={<MainLayout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/school' element={<School/>}/>
      <Route path='/studycenter' element={<StudyCenter/>}/>
    </Route>
    )
  )
  return (
   <RouterProvider router={router}/>
  )
}

export default App
