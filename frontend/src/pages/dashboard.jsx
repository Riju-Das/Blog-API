import { useEffect, useState } from "react"
import api from "../api/api";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {

  const { fullname } = useOutletContext();

  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  async function getPosts() {
    try {
      const res = await api.get("/posts")
      setPosts(res.data)
      setLoaded(true)
    }
    catch (err) {
      setIsError(true)
    }
  }
  useEffect(() => {
    getPosts()
  }, []);

  console.log(fullname)

  return (
    <>
      <div className=" flex-1 bg-gray-200">
        {
          isError && (
            <div>Error</div>
          )
        }
        {
          !loaded && <div>Loading....</div>
        }
        {
          loaded && !isError && posts.length === 0 && fullname && (
            <div className=" flex items-center justify-center gap-4 h-full w-full  flex-col">
              <div className="font-bold text-4xl">
                Be the first to post
              </div>
              <Link to="/create-post" className="bg-black rounded-4xl text-white text-2xl w-25 h-10 justify-center items-center text-center ">
                create
              </Link>
            </div>
          )
        }
        {
          loaded && !isError && fullname && (
            <div>
              
            </div>
          )
        }
      </div>
    </>
  )
}

export default Dashboard