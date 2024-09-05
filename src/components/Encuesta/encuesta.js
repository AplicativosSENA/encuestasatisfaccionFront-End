import React, { useState } from 'react';
import '../../assets/css/encuesta/encuesta.css'; // Asegúrate de que la ruta sea correcta

const Encuesta = () => {
  const [selectedName, setSelectedName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
    setShowForm(true);
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#home" className="navbar-logo">
            <img src="../../img/logo.png" alt="Logo" />
          </a>
        </div>
      </nav>

      <div className="encuesta-container">
        <h2>Encuesta de Satisfacción</h2>
        <div className="dropdown-container">
          <label htmlFor="nameDropdown">Selecciona un nombre:</label>
          <select
            id="nameDropdown"
            value={selectedName}
            onChange={handleNameChange}
            className="dropdown"
          >
            <option value="">Seleccionar...</option>
            <option value="nombre1">Nombre 1</option>
            <option value="nombre2">Nombre 2</option>
            <option value="nombre3">Nombre 3</option>
          </select>
        </div>

        {showForm && (
          <div className="form-container">
            <h3>Formulario para {selectedName}</h3>
            <form>
              <div className="question">
                <label>Pregunta 1:</label>
                <select>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div className="question">
                <label>Pregunta 2:</label>
                <select>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>

              <div className="question">
                <label>Pregunta 3:</label>
                <select>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Encuesta;
