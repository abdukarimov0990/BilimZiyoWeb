import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import MainLayout from './Layouts/MainLayout'
import StudyCenter from './pages/StudyCenter'
import Ielts from './pages/Ielts'

import { LanguageProvider } from './context/LanguageContext'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout/>}>
        <Route path='/' element={<StudyCenter/>}/>
        <Route path='/ielts' element={<Ielts/>}/>
        
      </Route>
    )
  )
  
  return (
    <LanguageProvider>
      <RouterProvider router={router}/>
    </LanguageProvider>
  )
}

export default App
