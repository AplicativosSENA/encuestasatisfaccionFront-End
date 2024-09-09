import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/encuesta/encuesta.css'; // Asegúrate de que la ruta del CSS sea correcta
import axios from 'axios'; // Importamos axios para las llamadas a la API

const Encuesta = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(location.state?.userData || null);
  const [selectedName, setSelectedName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [responses, setResponses] = useState({}); // Estado para las respuestas

  useEffect(() => {
    if (!userData) return;

    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/instructor/ficha/${userData.Ficha}`);
        console.log("Fetched Instructors:", response.data);
        setInstructors(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, [userData]);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
    setShowForm(true);
  };

  // Función para manejar el cambio en las respuestas
  const handleResponseChange = (questionIndex, response) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: response,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Respuestas enviadas:', responses);
    // Aquí puedes agregar la lógica para enviar las respuestas a la API o manejarlas según necesites
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container">
        </div>
      </nav>

      <div className="encuesta-container">
        <div className="user-data">
          <h2>Datos del Usuario</h2>
          {userData && (
            <ul>
              <li><strong>Ficha:</strong> {userData.Ficha}</li>
              <li><strong>Sede:</strong> {userData.Sede}</li>
              <li><strong>Jornada:</strong> {userData.Jornada}</li>
              <li><strong>Número de Documento:</strong> {userData['Número de Documento']}</li>
              <li><strong>Nombre:</strong> {userData.Nombre}</li>
              <li><strong>Apellidos:</strong> {userData.Apellidos}</li>
              <li><strong>Celular:</strong> {userData.Celular}</li>
              <li><strong>Correo Electrónico:</strong> {userData['Correo Electrónico']}</li>
            </ul>
          )}
        </div>

        <div className="content">
          <div className="dropdown-container">
            <label htmlFor="nameDropdown">Selecciona un nombre:</label>
            <select
              id="nameDropdown"
              value={selectedName}
              onChange={handleNameChange}
              className="dropdown"
            >
              <option value="">Seleccionar...</option>
              {instructors.map((instructor, index) => (
                <option key={index} value={instructor['Nom Instructor']}>
                  {instructor['Nom Instructor']}
                </option>
              ))}
            </select>
          </div>

          {showForm && (
            <div className="form-container">
              <h3>Formulario para {selectedName}</h3>
              <form onSubmit={handleSubmit}>
                {[
                  "El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas.",
                  "El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre.",
                  "El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje.",
                  "El Instructor le orienta su formación mediante un proyecto formativo.",
                  "El Instructor incentiva al aprendiz a utilizar la plataforma Territorium en el desarrollo de las actividades de aprendizaje.",
                  "El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo.",
                  "El Instructor es puntual al iniciar las sesiones.",
                  "El Instructor demuestra dominio técnico.",
                  "El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje.",
                  "El instructor brinda apoyo sobre temáticas del FPI cuando el aprendiz lo requiere y es comprensivo frente a dificultades personales direccionando al área competente.",
                  "El Instructor revisa y asesora los planes de mejoramiento.",
                  "El instructor, contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación."
                ].map((question, index) => (
                  <div key={index} className="question">
                    <label>{question}</label>
                    <div className="radio-group">
                      {["Muy Satisfecho", "Satisfecho", "Neutro", "Insatisfecho", "Muy Insatisfecho"].map((option) => (
                        <label key={option}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={responses[index] === option}
                            onChange={() => handleResponseChange(index, option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button type="submit" className="submit-button">Enviar</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Encuesta;
