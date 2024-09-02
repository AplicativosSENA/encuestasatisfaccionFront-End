// src/Api/AxiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Cambia el puerto y la URL si es necesario
});

export default instance;
