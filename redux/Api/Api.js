import axios from 'axios';

const BASE_URL = 'https://server.iqueuebarbers.com/~iqueue/IQBphpFiles-Dev';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

export default api;