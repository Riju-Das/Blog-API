import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar.jsx'
import { Outlet } from 'react-router-dom'
import api, { setAccessToken } from './api/api.js'

function App() {

  const [fullname, setFullname] = useState("")

  async function getName() {
    try {
      const res = await api.get("/user-detail")
      setFullname(res.data.fullname)
    }
    catch (err) {
      setFullname("")
    }
  }

  useEffect(() => {
    getName()
    
  },[]);

  const [data, setData] = useState("")


  return (
    <>
      <nav>
        <Navbar fullname={fullname} />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
