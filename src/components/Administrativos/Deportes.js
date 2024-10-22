import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importar la biblioteca XLSX
import '../../assets/css/Administrativos/Busqueda.css';

const Encuesta = () => {
  const [instructores, setInstructores] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [fichas, setFichas] = useState([]);
  const [expandedFichas, setExpandedFichas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [selectedFichas, setSelectedFichas] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // Estado para el botón "Seleccionar Todos"
  const [loadingInstructores, setLoadingInstructores] = useState(true);
  const [loadingFichas, setLoadingFichas] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener instructores únicos
  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coordinador/Deportes');
        setInstructores(response.data);
      } catch (error) {
        console.error('Error al obtener los instructores:', error);
        setError('Error al obtener los instructores');
      } finally {
        setLoadingInstructores(false); // Fin de la carga
      }
    };

    fetchInstructores();
  }, []);

  // Obtener fichas del instructor seleccionado
  useEffect(() => {
    if (selectedInstructor) {
      const fetchFichas = async () => {
        setLoadingFichas(true); // Iniciar carga
        try {
          const response = await axios.get(`http://localhost:5000/api/administrador/ficha/${selectedInstructor}`);
          setFichas(response.data.fichas);
        } catch (error) {
          console.error('Error al obtener las fichas del instructor:', error);
          setError('Error al obtener las fichas del instructor');
        } finally {
          setLoadingFichas(false); // Fin de la carga
        }
      };

      fetchFichas();
    } else {
      setFichas([]);
    }
  }, [selectedInstructor]);

  const handleInstructorChange = (event) => {
    const instructor = event.target.value;
    setSelectedInstructor(instructor);
    setFichas([]);
    setRespuestas({});
    setSelectedFichas([]);
    setSelectAll(false); // Reiniciar el estado del checkbox "Seleccionar Todos"
  };

  const toggleFicha = async (index) => {
    if (expandedFichas.includes(index)) {
      setExpandedFichas(prev => prev.filter(i => i !== index));
    } else {
      setExpandedFichas(prev => [...prev, index]);

      const fichaId = fichas[index];
      try {
        const response = await axios.get(`http://localhost:5000/api/respuestas/respuestas/${fichaId}`, {
          params: { instructor: selectedInstructor }
        });
        setRespuestas(prev => ({
          ...prev,
          [index]: response.data
        }));
      } catch (error) {
        console.error('Error al obtener las respuestas:', error);
        setError('Error al obtener las respuestas');
      }
    }
  };

  const handleFichaSelection = (index) => {
    if (selectedFichas.includes(index)) {
      setSelectedFichas(prev => prev.filter(i => i !== index));
    } else {
      setSelectedFichas(prev => [...prev, index]);
    }
  };

  const handleExportSelectedToExcel = () => {
    let allExcelData = [];

    selectedFichas.forEach((fichaIndex) => {
      const ficha = fichas[fichaIndex];
      const fichaRespuestas = respuestas[fichaIndex] || [];

      const excelData = fichaRespuestas.map((respuesta) => ({
        Ficha: respuesta.Ficha,
        Nombre: respuesta.Nombre,
        Apellidos: respuesta.Apellidos,
        'Nom Instructor': respuesta['Nom Instructor'],
        'Relaciones interpersonales': respuesta["El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas"],
        'Socializa resultados': respuesta["El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre"],
        'Estrategias participativas': respuesta["El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje"],
        'Orientación mediante proyecto': respuesta["El Instructor le orienta su formación mediante un proyecto formativo"],
        'Uso de Territorium': respuesta["El Instructor incentiva al aprendiz a utilizar la plataforma Zajuna en el desarrollo de las actividades de aprendizaje"],
        'Orientación por guías': respuesta["El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo"],
        'Puntualidad': respuesta["El Instructor es puntual al iniciar las sesiones"],
        'Dominio técnico': respuesta["El Instructor demuestra dominio técnico"],
        'Fuentes de consulta': respuesta["El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje"],
        'Apoyo temáticas FPI': respuesta["El instructor brinda apoyo sobre temáticas del FPI (Formación Profesional Integral) cuando el aprendiz lo requiere y es comprensivo frente a dificultades"],
        'Planes de mejoramiento': respuesta["El Instructor revisa y asesora los planes de mejoramiento"],
        'Mejoramiento actitudinal': respuesta["El instructor, contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación o El instructor contribuye al mejoramiento del aprendiz en su proceso de formación"],
      }));

      allExcelData = [...allExcelData, ...excelData];
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(allExcelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Fichas Seleccionadas`);
    XLSX.writeFile(workbook, `Fichas_Seleccionadas.xlsx`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFichas([]);
    } else {
      setSelectedFichas(fichas.map((_, index) => index));
    }
    setSelectAll(!selectAll); // Cambiar el estado de seleccionar todos
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container"></div>
      </nav>
      <div className="encuesta-container">
        {error && <div className="error-message">{error}</div>}
        <div className="dropdown-container">
          <label htmlFor="instructor-select">Seleccione un Instructor:</label>
          <select
            id="instructor-select"
            value={selectedInstructor}
            onChange={handleInstructorChange}
            aria-label="Seleccione un Instructor"
          >
            <option value="">--Selecciona un Instructor--</option>
            {loadingInstructores ? (
              <option disabled>Cargando instructores...</option>
            ) : (
              instructores.map((instructor) => (
                <option key={instructor._id} value={instructor['Nom Instructor']}>
                  {instructor['Nom Instructor']}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="fichas-container">
          <h2>Fichas para el Instructor Seleccionado</h2>
          <button onClick={handleSelectAll}>
            {selectAll ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
          </button>
          {loadingFichas ? (
            <div>Cargando fichas...</div>
          ) : (
            <ul>
              {fichas.length > 0 ? (
                fichas.map((ficha, index) => (
                  <li key={index} className="ficha-item">
                    <div className="ficha-header" onClick={() => toggleFicha(index)}>
                      <input
                        type="checkbox"
                        checked={selectedFichas.includes(index)}
                        onChange={() => handleFichaSelection(index)}
                      />
                      Ficha: {ficha}
                    </div>
                    {expandedFichas.includes(index) && (
                      <div className="ficha-respuestas">
                        <div className="table-container">
                          <table>
                            <thead>
                              <tr>
                                <th>Ficha</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Nom Instructor</th>
                                <th>Relaciones interpersonales</th>
                                <th>Socializa resultados</th>
                                <th>Estrategias participativas</th>
                                <th>Orientación mediante proyecto</th>
                                <th>Uso de Territorium</th>
                                <th>Orientación por guías</th>
                                <th>Puntualidad</th>
                                <th>Dominio técnico</th>
                                <th>Fuentes de consulta</th>
                                <th>Apoyo temáticas FPI</th>
                                <th>Planes de mejoramiento</th>
                                <th>Mejoramiento actitudinal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {respuestas[index]?.map((respuesta, idx) => (
                                <tr key={idx}>
                                  <td>{respuesta.Ficha}</td>
                                  <td>{respuesta.Nombre}</td>
                                  <td>{respuesta.Apellidos}</td>
                                  <td>{respuesta['Nom Instructor']}</td>
                                  <td>{respuesta["El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas"]}</td>
                                  <td>{respuesta["El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre"]}</td>
                                  <td>{respuesta["El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje"]}</td>
                                  <td>{respuesta["El Instructor le orienta su formación mediante un proyecto formativo"]}</td>
                                  <td>{respuesta["El Instructor incentiva al aprendiz a utilizar la plataforma Zajuna en el desarrollo de las actividades de aprendizaje"]}</td>
                                  <td>{respuesta["El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo"]}</td>
                                  <td>{respuesta["El Instructor es puntual al iniciar las sesiones"]}</td>
                                  <td>{respuesta["El Instructor demuestra dominio técnico"]}</td>
                                  <td>{respuesta["El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje"]}</td>
                                  <td>{respuesta["El instructor brinda apoyo sobre temáticas del FPI (Formación Profesional Integral) cuando el aprendiz lo requiere y es comprensivo frente a dificultades"]}</td>
                                  <td>{respuesta["El Instructor revisa y asesora los planes de mejoramiento"]}</td>
                                  <td>{respuesta["El instructor, contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación o El instructor contribuye al mejoramiento del aprendiz en su proceso de formación"]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li>No hay fichas disponibles para este instructor.</li>
              )}
            </ul>
          )}
        </div>

        {selectedFichas.length > 0 && (
          <button className="export-button" onClick={handleExportSelectedToExcel}>
            Exportar a Excel
          </button>
        )}
      </div>
    </div>
  );
};

export default Encuesta;
