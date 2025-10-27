import React from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router'
import Sheader from '../components/Sheader'

const MainLayout = () => {
  const location = useLocation();
  
  // Sheader ko'rinadigan sahifalar ro'yxati
  const sheaderPages = ['/school', '/school/about', '/school/contact'];
  const showSheader = sheaderPages.includes(location.pathname);

  return (
    <div className='min-h-screen flex flex-col font-Main'>
      {showSheader ? <Sheader/> : <Header/>}
      <main className='grow mt-[100px]'>
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout