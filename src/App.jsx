import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import MainLayout from './Layouts/MainLayout'
import StudyCenter from './pages/StudyCenter'
import IELTSForm from "./pages/IELTSForm";

import { LanguageProvider } from './context/LanguageContext'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout/>}>
        <Route path="mock" element={<IELTSForm />} />      
        <Route index path='/' element={<StudyCenter/>}/>
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
