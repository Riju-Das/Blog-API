import { useState } from "react";
import { Link } from "react-router-dom"
import api, { setAccessToken } from "../api/api"
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    if (username.length < 3) {
      return setError("Username Should be more than 3 letters")
    }
    if (password.length < 6) {
      return setError("Password Should be more than 6 characters")
    }
    try {
      const res = await api.post("/login", {
        username,
        password
      })
      setAccessToken(res.data.accessToken)
      setError("")
      navigate("/")
    }

    catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      }
      else {
        setError("login failed")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl ">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {
            error && (<div className="w-full text-red-600 flex items-center justify-center">
              {error}
            </div>)
          }

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>

          <Link
            to="/register"
            className=" w-full h-full flex justify-center font-medium text-indigo-600 text-md"
          >
            Dont have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;