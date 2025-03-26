// ContactCard.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import Modal from "./Modal";

const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch({ type: "DELETE_CONTACT", payload: contact.id });
    setShowModal(false);
  };

  return (
    <div className="card">
      <h3>{contact.name}</h3>
      <p>Email: {contact.email}</p>
      <p>Teléfono: {contact.phone}</p>
      <button onClick={() => navigate(`/edit/${contact.id}`)} className="btn btn-warning">Editar</button>
      <button onClick={() => setShowModal(true)} className="btn btn-danger">Eliminar</button>

      {showModal && (
        <Modal 
          message={`¿Estás seguro de que deseas eliminar a ${contact.name}?`} 
          onConfirm={handleDelete} 
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ContactCard;
