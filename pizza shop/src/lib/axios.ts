import { env } from "@/env"
import axios from "axios"

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true,
})

if(env.VITE_ENABLE_API_DELAY){
    api.interceptors.request.use(async args => {
        await new Promise(resolve => setTimeout(resolve, Math.round(Math.random() * 1000 * 3)))
        
        return args
    })
}