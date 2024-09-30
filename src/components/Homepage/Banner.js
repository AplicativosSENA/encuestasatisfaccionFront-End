// Banner.js
import React, { useState } from 'react';
import '../../assets/css/home/banner.css';
import { Container, Row, Col } from 'react-bootstrap';
import { CheckCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import axios from '../../Api/Axiosconfig';
import { useNavigate } from 'react-router-dom';

export const Banner = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get('https://encuestasatisfaccionback-end.onrender.com/api/aprendices', {
        params: { query: inputValue },
      });

      const foundUser = response.data.find(
        (user) =>
          user['Número de Documento'] === parseInt(inputValue) ||
          user['Correo Electrónico'] === inputValue
      );

      if (foundUser) {
        navigate('/encuesta', { state: { userData: foundUser } });
      } else {
        alert('Documento o correo inválido, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      alert('Hubo un error al conectar con la API. Intente de nuevo.');
    }
  };

  const handleAdministrativoClick = () => {
    navigate('/administrativos');
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12}>
            <div className="admin-button-container">
              <button className="admin-button" onClick={handleAdministrativoClick}>
                <h2>Administrativo</h2>
              </button>
            </div>
          </Col>
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                  <h1>{`Encuesta de Satisfacción`}</h1>
                  <h1>¡Bienvenidos!</h1>
                  <p>
                    En nuestra comunidad, creemos en el poder de la colaboración, la creatividad y el aprendizaje continuo.
                    Nos esforzamos por crear un entorno donde todos puedan compartir sus conocimientos, desarrollar nuevas habilidades
                    y conectarse con personas de ideas afines.
                  </p>
                  <div className="input-container">
                    <label htmlFor="document-input">Digite su número de identificación:</label>
                    <input
                      type="text"
                      id="document-input"
                      className="document-input"
                      placeholder="Número de Documento"
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
