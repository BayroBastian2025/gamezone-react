import { formatearPrecio } from '../utils/helpers'

/**
 * Barra de navegación superior.
 * Props:
 *  - totalItems: cantidad total de unidades en el carrito (contador)
 *  - total: monto total del carrito
 *  - vistaCarrito: indica si se está viendo el carrito (estado del padre)
 *  - onToggleCarrito: alterna entre catálogo y carrito
 */
function Navbar({ totalItems, total, vistaCarrito, onToggleCarrito }) {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top shadow">
      <div className="container">
        <span className="navbar-brand fw-bold fs-4">🎮 GameZone</span>

        <div className="d-flex align-items-center gap-3">
          {/* Renderizado condicional: el monto solo se muestra si hay productos */}
          {totalItems > 0 && (
            <span className="text-light d-none d-sm-inline">{formatearPrecio(total)}</span>
          )}

          {/* El texto y el estilo del botón cambian según el estado vistaCarrito */}
          <button
            className={`btn ${vistaCarrito ? 'btn-outline-light' : 'btn-primary'} position-relative`}
            onClick={onToggleCarrito}
          >
            {vistaCarrito ? '← Volver al catálogo' : '🛒 Ver carrito'}

            {/* Contador con el total de productos en el carrito */}
            {totalItems > 0 && !vistaCarrito && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
