import { useRef, useState } from 'react'
import { validarContacto } from '../utils/helpers'

const VACIO = { nombre: '', email: '', mensaje: '' }
const MAX_MENSAJE = 500

/**
 * Formulario de contacto con validación antes del envío.
 * Props:
 *  - onEnviar(datos): función del padre (App) que recibe los datos ya validados
 */
function ContactForm({ onEnviar }) {
  // Estado de los campos (componentes controlados)
  const [datos, setDatos] = useState(VACIO)
  // Errores por campo y campos que el usuario ya tocó
  const [errores, setErrores] = useState({})
  const [tocados, setTocados] = useState({})
  const [enviado, setEnviado] = useState(false)

  // Referencias a los inputs para poder enfocar el primero que tenga error (manipulación del DOM)
  const refs = { nombre: useRef(null), email: useRef(null), mensaje: useRef(null) }

  const handleChange = (e) => {
    const { name, value } = e.target
    const nuevos = { ...datos, [name]: value }
    setDatos(nuevos)
    setEnviado(false)
    // Si el campo ya fue tocado, se revalida en vivo
    if (tocados[name]) setErrores(validarContacto(nuevos))
  }

  const handleBlur = (e) => {
    setTocados((t) => ({ ...t, [e.target.name]: true }))
    setErrores(validarContacto(datos))
  }

  const handleSubmit = (e) => {
    e.preventDefault() // evita recargar la página
    const encontrados = validarContacto(datos)
    setErrores(encontrados)
    setTocados({ nombre: true, email: true, mensaje: true })

    const primerError = ['nombre', 'email', 'mensaje'].find((campo) => encontrados[campo])
    if (primerError) {
      refs[primerError].current.focus() // lleva el foco al primer campo inválido
      return
    }

    onEnviar({ ...datos, nombre: datos.nombre.trim(), email: datos.email.trim(), mensaje: datos.mensaje.trim() })
    setDatos(VACIO)
    setErrores({})
    setTocados({})
    setEnviado(true)
  }

  // Devuelve la clase de Bootstrap según el estado de validación del campo
  const claseCampo = (campo) =>
    `form-control ${tocados[campo] ? (errores[campo] ? 'is-invalid' : 'is-valid') : ''}`

  return (
    <form onSubmit={handleSubmit} noValidate className="card card-body shadow-sm p-4">
      {enviado && (
        <div className="alert alert-success" role="status">
          ✅ ¡Mensaje enviado! Te responderemos a la brevedad.
        </div>
      )}

      {Object.keys(errores).length > 0 && tocados.nombre && tocados.email && tocados.mensaje && (
        <div className="alert alert-danger py-2" role="alert">
          ⚠️ Revisa los campos marcados en rojo antes de enviar.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="contacto-nombre" className="form-label">Nombre *</label>
        <input
          id="contacto-nombre" name="nombre" type="text" ref={refs.nombre}
          className={claseCampo('nombre')} placeholder="Tu nombre"
          value={datos.nombre} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={Boolean(errores.nombre)}
        />
        <div className="invalid-feedback">{errores.nombre}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-email" className="form-label">Email *</label>
        <input
          id="contacto-email" name="email" type="email" ref={refs.email}
          className={claseCampo('email')} placeholder="nombre@correo.com"
          value={datos.email} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={Boolean(errores.email)}
        />
        <div className="invalid-feedback">{errores.email}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-mensaje" className="form-label">Mensaje *</label>
        <textarea
          id="contacto-mensaje" name="mensaje" rows="4" ref={refs.mensaje}
          className={claseCampo('mensaje')} placeholder="Cuéntanos en qué podemos ayudarte (mínimo 10 caracteres)"
          value={datos.mensaje} onChange={handleChange} onBlur={handleBlur}
          aria-invalid={Boolean(errores.mensaje)}
        />
        <div className="d-flex justify-content-between">
          <div className="invalid-feedback d-block">{errores.mensaje}</div>
          <small className={`ms-auto ${datos.mensaje.length > MAX_MENSAJE ? 'text-danger' : 'text-muted'}`}>
            {datos.mensaje.length}/{MAX_MENSAJE}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg">Enviar mensaje</button>
    </form>
  )
}

export default ContactForm
