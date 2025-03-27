import React, { useState, useEffect } from "react";
import Modal from "../components/Modal.jsx";
import Agendas from "../components/Agendas.jsx";
import ContactCard from "../components/ContactCard.jsx"; // Importamos ContactCard
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgendasModalOpen, setIsAgendasModalOpen] = useState(false); // Modal de Agendas
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDelete = () => {
    alert("Contacto eliminado"); // Aquí podrías eliminarlo realmente
    setIsModalOpen(false);
  };

  // Lista de contactos de prueba (debería venir de un estado global o API)
  const [contacts, setContacts] = useState([{ "name": "Juan P", "phone": "123-456-789","email": "juan@example.com","address": "Calle 123","id": 89 },
    { "name": "Juan P", "phone": "123-456-789","email": "juan@example.com","address": "Calle 123","id": 90 },
    { "name": "Juan P","phone": "123-456-789","email": "juan@example.com","address": "Calle 123","id": 91 }]);

    useEffect(() => {
      fetch("https://playground.4geeks.com/contact/agendas/mi_agenda/contacts")
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta de la API:", data); // Verifica la estructura en la consola
          if (Array.isArray(data.contacts)) {
            setContacts(data.contacts); // Accede a la clave correcta
          } else {
            console.error("No se encontró un array de contactos:", data);
            setContacts([]); // Evita errores
          }
        })
        .catch((error) => console.error("Error al obtener contactos:", error));
    }, []);
    

  return (
    <div className="container mt-4">
      {/* Contenedor flexible para alinear título y botón */}
      <div className="d-flex justify-content-between align-items-center mb-4">
      {/* Modal para seleccionar agenda */}
      <Agendas
        isOpen={isAgendasModalOpen}
        onClose={() => setIsAgendasModalOpen(false)}
        onConfirm={handleDelete}
      />
        <button className="btn btn-primary" onClick={() => navigate("/addcontact")}>
          Agregar Contacto
        </button>
      </div>

      {/* Renderizar ContactCard para cada contacto */}
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={() => navigate(`/editcontact/${contact.id}`)}
          onDelete={() => {
            setSelectedContact(contact);
            setIsModalOpen(true);
          }}
        />
      ))}

      {/* Modal para confirmar eliminación */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />

      
    </div>
  );
};

export default Contact;
