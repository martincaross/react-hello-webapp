import React, { useState, useEffect } from "react";
import Modal from "../components/Modal.jsx";
import Agendas from "../components/Agendas.jsx";
import ContactCard from "../components/ContactCard.jsx"; // Importamos ContactCard
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Button } from "react-bootstrap";

const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgendasModalOpen, setIsAgendasModalOpen] = useState(false); // Modal de Agendas
  const [selectedContact, setSelectedContact] = useState(null);

  // Lista de contactos de prueba (debería venir de un estado global o API)
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    if (!store.selectedAgenda) return;  // Si no se ha seleccionado una agenda, no hacer nada.

    // Fetch de contactos basado en la agenda seleccionada
    fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgenda}/contacts`)
      .then(response => response.json())
      .then(data => {
        if (data.contacts) {
          setContacts(data.contacts);  // Actualizamos los contactos de la agenda seleccionada
        } else {
          console.error("No se encontraron contactos para la agenda seleccionada.");
        }
      })
      .catch(error => console.error("Error al obtener contactos:", error));
  }, [store.selectedAgenda]);  // Esta dependencia hace que el efecto se ejecute cada vez que cambia la agenda seleccionada

  const handleDelete = (contactId) => {
    fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgenda}/contacts/${contactId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al eliminar contacto ${contactId}`);
        }
      })
      .then(() => {
        setContacts(contacts.filter((contact) => contact.id !== contactId)); // Actualiza la lista
        setIsModalOpen(false); // Cierra el modal después de eliminar
      })
      .catch((error) => console.error("Error al eliminar contacto:", error));
  };

    
    

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
      <h2 className="text-center">Agenda: {store.selectedAgenda}</h2>
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
        onConfirm={() => handleDelete(selectedContact.id)} // ✅ Llama a la función con el ID
      />

      
    </div>
  );
};

export default Contact;
