import axios from "axios";
import env from "react-dotenv";

const API_URL = env.API_URL

console.log("env", env)

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL:API_URL,
})

export const userRequest = axios.create({
    baseURL:API_URL,
    headers:{token:`Bearer ${TOKEN}`}
})