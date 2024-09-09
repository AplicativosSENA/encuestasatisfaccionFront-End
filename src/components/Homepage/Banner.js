// Banner.js
import React, { useState } from 'react';
import '../../assets/css/home/banner.css';
import { Container, Row, Col } from 'react-bootstrap';
import { CheckCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import axios from '../../Api/Axiosconfig'; // Asegúrate de la ruta correcta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar redirecciones

export const Banner = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  // Maneja la entrada del usuario
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Función para manejar el submit
  const handleSubmit = async () => {
    try {
      // Llama a la API con el documento o correo ingresado
      const response = await axios.get('/api/aprendices', {
        params: { query: inputValue }, // Ajusta la consulta según lo que espera tu API
      });

      // Filtra el array para encontrar un registro que coincida con el documento o correo
      const foundUser = response.data.find(
        (user) =>
          user['Número de Documento'] === parseInt(inputValue) ||
          user['Correo Electrónico'] === inputValue
      );

      // Si se encuentra el registro, redirige a la página de la encuesta con los datos del usuario
      if (foundUser) {
        console.log('Datos válidos:', foundUser);
        navigate('/encuesta', { state: { userData: foundUser } }); // Pasa los datos del usuario
      } else {
        // Muestra una ventana emergente con el mensaje de error
        alert('Documento o correo inválido, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      alert('Hubo un error al conectar con la API. Intente de nuevo.');
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                  <h1>{`¡Encuesta de Satisfacción!`}</h1>
                  <h2>Bienvenidos a Nuestra Comunidad</h2>
                  <p>
                    En nuestra comunidad, creemos en el poder de la colaboración, la creatividad y el aprendizaje continuo.
                    Nos esforzamos por crear un entorno donde todos puedan compartir sus conocimientos, desarrollar nuevas habilidades
                    y conectarse con personas de ideas afines.
                  </p>
                  <div className="input-container">
                    <label htmlFor="document-input">Digite su Documento o Correo Electrónico:</label>
                    <input
                      type="text"
                      id="document-input"
                      className="document-input"
                      placeholder="Número de Documento o Correo"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <button className="Button-submit" onClick={handleSubmit}>
                      <CheckCircle size={25} />
                    </button>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
