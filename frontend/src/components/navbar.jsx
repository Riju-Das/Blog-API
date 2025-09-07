import { Link } from "react-router-dom"

function Navbar({fullname}){
  return (
    <>
      <div className="navbar-container flex h-20 bg-black w-full text-white items-center justify-center">
        <div className="inside-container w-[80%] flex items-center justify-end cursor-pointer text-2xl">
          {fullname===""?(
            <>
              <Link className="login-btn-container" to="/login">
                Login
              </Link>
            </>
          ):(
            <>
              <div className="text-cont gap-3">
                <div>
                    {fullname}
                </div>
                <Link to="/logout" className="logout-btn">
                    logout
                </Link>
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