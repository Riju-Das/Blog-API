import App from './App'
import { Navigate } from 'react-router-dom'
import Dashboard from "./pages/dashboard"
import { redirect } from 'react-router-dom';
import LoginPage from './pages/login';
import Register from './pages/register';
import CreatePost from './pages/createpost';
import Postpage from './pages/postpage';
const Router = [
    {
        path: "/",
        element: < App />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "post/:id",
                element: <Postpage/>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/create-post",
        element: <CreatePost/>
    }
]

export default Router