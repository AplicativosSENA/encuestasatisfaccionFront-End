import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../../assets/css/home/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <p className="rights-text">Derechos reservados SENA (Centro De Formacion En Actividad Fisica y Cultura)</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <h5>Contacto</h5>
            <ul className="contact-list">
              <li>
                <span>Teléfono: (+57) 323-796-4191</span>
              </li>
              <li>
                <span>Correo Electrónico: aplicativos.cfafc@gmail.com</span>
              </li>
              <li>
                <span>Dirección: Calle Kennedy del Derechos reservados SENA (Centro De Formacion En Actividad Fisica y Cultura)</span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
