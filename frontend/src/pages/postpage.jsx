import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useOutletContext } from "react-router-dom";

function Postpage() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { fullname, username } = useOutletContext();
  const [post, setPost] = useState({})
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(true)

  async function getPost() {
    try {
      const res = await api.get(`/post/${id}`)
      setPost(res.data)
      setLoaded(false)
    }
    catch (err) {
      setError(err.message || "Failed to fetch post")
      setLoaded(false)
      console.log(err)
    }
  }

  useEffect(() => {
    getPost()
  }, [id]);

  async function handleDelete(){
    try{
      await api.delete(`/post/${id}`)
      navigate("/dashboard")
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
      {
        loaded === true && (
          <div className="flex-1 text-4xl flex justify-center items-center">
            Loading...
          </div>
        )
      }
      {
        loaded === false && (
          <div className="w-[90%] mt-16 ml-10">
            {error ? (
              <div className="text-red-500 text-lg font-semibold">{error}</div>
            ) : (
              <div>
                <div>


                  <h1 className="font-bold text-4xl mb-6">{post.title}</h1>
                  <div className="text-gray-800 mb-8 whitespace-pre-line">
                    {post.content}
                  </div>
                  <div className="flex justify-between items-center text-base text-gray-500 mt-10 border-t pt-6">
                    <span>Author: {post.author.fullname}</span>
                    <span>
                      Created: {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {
                    username === post.author.username && (
                      <div className="flex justify-center items-center m-30">
                        <button className=" bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 "
                          onClick={handleDelete}
                        >
                          delete
                        </button>
                      </div>
                    )
                  }
                </div>

              </div>
            )}
          </div>
        )
      }
    </>
  )
}
export default Postpage