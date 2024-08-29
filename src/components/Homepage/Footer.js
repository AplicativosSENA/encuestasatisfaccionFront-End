import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../../assets/css/home/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <p className="rights-text">Derechos reservados Parkiando 2023 ®</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <h5>Contacto</h5>
            <ul className="contact-list">
              <li>
                <span>Teléfono: (123) 456-7890</span>
              </li>
              <li>
                <span>Correo Electrónico: info@parkiando.com</span>
              </li>
              <li>
                <span>Dirección: Calle Ficticia #123, Ciudad Ficticia</span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
