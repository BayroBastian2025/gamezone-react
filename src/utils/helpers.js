// Funciones auxiliares reutilizables (evitan duplicar código en los componentes)

// Formatea un número como precio en pesos chilenos: 24990 -> "$24.990"
export const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor)

// Imagen por defecto cuando una portada no carga
export const IMAGEN_POR_DEFECTO = `${import.meta.env.BASE_URL}img/default.svg`

// Las imágenes locales se resuelven con BASE_URL para que funcionen
// tanto en local como en GitHub Pages. Las URLs externas se dejan igual.
export const resolverImagen = (ruta) => {
  if (!ruta) return IMAGEN_POR_DEFECTO
  if (/^(https?:|data:)/.test(ruta)) return ruta
  return `${import.meta.env.BASE_URL}${ruta}`
}

/* ===================== Validación del formulario de contacto ===================== */

// Expresión regular simple para validar el formato de un email (texto@dominio.ext)
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Recibe { nombre, email, mensaje } y devuelve un objeto con los errores encontrados.
// Si el objeto devuelto está vacío, los datos son válidos.
export const validarContacto = ({ nombre, email, mensaje }) => {
  const errores = {}

  const nombreLimpio = nombre.trim()
  if (!nombreLimpio) errores.nombre = 'El nombre es obligatorio.'
  else if (nombreLimpio.length < 3) errores.nombre = 'El nombre debe tener al menos 3 caracteres.'
  else if (/\d/.test(nombreLimpio)) errores.nombre = 'El nombre no puede contener números.'

  const emailLimpio = email.trim()
  if (!emailLimpio) errores.email = 'El email es obligatorio.'
  else if (!REGEX_EMAIL.test(emailLimpio)) errores.email = 'Ingresa un email válido (ej: nombre@correo.com).'

  const mensajeLimpio = mensaje.trim()
  if (!mensajeLimpio) errores.mensaje = 'El mensaje es obligatorio.'
  else if (mensajeLimpio.length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  else if (mensajeLimpio.length > 500) errores.mensaje = 'El mensaje no puede superar los 500 caracteres.'

  return errores
}
