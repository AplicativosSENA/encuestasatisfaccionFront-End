// src/components/Administrativos/Coordinacion.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para la redirección
import '../../assets/css/Administrativos/Coordinacion.css';

const Coordinacion = () => {
  const navigate = useNavigate();  // Hook para navegar

  const handleClick = (coord) => {
    console.log(`Navegando a ${coord}`);
    // Redirigimos a la ruta correspondiente
    navigate(`/${coord}`);
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container">
        </div>
      </nav>
      <br />
      <div className="coordinacion-container">
        <h1>Escoge Una Coordinacion</h1>
        <div className="coordinacion-images">
          <div className="coordinacion-item" onClick={() => handleClick('Artes_Escenicas')}>
            <img src={require('../../assets/img/Artes_Escenicas.jpeg')} alt="Artes Escénicas" />
            <h2>Artes Escénicas</h2>
          </div>
          <div className="coordinacion-item" onClick={() => handleClick('Musica_Audiovisuales')}>
            <img src={require('../../assets/img/Musica.jpeg')} alt="Música" />
            <h2>Música</h2>
          </div>
          <div className="coordinacion-item" onClick={() => handleClick('Deportes')}>
            <img src={require('../../assets/img/Deportes.png')} alt="Danzas" />
            <h2>Deportes</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coordinacion;
