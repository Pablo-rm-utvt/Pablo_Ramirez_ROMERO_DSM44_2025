import axios from "axios";

export const myApi = axios.create({
    baseURL: 'http://192.168.86.243:3000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});