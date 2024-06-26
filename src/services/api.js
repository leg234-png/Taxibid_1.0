import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.168.151:8080/api', // Assurez-vous que cette URL est correcte
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
