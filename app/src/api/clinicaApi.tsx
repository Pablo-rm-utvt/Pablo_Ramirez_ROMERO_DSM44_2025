import axios from 'axios';

export const clinicaApi = axios.create({
    baseURL: 'http://192.168.151.243:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});