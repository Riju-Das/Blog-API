import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar.jsx'
import { Outlet } from 'react-router-dom'
import api, { setAccessToken } from './api/api.js'

function App() {

  const [fullname, setFullname] = useState("")
  const [username , setUsername] = useState("")

  async function getName() {
    try {
      const res = await api.get("/user-detail")
      setFullname(res.data.fullname)
      setUsername(res.data.username)
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
    <div className='h-screen flex flex-col'>
      <nav>
        <Navbar fullname={fullname} />
      </nav>
      <main className=' flex flex-col flex-1'>
        <Outlet context={{fullname,username}} />
      </main>
    </div>
  )
}

export default App
