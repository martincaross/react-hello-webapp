import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Usamos el hook para acceso al estado global

const Agendas = () => {
  const { store, dispatch } = useGlobalReducer(); // Obtener el estado y dispatch desde el contexto global
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    // Cargar las agendas desde la API
    fetch("https://playground.4geeks.com/contact/agendas")
      .then(response => response.json())
      .then(data => {
        if (data.agendas) {
          setAgendas(data.agendas);
        } else {
          console.error("No se encontró un array de agendas:", data);
        }
      })
      .catch(error => console.error("Error al obtener agendas:", error));
  }, []);

  const handleOpenAgendaModal = () => setIsAgendaModalOpen(true);
  const handleCloseAgendaModal = () => setIsAgendaModalOpen(false);

  // Manejar la selección de agenda
  const handleAgendaChange = (event) => {
    const selectedAgenda = event.target.value;
    dispatch({ type: "SET_SELECTED_AGENDA", payload: selectedAgenda });  // Actualizamos el estado global con la agenda seleccionada
  };

  return (
    <div>
      <Button variant="success" onClick={handleOpenAgendaModal}>
        Seleccionar Agenda
      </Button>

      <Modal show={isAgendaModalOpen} onHide={handleCloseAgendaModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Agenda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control as="select" value={store.selectedAgenda} onChange={handleAgendaChange}>
              <option value="">Seleccione una agenda</option>
              {agendas.map((agenda) => (
                <option key={agenda.id} value={agenda.slug}>
                  {agenda.slug}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAgendaModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Agendas;
