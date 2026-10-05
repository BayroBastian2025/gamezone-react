import { useState } from 'react'
import { formatearPrecio, resolverImagen, IMAGEN_POR_DEFECTO } from '../utils/helpers'

/**
 * Vista del carrito de compras.
 * Props:
 *  - carrito: lista de { id, nombre, precio, imagen, cantidad }
 *  - total: monto total calculado en App
 *  - onCambiarCantidad(id, delta), onQuitar(id), onVaciar(), onVolver()
 */
function Cart({ carrito, total, onCambiarCantidad, onQuitar, onVaciar, onVolver }) {
  // Estado local: indica si la compra fue finalizada
  const [compraExitosa, setCompraExitosa] = useState(false)

  const finalizarCompra = () => {
    setCompraExitosa(true)
    onVaciar()
  }

  // Renderizado condicional 1: compra finalizada
  if (compraExitosa && carrito.length === 0) {
    return (
      <div className="alert alert-success text-center py-5">
        <h3>🎉 ¡Gracias por tu compra!</h3>
        <p className="mb-4">Tu pedido fue registrado correctamente (simulación).</p>
        <button className="btn btn-primary" onClick={onVolver}>Seguir comprando</button>
      </div>
    )
  }

  // Renderizado condicional 2: carrito vacío
  if (carrito.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="display-1">🛒</div>
        <h3 className="mt-3">Tu carrito está vacío</h3>
        <p className="text-muted">Agrega algunos videojuegos desde el catálogo para verlos aquí.</p>
        <button className="btn btn-primary" onClick={onVolver}>Ir al catálogo</button>
      </div>
    )
  }

  // Renderizado condicional 3: carrito con productos
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">🛒 Tu carrito</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={onVaciar}>Vaciar carrito</button>
      </div>

      <ul className="list-group shadow-sm mb-3">
        {carrito.map((item) => (
          <li key={item.id} className="list-group-item d-flex flex-wrap align-items-center gap-3">
            <img
              src={resolverImagen(item.imagen)}
              alt={item.nombre}
              className="cart-img rounded"
              onError={(e) => { e.target.onerror = null; e.target.src = IMAGEN_POR_DEFECTO }}
            />

            <div className="flex-grow-1">
              <strong>{item.nombre}</strong>
              <div className="text-muted small">{formatearPrecio(item.precio)} c/u</div>
            </div>

            {/* Control de cantidad: el botón "−" se deshabilita al llegar a 1 */}
            <div className="btn-group" role="group" aria-label="Cantidad">
              <button className="btn btn-outline-secondary btn-sm" disabled={item.cantidad === 1}
                onClick={() => onCambiarCantidad(item.id, -1)}>−</button>
              <span className="btn btn-light btn-sm disabled opacity-100">{item.cantidad}</span>
              <button className="btn btn-outline-secondary btn-sm"
                onClick={() => onCambiarCantidad(item.id, 1)}>+</button>
            </div>

            <div className="fw-bold cart-subtotal text-end">{formatearPrecio(item.precio * item.cantidad)}</div>

            <button className="btn btn-outline-danger btn-sm" onClick={() => onQuitar(item.id)}>Quitar</button>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow-sm">
        <span className="fs-5">Total: <strong className="text-primary">{formatearPrecio(total)}</strong></span>
        <button className="btn btn-success btn-lg" onClick={finalizarCompra}>Finalizar compra</button>
      </div>
    </div>
  )
}

export default Cart
