import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/Administrativos/Busqueda.css';

const Encuesta = () => {
  const [instructores, setInstructores] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [fichas, setFichas] = useState([]);
  const [expandedFichas, setExpandedFichas] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  // Obtener instructores únicos
  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/instructor');
        setInstructores(response.data);
      } catch (error) {
        console.error('Error al obtener los instructores:', error);
      }
    };

    fetchInstructores();
  }, []);

  // Obtener fichas del instructor seleccionado
  useEffect(() => {
    if (selectedInstructor) {
      const fetchFichas = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/administrativo/instructor/ficha/${selectedInstructor}`
          );
          setFichas(response.data.fichas); // Asegúrate de que esto devuelve un array de fichas
        } catch (error) {
          console.error('Error al obtener las fichas del instructor:', error);
        }
      };

      fetchFichas();
    } else {
      setFichas([]);
    }
  }, [selectedInstructor]);

  const handleInstructorChange = (event) => {
    setSelectedInstructor(event.target.value);
  };

  const toggleFicha = async (index) => {
    if (expandedFichas.includes(index)) {
      setExpandedFichas(prev => prev.filter(i => i !== index));
    } else {
      setExpandedFichas(prev => [...prev, index]);
  
      const fichaId = fichas[index];
      console.log(`Fetching respuestas for fichaId: ${fichaId}`); // Verifica el fichaId
  
      try {
        const response = await axios.get(`http://localhost:5000/api/respuestas/respuestas/${fichaId}`);
        console.log('Respuestas obtenidas:', response.data); // Verifica los datos recibidos
        setRespuestas(prev => ({
          ...prev,
          [index]: response.data
        }));
      } catch (error) {
        console.error('Error al obtener las respuestas:', error);
      }
    }
  };
  

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Contenido adicional en el navbar */}
        </div>
      </nav>

      <div className="encuesta-container">
        <div className="dropdown-container">
          <label htmlFor="instructor-select">Seleccione un Instructor:</label>
          <select
            id="instructor-select"
            value={selectedInstructor}
            onChange={handleInstructorChange}
          >
            <option value="">--Selecciona un Instructor--</option>
            {instructores.map((instructor) => (
              <option key={instructor._id} value={instructor['Nom Instructor']}>
                {instructor['Nom Instructor']}
              </option>
            ))}
          </select>
        </div>

        <div className="fichas-container">
          <h2>Fichas para el Instructor Seleccionado</h2>
          <ul>
            {fichas.length > 0 ? (
              fichas.map((ficha, index) => (
                <li key={index} className="ficha-item">
                  <div className="ficha-header" onClick={() => toggleFicha(index)}>
                    Ficha: {ficha}
                  </div>
                  {expandedFichas.includes(index) && (
                    <div className="ficha-respuestas">
                      <table>
                        <thead>
                          <tr>
                            <th>Ficha</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Nom Instructor</th>
                            <th>El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas</th>
                            <th>El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre</th>
                            <th>El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje</th>
                            <th>El Instructor le orienta su formación mediante un proyecto formativo</th>
                            <th>El Instructor incentiva al aprendiz a utilizar la plataforma Territorium en el desarrollo de las actividades de aprendizaje</th>
                            <th>El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo</th>
                            <th>El Instructor es puntual al iniciar las sesiones</th>
                            <th>El Instructor demuestra dominio técnico</th>
                            <th>El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje</th>
                            <th>El instructor brinda apoyo sobre temáticas del FPI cuando el aprendiz lo requiere y es comprensivo frente a dificultades personales direccionando al área competente</th>
                            <th>El Instructor revisa y asesora los planes de mejoramiento</th>
                            <th>El instructor, contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación o El instructor contribuye al mejoramiento del aprendiz en su proceso de formación</th>
                          </tr>
                        </thead>
                        <tbody>
                        {respuestas[index] && Array.isArray(respuestas[index]) ? (
  respuestas[index].map((respuesta, idx) => (
    <tr key={idx}>
      <td>{respuesta.Ficha}</td>
      <td>{respuesta.Nombre}</td>
      <td>{respuesta.Apellidos}</td>
      <td>{respuesta['Nom Instructor']}</td>
      <td>{respuesta["El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas"]}</td>
      <td>{respuesta["El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre"]}</td>
      <td>{respuesta["El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje"]}</td>
      <td>{respuesta["El Instructor le orienta su formación mediante un proyecto formativo"]}</td>
      <td>{respuesta["El Instructor incentiva al aprendiz a utilizar la plataforma Territorium en el desarrollo de las actividades de aprendizaje"]}</td>
      <td>{respuesta["El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo"]}</td>
      <td>{respuesta["El Instructor es puntual al iniciar las sesiones"]}</td>
      <td>{respuesta["El Instructor demuestra dominio técnico"]}</td>
      <td>{respuesta["El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje"]}</td>
      <td>{respuesta["El instructor brinda apoyo sobre temáticas del FPI cuando el aprendiz lo requiere y es comprensivo frente a dificultades personales direccionando al área competente"]}</td>
      <td>{respuesta["El Instructor revisa y asesora los planes de mejoramiento"]}</td>
      <td>{respuesta["El instructor, contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación o El instructor contribuye al mejoramiento del aprendiz en su proceso de formación"]}</td>
    </tr>
  ))
) : (
  <tr><td colSpan="16">Cargando respuestas...</td></tr>
)}
                        </tbody>
                      </table>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li>No hay fichas disponibles para el instructor seleccionado.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Encuesta;
