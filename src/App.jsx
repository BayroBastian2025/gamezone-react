import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import ContactForm from './components/ContactForm'
import Cart from './components/Cart'
import Mensaje from './components/Mensaje'
import Footer from './components/Footer'

const CLAVE_CARRITO = 'gamezone-carrito'
const CLAVE_MENSAJES = 'gamezone-mensajes'

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
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos')

  // Mensajes del formulario de contacto (simulan el envío al administrador)
  const [mensajes, setMensajes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_MENSAJES)) || []
    } catch {
      return []
    }
  })

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

  // Efecto: guardar los mensajes de contacto
  useEffect(() => {
    localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(mensajes))
  }, [mensajes])

  /* ====================== VALORES DERIVADOS ====================== */
  // Se calculan a partir del estado (no necesitan estado propio)
  const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  // Efecto 3: refleja la cantidad de productos en el título de la pestaña
  useEffect(() => {
    document.title = totalItems > 0 ? `(${totalItems}) GameZone` : 'GameZone | eCommerce de videojuegos'
  }, [totalItems])

  const categorias = ['Todos', ...new Set(productos.map((p) => p.categoria))]

  // Cantidad de juegos por categoría (para el contador de cada botón del filtro)
  const conteo = productos.reduce((acc, p) => ({ ...acc, [p.categoria]: (acc[p.categoria] || 0) + 1 }), { Todos: productos.length })

  const productosFiltrados = productos.filter(
    (p) =>
      (categoriaFiltro === 'Todos' || p.categoria === categoriaFiltro) &&
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

  // Navegación entre secciones: si se está viendo el carrito, vuelve al catálogo
  // y luego hace scroll suave hasta la sección pedida (manipulación del DOM)
  const navegar = (id) => {
    setVistaCarrito(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  // Recibe un mensaje de contacto ya validado por ContactForm
  const enviarContacto = (datos) => {
    setMensajes((actual) => [...actual, { ...datos, fecha: new Date().toISOString() }])
  }

  /* ====================== RENDER ====================== */
  return (
    <>
      <header className="sticky-top">
        <Navbar
          totalItems={totalItems}
          total={total}
          vistaCarrito={vistaCarrito}
          onToggleCarrito={() => setVistaCarrito((v) => !v)}
          onNavegar={navegar}
        />
      </header>

      <main className="container py-4">
        {/* Renderizado condicional principal: carrito o página de inicio */}
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
            <Hero
              totalJuegos={productos.length}
              totalCategorias={categorias.length - 1}
              onVerCatalogo={() => navegar('catalogo')}
            />

            <section id="catalogo" aria-labelledby="titulo-catalogo" className="mb-5">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 id="titulo-catalogo" className="h3 mb-0">Catálogo de videojuegos</h2>

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
                  <div className="filtros mb-4">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="🔍 Buscar videojuego..."
                      aria-label="Buscar videojuego por nombre"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <CategoryFilter
                      categorias={categorias}
                      activa={categoriaFiltro}
                      conteo={conteo}
                      onSeleccionar={setCategoriaFiltro}
                    />
                  </div>

                  <ProductList
                    productos={productosFiltrados}
                    carrito={carrito}
                    onAgregar={agregarAlCarrito}
                    onEliminarProducto={eliminarProducto}
                  />
                </>
              )}
            </section>

            <section id="contacto" aria-labelledby="titulo-contacto" className="mb-4">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-6">
                  <h2 id="titulo-contacto" className="h3 mb-1">Contacto</h2>
                  <p className="text-muted">¿Dudas o sugerencias? Escríbele al administrador de la tienda.</p>
                  <ContactForm onEnviar={enviarContacto} />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
