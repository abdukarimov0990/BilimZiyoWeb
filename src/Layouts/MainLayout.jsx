import React from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router'

const MainLayout = () => {
  const location = useLocation();
  
  // Sheader ko'rinadigan sahifalar ro'yxati

  return (
    <div className='min-h-screen flex flex-col font-Main'>
      <Header/>
      <main className='grow mt-[100px]'>
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout