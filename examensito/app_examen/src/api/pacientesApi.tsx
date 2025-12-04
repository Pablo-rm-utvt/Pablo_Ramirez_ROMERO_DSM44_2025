import axios from "axios";

export const pacientesApi = axios.create({
    baseURL: "http://192.168.151.243:3000/api"
});
