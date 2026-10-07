/**
 * Portada de la tienda (sección "Inicio").
 * Props:
 *  - totalJuegos: cantidad de videojuegos disponibles (viene del estado de App)
 *  - totalCategorias: cantidad de categorías distintas
 *  - onVerCatalogo: función para bajar al catálogo
 */
const VENTAJAS = [
  { icono: '🚚', titulo: 'Despacho rápido', texto: 'Recibe tus juegos en 24-48 horas a todo Chile.' },
  { icono: '🔒', titulo: 'Compra segura', texto: 'Tus datos protegidos en cada transacción.' },
  { icono: '🎁', titulo: 'Ofertas semanales', texto: 'Nuevos descuentos cada semana en el catálogo.' },
]

function Hero({ totalJuegos, totalCategorias, onVerCatalogo }) {
  return (
    <section id="inicio" className="hero rounded-4 text-light p-4 p-md-5 mb-5" aria-labelledby="titulo-hero">
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
        <div>
          <h1 id="titulo-hero" className="display-5 fw-bold">Tu próxima aventura empieza aquí 🎮</h1>
          <p className="lead mb-4">
            {totalJuegos} videojuegos en {totalCategorias} categorías. Filtra, compara y arma tu carrito.
          </p>
          <button className="btn btn-warning btn-lg fw-semibold" onClick={onVerCatalogo}>
            Ver catálogo
          </button>
        </div>
      </div>

      {/* Ventajas organizadas con CSS Grid (ver .ventajas-grid en index.css) */}
      <ul className="ventajas-grid list-unstyled mt-5 mb-0">
        {VENTAJAS.map((v) => (
          <li key={v.titulo} className="ventaja">
            <span className="fs-2" aria-hidden="true">{v.icono}</span>
            <div>
              <strong className="d-block">{v.titulo}</strong>
              <small>{v.texto}</small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Hero
