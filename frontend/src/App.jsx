import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar.jsx'
import { Outlet } from 'react-router-dom'
import api from './api/api.js'
import { useUserStore } from './store/userStore.js'

function App() {

  return (
    <div className='h-screen flex flex-col'>
      <nav>
        <Navbar />
      </nav>
      <main className=' flex flex-col flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
