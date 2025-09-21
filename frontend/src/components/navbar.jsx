import { Link } from "react-router-dom"
import api from "../api/api"
import { useUserStore } from "../store/userStore";
function Navbar() {
  const fullname = useUserStore(state => state.fullname);
  const clearUser = useUserStore(state=>state.clearUser)

  async function handleClick() {
    try {
      await api.post("/logout");

    } catch (err) {
      console.error("Logout failed:", err);
    }
    clearUser()
    window.location.reload();
  }

  return (
    <>
      <div className="navbar-container flex h-20 bg-black w-full text-white items-center justify-center">
        <Link to="/dashboard" className="text-3xl font-bold justify-start">
          BlogApi
        </Link>
        <div className="inside-container w-[80%] flex items-center justify-end  ">
          {fullname === "" ? (
            <>
              <Link className="login-btn-container cursor-pointer text-2xl" to="/login">
                Login
              </Link>
            </>
          ) : (
            <>
              <div className="text-cont gap-10 flex justify-center items-center ">
                <div className="text-2xl">
                  {fullname}
                </div>
                <button className="logout-btn cursor-pointer w-30 h-10 text-1xl flex items-center justify-center bg-[#1a1a1a]"
                  onClick={handleClick}
                >
                  logout
                </button>
              </div>
            </>
          )
          }
        </div>
      </div>
    </>
  )
}

export default Navbar