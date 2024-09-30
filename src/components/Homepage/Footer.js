import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../../assets/css/home/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <h5>Contacto</h5>
            <ul className="contact-list">
              <li>
                <span>Correo Electrónico: jdrincon@sena.edu.co</span>
              </li>
              <li>
                <span>Transversal 78J N° 41D - 15 Sur - Kennedy - Bogotá D.C.</span>
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <p className="rights-text">Derechos reservados SENA (Centro De Formación en Actividad Física y Cultura)</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
