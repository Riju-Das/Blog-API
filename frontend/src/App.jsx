import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/navbar'
import  { Outlet } from 'react-router-dom'


function App() {

  const [data, setData] = useState("")


  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
