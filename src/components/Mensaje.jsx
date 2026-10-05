/**
 * Mensajes de estado reutilizables: carga y error.
 * Props:
 *  - tipo: 'cargando' | 'error'
 *  - texto: mensaje opcional a mostrar
 */
function Mensaje({ tipo, texto }) {
  if (tipo === 'cargando') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">{texto || 'Cargando...'}</p>
      </div>
    )
  }

  return <div className="alert alert-danger my-4">⚠️ {texto}</div>
}

export default Mensaje
