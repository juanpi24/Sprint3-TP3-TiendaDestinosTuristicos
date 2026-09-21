import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </ThemeProvider>
  </StrictMode>,
);
