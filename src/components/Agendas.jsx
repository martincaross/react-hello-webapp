import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const Agendas = () => {
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false); // Estado para abrir el modal de opciones
  const [selectedAgenda, setSelectedAgenda] = useState(""); // Estado para almacenar la agenda seleccionada

  // Función para abrir el modal con los botones
  const handleOpenAgendaModal = () => {
    setIsAgendaModalOpen(true);
  };

  // Función para cerrar el modal con los botones
  const handleCloseAgendaModal = () => {
    setIsAgendaModalOpen(false);
  };

  // Lista de nombres de agendas aleatorias
  const agendas = [
    "Agenda 1",
    "Agenda 2",
    "Agenda 3",
    "Agenda 4",
    "Agenda 5"
  ];

  // Manejar el cambio en el selector de agendas
  const handleAgendaChange = (event) => {
    setSelectedAgenda(event.target.value);
  };

  return (
    <div>
      {/* Botón para abrir el modal de opciones de agenda */}
      <Button variant="success" onClick={handleOpenAgendaModal}>
        Agenda
      </Button>

      {/* Modal con opciones para Nueva agenda, Seleccionar agenda y Eliminar agenda */}
      <Modal show={isAgendaModalOpen} onHide={handleCloseAgendaModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Gestión de Agendas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            {/* Seleccionar Agenda */}
            <Form.Group className="mb-3">
              <Form.Control as="select" value={selectedAgenda} onChange={handleAgendaChange}>
                <option value="">Seleccione una agenda</option>
                {agendas.map((agenda, index) => (
                  <option key={index} value={agenda}>
                    {agenda}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Botón Nueva Agenda */}
            <Button variant="primary" className="mb-2 w-100">
              Nueva Agenda
            </Button>

            {/* Botón Eliminar Agenda */}
            <Button variant="danger" className="mb-2 w-100">
              Eliminar Agenda Actual
            </Button>
          </div>
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
