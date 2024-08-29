import React from 'react';
import '../../assets/css/home/banner.css';
import { Container, Row, Col } from 'react-bootstrap';
import useBannerLogic from '../../containers/Homepagecontainer/BannerLogic';
import { CheckCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const { } = useBannerLogic();

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h1>{`¡Encuesta de Satisfacción!`}</h1>
                  <h2>Bienvenidos a Nuestra Comunidad</h2>
                  <p>
                    En nuestra comunidad, creemos en el poder de la colaboración, la creatividad y el aprendizaje continuo.
                    Nos esforzamos por crear un entorno donde todos puedan compartir sus conocimientos, desarrollar nuevas habilidades
                    y conectarse con personas de ideas afines.
                  </p>
                  <div className="input-container">
                    <label htmlFor="document-input">Digite su Documento:</label>
                    <input 
                      type="text" 
                      id="document-input" 
                      className="document-input" 
                      placeholder="Número de Documento"
                    />
                    <button className='Button-submit' onClick={() => console.log('submit')}>
                      <CheckCircle size={25} />
                    </button>
                  </div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
