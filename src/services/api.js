import axios from 'axios';

const api = axios.create({
    baseURL: 'https://5b7570f8deca780014ec9f86.mockapi.io/v1'
});


export default api;