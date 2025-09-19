import { useEffect, useState } from "react"
import api from "../api/api";
import { useOutletContext } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate()

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

  async function handlePostClick(id){
    navigate(`/post/${id}`)
  }

  console.log(fullname)

  return (
    <>
      <div className="  bg-gray-200 flex-1  flex items-center flex-col gap-20">
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
            <>
              <div className="flex flex-wrap gap-6 p-4 justify-between w-[85%] "
                
              >
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 md:w-180 h-50 cursor-pointer hover:bg-gray-50"
                    onClick={()=>handlePostClick(post.id)}
                  >
                    <div className="font-bold text-2xl mb-2">{post.title}</div>
                    <div className="text-gray-700 mb-4 line-clamp-1"  >{post.content}</div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                      <span>Author: {post.author.fullname}</span>
                      <span>
                        Created: {new Date(post.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            
              <Link to="/create-post" className="bg-black rounded-4xl text-white mb-10 text-2xl w-25 h-10 justify-center items-center text-center ">
                create
              </Link>
            
            </>
          )
        }
      </div>
    </>
  )
}

export default Dashboard