// src/Api/AxiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://encuestasatisfaccionback-end.onrender.com', // Cambia el puerto y la URL si es necesario
});

export default instance;
