import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importamos BrowserRouter para las rutas
import Home from './pages/Home';  // Importamos la página Home
import Form from './pages/Form';  // Importamos la página Home

const Main = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Home />
        {/* <Form /> */}
        
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
