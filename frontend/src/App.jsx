import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/navbar'


function App() {

  const [data, setData] = useState("")


  return (
    <>
      <nav>
        <Navbar />
      </nav>
    </>
  )
}

export default App
