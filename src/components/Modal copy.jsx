import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // No mostrar el modal si isOpen es false

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h3>¿Estás seguro de que quieres eliminar?</h3>
        <button onClick={onConfirm} style={deleteButtonStyle}>Eliminar</button>
        <button onClick={onClose} style={cancelButtonStyle}>Cancelar</button>
      </div>
    </div>
  );
};

// Estilos básicos para el modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  margin: '5px',
  border: 'none',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  backgroundColor: 'gray',
  color: 'white',
  padding: '10px',
  margin: '5px',
  border: 'none',
  cursor: 'pointer',
};

export default Modal;
