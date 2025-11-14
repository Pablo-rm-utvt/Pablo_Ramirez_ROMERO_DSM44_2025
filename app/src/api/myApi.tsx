import axios from "axios";

export const myApi = axios.create({
    baseURL: 'http://10.45.20.13:3000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});