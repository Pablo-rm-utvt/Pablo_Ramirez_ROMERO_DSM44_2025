import axios from "axios";

export const pacientesApi = axios.create({
    baseURL: "http://192.168.100.12:3000/api"
});
