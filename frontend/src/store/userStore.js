import { create } from "zustand"
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set)=>({
      fullname: "",
      username: "",
      accessToken: null,
      setUser: (fullname,username,accessToken)=> set({fullname:fullname,username:username,accessToken:accessToken}),
      setAccessToken: (accessToken)=>set({accessToken}),
      clearUser: ()=>set({fullname:"" , username:"", accessToken:null})
    }),
    {
      name: "user-storage"
    }
  )
)