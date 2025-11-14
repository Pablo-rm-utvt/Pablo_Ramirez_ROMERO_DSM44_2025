import axios from "axios";

export const clinicaApi = axios.create({
    baseURL: 'http://10.45.20.13:3000',  // Ajusta esta IP a la de tu servidor
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});