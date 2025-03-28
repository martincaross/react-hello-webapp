import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer"; 

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { store } = useGlobalReducer();

  useEffect(() => {
    if (!store.selectedAgenda) {
      alert("No se ha seleccionado una agenda.");
      navigate("/");
      return;
    }

    fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgenda}/contacts`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP! Estado: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const selectedContact = data.contacts.find(contact => contact.id === parseInt(id));

        if (selectedContact) {
          setFormData({
            name: selectedContact.name || "",
            email: selectedContact.email || "",
            phone: selectedContact.phone || "",
            address: selectedContact.address || "",
          });
        } else {
          console.error("Contacto no encontrado");
        }
      })
      .catch((error) => console.error("Error al cargar contacto:", error));
  }, [id, store.selectedAgenda]); 

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!store.selectedAgenda) {
      alert("No se ha seleccionado una agenda.");
      return;
    }

    fetch(`https://playground.4geeks.com/contact/agendas/${store.selectedAgenda}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => navigate("/"))
      .catch((error) => console.error("Error al actualizar contacto:", error));
  };

  return (
      <Container className="mt-4 d-flex justify-content-center">
        <Card className="shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="text-center mb-4">Edit Contact</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
  
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Contact
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    );
};

export default EditContact;
