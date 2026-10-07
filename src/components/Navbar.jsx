import { useState } from 'react'
import { formatearPrecio } from '../utils/helpers'

/**
 * Barra de navegación superior (Bootstrap 5, colapsable en móvil).
 * Props:
 *  - totalItems / total: contador y monto del carrito
 *  - vistaCarrito: true si se está viendo el carrito
 *  - onToggleCarrito: alterna entre catálogo y carrito
 *  - onNavegar(id): lleva al usuario a una sección (inicio, catalogo, contacto)
 */
const ENLACES = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'catalogo', texto: 'Catálogo' },
  { id: 'contacto', texto: 'Contacto' },
]

function Navbar({ totalItems, total, vistaCarrito, onToggleCarrito, onNavegar }) {
  // Estado local: menú hamburguesa abierto/cerrado en pantallas pequeñas
  const [abierto, setAbierto] = useState(false)

  const irA = (e, id) => {
    e.preventDefault()
    setAbierto(false)
    onNavegar(id)
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="#inicio" onClick={(e) => irA(e, 'inicio')}>
          🎮 GameZone
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label="Abrir menú"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`} id="menu-principal">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {ENLACES.map((enlace) => (
              <li className="nav-item" key={enlace.id}>
                <a className="nav-link" href={`#${enlace.id}`} onClick={(e) => irA(e, enlace.id)}>
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {totalItems > 0 && <span className="text-light">{formatearPrecio(total)}</span>}

            <button
              className={`btn ${vistaCarrito ? 'btn-outline-light' : 'btn-primary'} position-relative`}
              onClick={() => { setAbierto(false); onToggleCarrito() }}
            >
              {vistaCarrito ? '← Volver al catálogo' : '🛒 Ver carrito'}
              {totalItems > 0 && !vistaCarrito && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
