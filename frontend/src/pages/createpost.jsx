import { useNavigate } from "react-router-dom"
import api from "../api/api"
import { useState,useEffect } from "react"

function CreatePost() {

  const navigate = useNavigate()

  const [title,setTitle] = useState("")
  const [content, setContent] = useState("")

  async function getName() {
    try {
      await api.get("/user-detail")
    }
    catch (err) {
      navigate("/dashboard")
    }
  }
  useEffect(() => {
    getName()
  }, []);

  async function handleSubmit(e){
    e.preventDefault()
    try{
      await api.post("/posts", {
        title,
        content,
      })
      navigate("/dashboard")
    }
    catch(err){
      alert("failed to create post")
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-200">
      <div className="m-5 text-5xl font-bold">
        Write Your Blog:
      </div>

      <form className="flex-1 m-10 flex flex-col gap-2  items-center" onSubmit={e=>handleSubmit(e)}>
        <label htmlFor="title" className=" text-2xl ">Title:</label>
        <input type="text" 
        name="title" 
        id="title" 
        value={title}
        className="bg-white rounded-sm w-100 h-10 border-1 p-2 mb-5 font-bold"
        onChange={e=>setTitle(e.target.value)}
        required
        />

        <label htmlFor="content" className=" text-2xl ">Content:</label>
        <textarea  
        name="content" 
        id="content" 
        value={content}
        className="bg-white rounded-xl md:w-[60%] md:h-[80%] border-1 p-5"
        onChange={e=>setContent(e.target.value)}
        required
        />
        <button className="text-white mt-6 " type="submit">Submit</button>

      </form>
    </div>
  )
}

export default CreatePost