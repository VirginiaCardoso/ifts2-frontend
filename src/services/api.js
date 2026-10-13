import axios from 'axios';

// Configuramos la URL base apuntando al servidor local de Node.js
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export default api;