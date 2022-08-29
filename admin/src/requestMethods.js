import axios from "axios";

const API_URL = "http://localhost:5000/api/"

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