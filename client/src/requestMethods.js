import axios from "axios";
import env from "react-dotenv";


const API_URL = process.env.API_URL

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