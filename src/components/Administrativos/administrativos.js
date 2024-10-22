import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../../assets/css/Administrativos/administrativos.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/administrador/login', {
        correo: email,
        contraseña: password,
      });

      // Verifica si la respuesta contiene un token
      if (response.data.token) {
        Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success');
        localStorage.setItem('token', response.data.token); // Guardar el token en localStorage si es necesario

        // Redirige a la página adecuada según el tipo de usuario
        if (response.data.esAdministrativo) {
          navigate('/Coordinacion'); // Página de Administrativos
        } else {
          // Redirige según la coordinación
          switch (response.data.coordinacion) {
            case 'ARTES ESCÉNICAS':
              navigate('/Artes_Escenicas'); // Redirige a la página de Artes Escénicas
              break;
            case 'DEPORTES':
              navigate('/Deportes'); // Redirige a la página de Deportes
              break;
            case 'MUSICA Y AUDIOVISUALES':
              navigate('/Musica_Audiovisuales'); // Redirige a la página de Música y Audiovisuales
              break;
            default:
              navigate('/Coordinacion'); // Redirige a la página genérica de Coordinación
              break;
          }
        }
      } else {
        Swal.fire('Error', 'No se pudo iniciar sesión', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Error al iniciar sesión', 'error');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Aquí podrías agregar contenido adicional en el navbar */}
        </div>
      </nav>
      <br />
      <br />
      <div className="login-container">
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
