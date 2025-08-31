import App from './App'
import { Navigate } from 'react-router-dom'

const Router = [
    {
        path:"/",
        element: <Navigate to={"/dashboard"}/>
    },
    {
        path: "/dashboard",
        element: <App/>
    }
]

export default Router