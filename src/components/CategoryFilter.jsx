/**
 * Botones para filtrar el catálogo por categoría.
 * Props:
 *  - categorias: lista de nombres (incluye "Todos")
 *  - activa: categoría seleccionada (estado que vive en App)
 *  - conteo: objeto { categoria: cantidad } para mostrar un contador en cada botón
 *  - onSeleccionar(categoria): avisa a App que cambió el filtro
 */
function CategoryFilter({ categorias, activa, conteo, onSeleccionar }) {
  return (
    <div className="d-flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {categorias.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`btn btn-sm ${activa === cat ? 'btn-primary' : 'btn-outline-primary'}`}
          aria-pressed={activa === cat}
          onClick={() => onSeleccionar(cat)}
        >
          {cat} <span className="badge text-bg-light ms-1">{conteo[cat] ?? 0}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
