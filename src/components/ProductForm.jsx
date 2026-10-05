import { useState } from 'react'

const GENEROS = ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Carreras', 'Simulación', 'Puzzle']

/**
 * Formulario para agregar un nuevo videojuego al catálogo.
 * Usa useState para controlar cada campo (componentes controlados).
 * Props:
 *  - onAdd: función del padre que recibe el nuevo producto
 */
function ProductForm({ onAdd }) {
  // Un estado por campo del formulario
  const [nombre, setNombre] = useState('')
  const [genero, setGenero] = useState(GENEROS[0])
  const [precio, setPrecio] = useState('')
  const [imagen, setImagen] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // evita que la página se recargue

    // Validaciones básicas
    if (!nombre.trim() || !precio) {
      setError('El título y el precio son obligatorios.')
      return
    }
    if (Number(precio) <= 0) {
      setError('El precio debe ser mayor a 0.')
      return
    }

    onAdd({
      id: Date.now(), // id único simple
      nombre: nombre.trim(),
      genero,
      precio: Number(precio),
      descripcion: 'Producto agregado manualmente.',
      imagen: imagen.trim(), // si queda vacía se usa la imagen por defecto
    })

    // Limpia el formulario
    setNombre('')
    setPrecio('')
    setImagen('')
    setGenero(GENEROS[0])
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">
      <h5 className="mb-3">➕ Agregar videojuego al catálogo</h5>

      {/* Renderizado condicional: el error solo aparece si existe */}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="nombre">Título *</label>
          <input id="nombre" className="form-control" value={nombre}
            onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Super Mario World" />
        </div>
        <div className="col-md-3">
          <label className="form-label" htmlFor="genero">Género</label>
          <select id="genero" className="form-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
            {GENEROS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label" htmlFor="precio">Precio (CLP) *</label>
          <input id="precio" type="number" min="1" className="form-control" value={precio}
            onChange={(e) => setPrecio(e.target.value)} placeholder="19990" />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="imagen">URL de la imagen (opcional)</label>
          <input id="imagen" className="form-control" value={imagen}
            onChange={(e) => setImagen(e.target.value)} placeholder="https://..." />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Agregar al catálogo</button>
        </div>
      </div>
    </form>
  )
}

export default ProductForm
