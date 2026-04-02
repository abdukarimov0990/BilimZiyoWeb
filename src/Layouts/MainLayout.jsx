import React from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router'

const MainLayout = () => {
  const location = useLocation();

  // Header ko'rinmasligi kerak bo'lgan yo'llar
  const hideHeaderRoutes = ['/mock', '/thankyou'];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div className='min-h-screen flex flex-col font-Main'>
      {showHeader && <Header />}
      <main className='grow mt-[100px]'>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout