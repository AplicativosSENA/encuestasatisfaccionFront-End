import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/encuesta/encuesta.css';
import axios from 'axios';

const Encuesta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData] = useState(location.state?.userData || null);
  const [selectedName, setSelectedName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [responses, setResponses] = useState({});
  const [blockedInstructors, setBlockedInstructors] = useState(new Set());

  useEffect(() => {
    if (!userData) return;

    const fetchInstructors = async () => {
      try {
        const response = await axios.get(`https://encuestasatisfaccionback-end.onrender.com/api/instructor/ficha/${userData.Ficha}`);
        setInstructors(response.data);

        const instructorsRatedRaw = localStorage.getItem('instructorsRated');
        const instructorsRated = instructorsRatedRaw ? JSON.parse(instructorsRatedRaw) : [];
        const blockedSet = new Set(
          instructorsRated.filter(rating => rating.aprendiz === userData.Nombre).map(rating => rating.instructor)
        );

        setBlockedInstructors(blockedSet);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        alert('Error al cargar los instructores. Por favor, inténtelo de nuevo.');
      }
    };

    fetchInstructors();
  }, [userData]);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
    setShowForm(true);
    setResponses({});
    alert(`Has seleccionado a ${event.target.value}`);
  };

  const handleResponseChange = (questionIndex, response) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [`question-${questionIndex}`]: response,
    }));
  };

  const areAllQuestionsAnswered = () => {
    const totalQuestions = 12;
    const unansweredQuestions = [];

    for (let i = 0; i < totalQuestions; i++) {
      if (!responses[`question-${i}`]) {
        unansweredQuestions.push(`Pregunta ${i + 1}`);
      }
    }

    return unansweredQuestions.length === 0 ? null : unansweredQuestions;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const unansweredQuestions = areAllQuestionsAnswered();

    if (unansweredQuestions) {
      alert(`Por favor, responda todas las preguntas antes de enviar el formulario. Faltan: ${unansweredQuestions.join(', ')}`);
      return;
    }

    const instructorsRated = JSON.parse(localStorage.getItem('instructorsRated')) || [];
    const alreadyRated = instructorsRated.some(rating => rating.instructor === selectedName && rating.aprendiz === userData.Nombre);

    if (alreadyRated) {
      alert('Ya has calificado a este instructor.');
      return;
    }

    const respuestaData = {
      Ficha: userData.Ficha,
      Nombre: userData.Nombre || "No especificado",
      Apellidos: userData.Apellidos || "No especificado",
      'Nom Instructor': selectedName,
      "El Instructor establece relaciones interpersonales cordiales, armoniosas, respetuosas": responses["question-0"],
      "El Instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre": responses["question-1"],
      "El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje": responses["question-2"],
      "El Instructor le orienta su formación mediante un proyecto formativo": responses["question-3"],
      "El Instructor incentiva al aprendiz a utilizar la plataforma Territorium en el desarrollo de las actividades de aprendizaje": responses["question-4"],
      "El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo": responses["question-5"],
      "El Instructor es puntual al iniciar las sesiones": responses["question-6"],
      "El Instructor demuestra dominio técnico": responses["question-7"],
      "El Instructor le propone fuentes de consulta (bibliografía, webgrafía…) y ayudas que facilitan su proceso de aprendizaje": responses["question-8"],
      "El instructor brinda apoyo sobre temáticas del FPI cuando el aprendiz lo requiere y es comprensivo frente a dificultades personales direccionando al área competente": responses["question-9"],
      "El Instructor revisa y asesora los planes de mejoramiento": responses["question-10"],
      "El instructor contribuye al mejoramiento actitudinal del aprendiz en su proceso de formación o El instructor contribuye al mejoramiento del aprendiz en su proceso de formación": responses["question-11"],
    };

    try {
      await axios.post('https://encuestasatisfaccionback-end.onrender.com/api/respuestas', respuestaData);

      const updatedInstructorsRated = [...instructorsRated, { instructor: selectedName, aprendiz: userData.Nombre }];
      localStorage.setItem('instructorsRated', JSON.stringify(updatedInstructorsRated));

      setBlockedInstructors(prev => new Set(prev).add(selectedName));
      alert('Respuestas enviadas exitosamente');
      setSelectedName('');
      setShowForm(false);
    } catch (error) {
      console.error('Error enviando respuestas:', error.response ? error.response.data : error.message);
      alert('Ocurrió un error al enviar las respuestas. Por favor, intente de nuevo.');
    }
  };

  const goToMain = () => {
    navigate('/', { replace: true });
    window.history.replaceState(null, '');
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container" style={{ padding: '15px 0' }}>
          {/* Aquí puedes agregar elementos de navegación si es necesario */}
        </div>
      </nav>

      <div className="encuesta-container" style={{ marginTop: '70px', padding: '20px' }}>
        <div className="content">
          <h1>Bienvenido Aprendiz</h1>
          <div className="dropdown-container">
            <label htmlFor="nameDropdown">Seleccione un Instructor:</label>
            <select
              id="nameDropdown"
              value={selectedName}
              onChange={handleNameChange}
              className="dropdown"
            >
              <option value="" disabled>Seleccionar...</option>
              {instructors.map((instructor, index) => (
                <option
                  key={index}
                  value={instructor['Nom Instructor']}
                  disabled={blockedInstructors.has(instructor['Nom Instructor'])}
                >
                  {instructor['Nom Instructor']}
                </option>
              ))}
            </select>
          </div>

          {showForm && (
            <div className="form-container">
              <h3>Valoración para {selectedName}</h3>
              <form onSubmit={handleSubmit}>
                {[
                  "¿El instructor establece relaciones interpersonales cordiales, armoniosas y respetuosas?",
                  "¿El instructor socializa, desarrolla y evalúa la totalidad de los resultados de aprendizaje programados para el semestre?",
                  "¿El instructor aplica estrategias participativas de trabajo en equipo que le permiten estar activo permanentemente en su proceso de aprendizaje?",
                  "¿El instructor le orienta su formación mediante un proyecto formativo?",
                  "¿El instructor incentiva al aprendiz a utilizar la plataforma Territorium en el desarrollo de las actividades de aprendizaje?",
                  "¿El instructor orienta la formación por medio de guías teniendo en cuenta el proyecto formativo?",
                  "¿El instructor es puntual al iniciar las sesiones?",
                  "¿El instructor demuestra dominio técnico?",
                  "¿El instructor propone fuentes de consulta y ayudas que facilitan el proceso de aprendizaje?",
                  "¿El instructor brinda apoyo sobre temáticas del FPI cuando el aprendiz lo requiere y es comprensivo frente a dificultades?",
                  "¿El instructor revisa y asesora los planes de mejoramiento?",
                  "¿El instructor contribuye al mejoramiento del aprendiz en su proceso de formación?"
                ].map((question, index) => (
                  <div key={index} className="question-container">
                    <label htmlFor={`question-${index}`}>{question}</label>
                    <select
                      id={`question-${index}`}
                      value={responses[`question-${index}`] || ''}
                      onChange={(e) => handleResponseChange(index, e.target.value)}
                      className="response-dropdown"
                    >
                      <option value="">Seleccionar respuesta...</option>
                      <option value="Muy Satisfecho">Muy Satisfecho</option>
                      <option value="Satisfecho">Satisfecho</option>
                      <option value="Neutro">Neutro</option>
                      <option value="Insatisfecho">Insatisfecho</option>
                      <option value="Muy Insatisfecho">Muy Insatisfecho</option>
                    </select>
                  </div>
                ))}
                <div className="button-container">
                  <button type="submit" className="submit-button">Enviar Respuestas</button>
                </div>
              </form>
            </div>
          )}
        </div>

        <button onClick={goToMain} className="inicio-button">Inicio</button>
      </div>
    </div>
  );
};

export default Encuesta;
