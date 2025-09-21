import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useUserStore } from "../store/userStore";

function Postpage() {
  const navigate = useNavigate()
  const { id } = useParams();
  const username = useUserStore(state=>state.username)
  const [post, setPost] = useState({})
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [comments, setComments] = useState([])
  const [commentBox, setCommentBox] = useState(false)
  const [comment, setComment] = useState("")


  async function getPost() {
    try {
      const res = await api.get(`/post/${id}`)
      setPost(res.data)
      setComments(res.data.comments)
      console.log(res.data.comments)
      setLoaded(true)
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

  async function handleDelete() {
    try {
      await api.delete(`/post/${id}`)
      navigate("/dashboard")
    }
    catch (err) {
      console.log(err)
    }
  }
  async function handleCommentSubmit(e) {
    e.preventDefault()
    try {
      const res = await api.post(`/post/${id}/comment`, {
        content: comment
      })
      setComment("")
      setCommentBox(false);
      getPost();
    }
    catch (err) {
      alert(err.message)
    }
  }

  async function deleteComment(id) {
    try {
      await api.delete(`/comment/${id}`)
      getPost()
    }
    catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      {
        loaded === false && (
          <div className="flex-1 text-4xl flex justify-center items-center">
            Loading...
          </div>
        )
      }
      {
        loaded === true && (
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
                      <div className="flex justify-center items-center m-5">
                        <button className=" bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 "
                          onClick={handleDelete}
                        >
                          delete
                        </button>
                      </div>
                    )
                  }
                </div>
                <div className="mt-5">
                  <div className="h-10 text-3xl font-bold mb-5">
                    Comments
                  </div>
                  {
                    commentBox ? (
                      <form className="flex flex-col gap-4" onSubmit={(e) => handleCommentSubmit(e)}>
                        <textarea
                          className="border rounded p-2 resize-none"
                          rows={3}
                          placeholder="Write your comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />
                        <div className="flex gap-4">
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Submit
                          </button>
                          <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            onClick={() => setCommentBox(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      username && (
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          onClick={() => setCommentBox(true)}
                        >
                          Add Comment
                        </button>
                      )
                    )
                  }
                  {
                    comments && comments.length > 0 && loaded === true ? (
                      <div className="my-10">
                        <ul className="space-y-6 mb-8">
                          {comments.map(comment => (
                            <li key={comment.id} className="bg-gray-100 p-4 mb-5 flex justify-between items-start">
                              <div>
                                <div className="text-gray-800 whitespace-pre-line mb-2">{comment.content}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span className="font-semibold">{comment.author?.fullname || "Unknown"}</span>
                                  <span>&middot;</span>
                                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                              </div>
                              {/* Delete button only if comment author matches logged-in user */}
                              {comment.author?.username === username && (
                                <button
                                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                  onClick={() => deleteComment(comment.id)}
                                  title="Delete comment"
                                >
                                  Delete
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-gray-400 mb-8 mt-8">
                        No comments yet
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