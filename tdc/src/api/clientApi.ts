import axios from "axios";

export const api = axios.create({
    baseURL: "https://tdc-assig.onrender.com/api"
})

