import axios from "axios"

let accessToken = localStorage.getItem("accessToken") || null

const api = axios.create({
    baseURL: "/api",
    withCredentials: true
})

api.interceptors.request.use(config => {
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`
    return config;
})

api.interceptors.response.use(
    response => response,
    async (error) => {

        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("/api/refresh",{
                    withCredentials:true
                });
                accessToken = res.data.accessToken;
                localStorage.setItem("accessToken",accessToken)
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return api(accessToken)

            } 
            catch (err) {
                console.error("Refresh token failed", err.response?.data);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error)
    }
)

export const  setAccessToken = (token)=>{
    accessToken = token;
    localStorage.setItem("accessToken", token);
}

export default api