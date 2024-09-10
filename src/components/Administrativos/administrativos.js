import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/Administrativos/administrativos.css'; // Asegúrate de que la ruta del CSS sea correcta

const Encuesta = () => {
  const [instructores, setInstructores] = useState([]);

  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/instructor');
        console.log(response.data); // Verifica que los datos están correctos
        setInstructores(response.data);
      } catch (error) {
        console.error('Error al obtener los instructores:', error);
      }
    };

    fetchInstructores();
  }, []);

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Aquí podrías agregar contenido adicional en el navbar */}
        </div>
      </nav>
      <div className="dropdown-container">
        <label htmlFor="instructor-select">Seleccione un Instructor:</label>
        <select id="instructor-select">
          <option value="">--Selecciona un Instructor--</option>
          {instructores.map((instructor) => (
            <option key={instructor._id} value={instructor._id}>
              {instructor['Nom Instructor']} {/* Accede al campo correcto */}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Encuesta;
