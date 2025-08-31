import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Router from './route.jsx'
import {createBrowserRouter ,  RouterProvider} from 'react-router-dom'

const router = createBrowserRouter(Router)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
