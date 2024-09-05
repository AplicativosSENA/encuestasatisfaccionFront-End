import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js';
import Encuesta from './components/Encuesta/encuesta.js';




function AppRoutes() {
  return (
    <Router>
      <div className='Routes'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encuesta" element={<Encuesta />} />

        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes; 
