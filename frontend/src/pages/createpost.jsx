import { useNavigate } from "react-router-dom"
import api from "../api/api"
import { useState,useEffect } from "react"

function CreatePost() {

  const navigate = useNavigate()

  async function getName() {
    try {
      const res = await api.get("/user-detail")
    }
    catch (err) {
      navigate("/dashboard")
    }
  }
  useEffect(() => {
    getName()
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-200">
      <div className="m-5 text-5xl font-bold">
        Write Your Blog:
      </div>
      <form className="flex-1 m-10 flex flex-col gap-2  items-center">
        <label htmlFor="title" className=" text-2xl ">Title:</label>
        <input type="text" name="title" id="title" className="bg-white rounded-sm w-100 h-10 border-1 p-2 mb-5"/>

        <label htmlFor="content" className=" text-2xl ">Content:</label>
        <textarea  name="content" id="content" className="bg-white rounded-xl w-[80%] h-[80%] border-1 p-5"/>

      </form>
    </div>
  )
}

export default CreatePost