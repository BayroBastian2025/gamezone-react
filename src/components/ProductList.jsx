import ProductCard from './ProductCard'

/**
 * Cuadrícula responsive del catálogo (1 columna en móvil, 2 en tablet, 3 en escritorio y 4 en pantallas grandes).
 * Props:
 *  - productos: lista ya filtrada que se va a mostrar
 *  - carrito: se usa para saber qué productos ya están agregados
 */
function ProductList({ productos, carrito, onAgregar, onEliminarProducto }) {
  // Renderizado condicional: mensaje cuando no hay productos que mostrar
  if (productos.length === 0) {
    return (
      <div className="alert alert-warning text-center my-4">
        😕 No se encontraron videojuegos con los filtros actuales.
      </div>
    )
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {productos.map((producto) => (
        <div className="col" key={producto.id}>
          <ProductCard
            producto={producto}
            enCarrito={carrito.some((item) => item.id === producto.id)}
            onAgregar={onAgregar}
            onEliminarProducto={onEliminarProducto}
          />
        </div>
      ))}
    </div>
  )
}

export default ProductList
