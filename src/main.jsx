import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap 5 (estilos globales) y estilos propios
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
