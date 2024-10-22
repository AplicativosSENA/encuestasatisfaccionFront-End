import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home.js';
import Encuesta from './components/Encuesta/encuesta.js'; // Asegúrate de que el archivo se llame Encuesta.js
import Administrativo from './components/Administrativos/administrativos.js'; // Asegúrate de que el archivo se llame Administrativo.js
import Busqueda from './components/Administrativos/Busqueda.js'; // Asegúrate de que el archivo se llame Busqueda.js
import Coordinacion from './components/Administrativos/Coordinacion.js'; // Asegúrate de que el archivo se llame Coordinacion.js
import Artes_Escenicas from './components/Administrativos/Artes_Escenicas.js'; // Asegúrate de que el archivo se llame Coordinacion.js
import Musica_Audiovisuales from './components/Administrativos/Musica_Audiovisuales.js'; // Asegúrate de que el archivo se llame Coordinacion.js
import Deportes from './components/Administrativos/Deportes.js'; // Asegúrate de que el archivo se llame Coordinacion.js

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
          <Route
            path="/coordinacion" // Corrige el nombre de la ruta para que sea coherente
            element={isAuthenticated() ? <Coordinacion /> : <Navigate to="/" />} // Redirigir a Home si no está autenticado
          />
                    <Route
            path="/Artes_Escenicas" // Corrige el nombre de la ruta para que sea coherente
            element={isAuthenticated() ? <Artes_Escenicas /> : <Navigate to="/" />} // Redirigir a Home si no está autenticado
          />
                    <Route
            path="/Musica_Audiovisuales" // Corrige el nombre de la ruta para que sea coherente
            element={isAuthenticated() ? <Musica_Audiovisuales /> : <Navigate to="/" />} // Redirigir a Home si no está autenticado
          />
                    <Route
            path="/Deportes" // Corrige el nombre de la ruta para que sea coherente
            element={isAuthenticated() ? <Deportes /> : <Navigate to="/" />} // Redirigir a Home si no está autenticado
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
