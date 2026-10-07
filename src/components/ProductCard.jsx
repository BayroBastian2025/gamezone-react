import { formatearPrecio, resolverImagen, IMAGEN_POR_DEFECTO } from '../utils/helpers'

/**
 * Tarjeta individual de un videojuego.
 * Props:
 *  - producto: objeto { id, nombre, categoria, precio, descripcion, imagen }
 *  - enCarrito: boolean, indica si el producto ya está en el carrito
 *  - onAgregar / onEliminarProducto: funciones recibidas desde App
 */
function ProductCard({ producto, enCarrito, onAgregar, onEliminarProducto }) {
  return (
    <article className="card h-100 shadow-sm product-card">
      <img
        src={resolverImagen(producto.imagen)}
        className="card-img-top"
        alt={producto.nombre}
        // Si la imagen falla, se reemplaza por una imagen predeterminada
        onError={(e) => {
          e.target.onerror = null
          e.target.src = IMAGEN_POR_DEFECTO
        }}
      />

      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-secondary align-self-start mb-2">{producto.categoria}</span>
        <h5 className="card-title">{producto.nombre}</h5>
        {producto.descripcion && <p className="card-text text-muted small">{producto.descripcion}</p>}
        <p className="fs-5 fw-bold text-primary mt-auto mb-3">{formatearPrecio(producto.precio)}</p>

        <div className="d-flex gap-2">
          {/* Renderizado condicional: el botón cambia de texto, color y estado
              según si el producto ya fue agregado al carrito */}
          {enCarrito ? (
            <button className="btn btn-success flex-grow-1" disabled>
              ✔ En el carrito
            </button>
          ) : (
            <button className="btn btn-primary flex-grow-1" onClick={() => onAgregar(producto)}>
              Agregar al carrito
            </button>
          )}

          <button
            className="btn btn-outline-danger"
            title="Eliminar del catálogo"
            aria-label={`Eliminar ${producto.nombre} del catálogo`}
            onClick={() => onEliminarProducto(producto.id)}
          >
            🗑
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
