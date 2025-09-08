import { useEffect, useState } from "react"
import api from "../api/api";

function Dashboard() {
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

  return (
    <>
      <div>
        {
          isError && (
            <div>Error</div>
          )
        }
        {
          !loaded && <div>Loading....</div>
        }
        {
          loaded && !isError && posts.length === 0 && (
            <div>
              Be the first to post
            </div>
          )
        }
      </div>
    </>
  )
}

export default Dashboard