import { useState } from 'react';

const useForm = (initialState) => {
  const [formDetails, setFormDetails] = useState(initialState);
  const [buttonText, setButtonText] = useState('Enviar');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando...");
    try {
      let response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });
      let result = await response.json();
      setFormDetails(initialState);
      if (result.code === 200) {
        setStatus({ success: true, message: 'Mensaje enviado con éxito' });
      } else {
        setStatus({ success: false, message: 'Algo salió mal, por favor inténtelo de nuevo más tarde.' });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus({ success: false, message: 'Algo salió mal, por favor inténtelo de nuevo más tarde.' });
    } finally {
      setButtonText("Enviar");
    }
  };

  return { formDetails, buttonText, status, onFormUpdate, handleSubmit };
};

export default useForm;