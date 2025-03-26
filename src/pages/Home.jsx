import React, { useState } from 'react';
import Modal from '../components/Modal';
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Home = () => {
  const {store, dispatch} =useGlobalReducer()
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    alert('Contacto eliminado'); // Aquí puedes manejar la lógica real
    setIsModalOpen(false); // Cierra el modal después de eliminar
  };

  return (
    <div>
        <h1>Contactos</h1>
 		<p>Mike</p>
 		<p>Direccion</p>
 		<p>Telefono</p>
 		<p>Correo</p>
		<button onClick={() => navigate("/form")}>Ir al Formulario</button>
      <button onClick={() => setIsModalOpen(true)}>Eliminar Contacto</button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Home;
