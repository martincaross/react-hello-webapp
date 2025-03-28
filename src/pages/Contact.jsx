import React, { useState, useEffect } from "react";
import Modal from "../components/Modal.jsx";
import Agendas from "../components/Agendas.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgendasModalOpen, setIsAgendasModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    if (!store.selectedAgenda) return;

    fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgenda}/contacts`)
      .then(response => response.json())
      .then(data => {
        if (data.contacts) {
          setContacts(data.contacts);
        } else {
          console.error("No se encontraron contactos para la agenda seleccionada.");
        }
      })
      .catch(error => console.error("Error al obtener contactos:", error));
  }, [store.selectedAgenda]);

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
        setContacts(contacts.filter((contact) => contact.id !== contactId));
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error al eliminar contacto:", error));
  };

    
    

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDelete(selectedContact.id)}
      />
      
    </div>
  );
};

export default Contact;
