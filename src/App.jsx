import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Cart from './components/Cart'
import Mensaje from './components/Mensaje'
import Footer from './components/Footer'

const CLAVE_CARRITO = 'gamezone-carrito'

function App() {
  /* ====================== ESTADOS (useState) ====================== */

  // Catálogo de productos (se llena con useEffect al cargar los datos)
  const [productos, setProductos] = useState([])

  // Carrito de compras. Se inicializa con "lazy initializer" leyendo
  // lo que quedó guardado en localStorage (si existe).
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []
    } catch {
      return []
    }
  })

  // Estados de carga y error de la petición de datos
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Estados de interfaz (elementos interactivos)
  const [vistaCarrito, setVistaCarrito] = useState(false) // catálogo <-> carrito
  const [mostrarForm, setMostrarForm] = useState(false)   // botón que cambia de texto
  const [busqueda, setBusqueda] = useState('')
  const [generoFiltro, setGeneroFiltro] = useState('Todos')

  /* ====================== EFECTOS (useEffect) ====================== */

  // Efecto 1: cargar los productos desde un archivo JSON (fetch) al montar el componente.
  // El arreglo de dependencias vacío [] hace que se ejecute una sola vez.
  useEffect(() => {
    let cancelado = false // evita actualizar el estado si el componente se desmonta

    const cargarProductos = async () => {
      try {
        const respuesta = await fetch(`${import.meta.env.BASE_URL}data/productos.json`)
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`)
        const datos = await respuesta.json()

        // Pequeña espera para simular la latencia de una API real y mostrar el "cargando"
        await new Promise((resolver) => setTimeout(resolver, 900))

        if (!cancelado) setProductos(datos) // actualiza el estado con los datos cargados
      } catch (err) {
        if (!cancelado) setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.')
        console.error(err)
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    cargarProductos()
    return () => { cancelado = true } // función de limpieza
  }, [])

  // Efecto 2: guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  /* ====================== VALORES DERIVADOS ====================== */
  // Se calculan a partir del estado (no necesitan estado propio)
  const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  // Efecto 3: refleja la cantidad de productos en el título de la pestaña
  useEffect(() => {
    document.title = totalItems > 0 ? `(${totalItems}) GameZone` : 'GameZone | eCommerce de videojuegos'
  }, [totalItems])

  const generos = ['Todos', ...new Set(productos.map((p) => p.genero))]

  const productosFiltrados = productos.filter(
    (p) =>
      (generoFiltro === 'Todos' || p.genero === generoFiltro) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase().trim()),
  )

  /* ====================== FUNCIONES (se pasan por props) ====================== */

  // Agrega un producto al carrito (si no estaba)
  const agregarAlCarrito = (producto) => {
    setCarrito((actual) =>
      actual.some((item) => item.id === producto.id)
        ? actual
        : [...actual, { id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: 1 }],
    )
  }

  // Suma o resta unidades a un producto del carrito (mínimo 1)
  const cambiarCantidad = (id, delta) => {
    setCarrito((actual) =>
      actual.map((item) => (item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item)),
    )
  }

  const quitarDelCarrito = (id) => setCarrito((actual) => actual.filter((item) => item.id !== id))
  const vaciarCarrito = () => setCarrito([])

  // Agrega un nuevo producto al catálogo desde el formulario
  const agregarProducto = (nuevo) => {
    setProductos((actual) => [nuevo, ...actual])
    setMostrarForm(false)
  }

  // Elimina un producto del catálogo (y del carrito si estaba)
  const eliminarProducto = (id) => {
    setProductos((actual) => actual.filter((p) => p.id !== id))
    quitarDelCarrito(id)
  }

  /* ====================== RENDER ====================== */
  return (
    <>
      <Navbar
        totalItems={totalItems}
        total={total}
        vistaCarrito={vistaCarrito}
        onToggleCarrito={() => setVistaCarrito((v) => !v)}
      />

      <main className="container py-4">
        {/* Renderizado condicional principal: carrito o catálogo */}
        {vistaCarrito ? (
          <Cart
            carrito={carrito}
            total={total}
            onCambiarCantidad={cambiarCantidad}
            onQuitar={quitarDelCarrito}
            onVaciar={vaciarCarrito}
            onVolver={() => setVistaCarrito(false)}
          />
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <h1 className="h3 mb-0">Catálogo de videojuegos</h1>

              {/* El texto del botón cambia según el estado mostrarForm */}
              <button className="btn btn-outline-primary" onClick={() => setMostrarForm(!mostrarForm)}>
                {mostrarForm ? '✖ Cerrar formulario' : '➕ Agregar videojuego'}
              </button>
            </div>

            {mostrarForm && <ProductForm onAdd={agregarProducto} />}

            {/* Estados de carga / error / datos */}
            {cargando && <Mensaje tipo="cargando" texto="Cargando catálogo..." />}
            {error && <Mensaje tipo="error" texto={error} />}

            {!cargando && !error && (
              <>
                <div className="row g-2 mb-4">
                  <div className="col-md-8">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="🔍 Buscar videojuego..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select" value={generoFiltro} onChange={(e) => setGeneroFiltro(e.target.value)}>
                      {generos.map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <ProductList
                  productos={productosFiltrados}
                  carrito={carrito}
                  onAgregar={agregarAlCarrito}
                  onEliminarProducto={eliminarProducto}
                />
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
