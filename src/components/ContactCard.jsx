import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card className="d-flex flex-row align-items-center p-4 mb-3 shadow-sm">
      <img
        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
        alt="Contact"
        className="img-fluid rounded-circle me-3"
        style={{ width: "100px", height: "100px" }}
      />

      <div className="flex-grow-1">
        <h5 className="mb-1">{contact.name}</h5>
        <p className="mb-1 text-muted">{contact.address}</p>
        <p className="mb-1">{contact.phone}</p>
        <p className="mb-1">{contact.email}</p>
      </div>

      <div className="ms-auto d-flex">
        <Button 
          variant="warning" 
          className="me-2" 
          onClick={() => navigate(`/editcontact/${contact.id}`)}
        >
          ✏️
        </Button>
        <Button variant="danger" onClick={onDelete}>
          ❌
        </Button>
      </div>
    </Card>
  );
};

export default ContactCard;
