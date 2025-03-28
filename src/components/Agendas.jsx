import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Agendas = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [newAgenda, setNewAgenda] = useState("");
  const [creatingAgenda, setCreatingAgenda] = useState(false);


  useEffect(() => {
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
  const handleCloseAgendaModal = () => {
    setIsAgendaModalOpen(false);
    setCreatingAgenda(false);
    setNewAgenda("");
  };

  const handleAgendaChange = (event) => {
    const selectedAgenda = event.target.value;
    dispatch({ type: "SET_SELECTED_AGENDA", payload: selectedAgenda });
  };

  const handleDeleteAgenda = () => {
    if (!store.selectedAgenda) return;
  
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar la agenda "${store.selectedAgenda}"?`
    );
  
    if (!confirmDelete) return;
  
    fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgenda}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al eliminar la agenda: ${response.status}`);
        }
      })
      .then(() => {
        alert(`Agenda "${store.selectedAgenda}" eliminada correctamente.`);
  
        setAgendas((prevAgendas) =>
          prevAgendas.filter((agenda) => agenda.slug !== store.selectedAgenda)
        );
  
        dispatch({ type: "SET_SELECTED_AGENDA", payload: "" });
      })
      .catch((error) => console.error("Error al eliminar agenda:", error));
  };

  const handleCreateAgenda = () => {
    if (!newAgenda.trim()) {
      alert("El nombre de la agenda no puede estar vacío.");
      return;
    }

    if (agendas.some(agenda => agenda.slug === newAgenda)) {
      alert("Ya existe una agenda con ese nombre.");
      return;
    }

    fetch(`https://playground.4geeks.com/contact/agendas/${newAgenda}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: newAgenda }),
    })
      .then(response => {
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        alert(`Agenda "${data.slug}" creada exitosamente.`);
        setAgendas([...agendas, { slug: data.slug, id: data.id }]);
        dispatch({ type: "SET_SELECTED_AGENDA", payload: data.slug });
        handleCloseAgendaModal();
      })
      .catch(error => console.error("Error al crear agenda:", error));
  };
  
  return (
    <div>
      <Button variant="success" onClick={handleOpenAgendaModal}>
        Agenda
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
          <Form.Group className="d-flex justify-content-between">
          {!creatingAgenda ? (
            <Button variant="primary" onClick={() => setCreatingAgenda(true)}>
              Crear Nueva Agenda
            </Button>
          ) : (
            <>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nueva Agenda"
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                />
               <Button className="w-100" variant="success" onClick={handleCreateAgenda}>
                Confirmar
              </Button>
              </Form.Group>
              
            </>
          )}

          <Button variant="danger" disabled={!store.selectedAgenda} onClick={handleDeleteAgenda}>
            Eliminar Agenda Seleccionada
          </Button>
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
