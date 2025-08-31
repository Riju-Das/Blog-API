import App from './App'
import { Navigate } from 'react-router-dom'
import Dashboard from "./pages/dashboard"
const Router = [
    {
        path:"/",
        element: < App/>,
        children: [
            {
                path:"",
                element: <Navigate to="dashboard"/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>
            }
        ]
    },

]

export default Router