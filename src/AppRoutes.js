import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home.js';
import Encuesta from './components/Encuesta/encuesta.js'; // Asegúrate de que el archivo se llame Encuesta.js
import Administrativo from './components/Administrativos/administrativos.js'; // Asegúrate de que el archivo se llame Administrativo.js
import Busqueda from './components/Administrativos/Busqueda.js'; // Asegúrate de que el archivo se llame Busqueda.js

const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Verifica si hay un token en localStorage
};

function AppRoutes() {
  return (
    <Router>
      <div className='Routes'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/encuesta"
            element={isAuthenticated() ? <Encuesta /> : <Navigate to="/" />} // Redirigir a Home si no está autenticado
          />
          <Route
            path="/administrativos"
            element={isAuthenticated() ? <Administrativo /> : <Navigate to="/" />} // Redirigir a Home si no está autenticado
          />
          <Route
            path="/busqueda"
            element={isAuthenticated() ? <Busqueda /> : <Navigate to="/" />} // Redirigir a Home si no está autenticado
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
