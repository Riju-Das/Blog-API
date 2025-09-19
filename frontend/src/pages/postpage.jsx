import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useOutletContext } from "react-router-dom";

function Postpage() {
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
                  <div className="text-gray-800 mb-8">
                    {post.content}
                  </div>
                  <div className="flex justify-between items-center text-base text-gray-500 mt-10 border-t pt-6">
                    <span>Author: {post.author.fullname}</span>
                    <span>
                      Created: {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                {
                  username===post.author.username && (
                    <>
                      HELLO
                    </>
                  )
                }
              </div>
            )}
          </div>
        )
      }
    </>
  )
}
export default Postpage