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
