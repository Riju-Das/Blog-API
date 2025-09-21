import axios from "axios"
import { useUserStore } from "../store/userStore"



const api = axios.create({
    baseURL: "/api",
    withCredentials: true
})

api.interceptors.request.use(config => {
    const accessToken = useUserStore.getState().accessToken;
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
                const res = await axios.post("/api/refresh", {}, {
                    withCredentials: true
                });
                const setAccessToken = useUserStore.getState().setAccessToken;
                setAccessToken(res.data.accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
                return api(originalRequest)

            }
            catch (err) {
                console.error("Refresh token failed", err.response?.data);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error)
    }
)


export default api