import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js';
import Encuesta from './components/Encuesta/encuesta.js'; // Asegúrate de que el archivo se llame Encuesta.js
import Administrativo from './components/Administrativos/administrativos.js'; // Asegúrate de que el archivo se llame Administrativo.js
import Busqueda from './components/Administrativos/Busqueda.js'; // Asegúrate de que el archivo se llame Administrativo.js

function AppRoutes() {
  return (
    <Router>
      <div className='Routes'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encuesta" element={<Encuesta />} />
          <Route path="/administrativos" element={<Administrativo />} />
          <Route path="/busqueda" element={<Busqueda />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
