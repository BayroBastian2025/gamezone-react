# 🎮 GameZone – Tienda online de videojuegos

**Evaluación Final Transversal (EFT) – Desarrollo Frontend I (PFY2201) · Duoc UC**
Autor: Bayro Rañileo

Sitio web de una tienda de videojuegos desarrollado con **HTML5, CSS3, JavaScript, Bootstrap 5 y React 18** (Vite). Evoluciona el eCommerce de la Semana 8 incorporando navegación por secciones, filtro por categoría, formulario de contacto con validación y gestión del catálogo.

## ✨ Funcionalidades

| Requerimiento de la EFT | Cómo se implementó |
|---|---|
| Página principal con productos en tarjetas (imagen, nombre, precio, descripción) | `ProductList` + `ProductCard` (Bootstrap `card`), generadas dinámicamente desde los datos |
| Barra de navegación entre secciones | `Navbar` (Bootstrap `navbar`, colapsable en móvil) con **Inicio · Catálogo · Contacto** y scroll suave |
| Filtrar por categoría | `CategoryFilter` (botones con contador) + buscador por nombre; el estado vive en `App` |
| Formulario de contacto (nombre, email, mensaje) con validación | `ContactForm` + `validarContacto()` (`utils/helpers.js`): errores por campo, validación en vivo y foco en el primer error |
| Datos de videojuegos como objetos JS (nombre, categoría, precio, descripción, imagen) | `public/data/productos.json` (arreglo de objetos) cargado con `fetch` dentro de `useEffect` |
| Estado para **agregar y eliminar** videojuegos | `ProductForm` (agregar) y botón 🗑 en cada tarjeta (eliminar) |
| Componentes con props y estado | 10 componentes reutilizables (ver estructura) |
| Responsive | Bootstrap Grid + Flexbox + CSS Grid, probado en móvil, tablet y escritorio |

Extras heredados de la Semana 8: carrito de compras (contador, cantidades, total), persistencia en `localStorage`, estados de carga/error y pantalla de compra finalizada.

## 🧱 Tecnologías y buenas prácticas
- **HTML semántico:** `header`, `nav`, `main`, `section` (con `aria-labelledby`), `article` (cada tarjeta) y `footer`.
- **Bootstrap 5:** navbar, cards, formularios con `is-valid`/`is-invalid`, botones, badges, alerts y sistema de grillas.
- **Flexbox y CSS Grid:** utilidades `d-flex` de Bootstrap y CSS propio (`.ventajas-grid`, `.filtros`) en `src/styles/index.css`.
- **JavaScript / DOM:** `scrollIntoView` para navegar, `useRef` + `focus()` para enfocar campos inválidos y `document.title` dinámico.
- **React:** `useState`, `useEffect`, props, renderizado condicional y componentes controlados.
- **Accesibilidad:** `label` asociados, `aria-label`, `aria-invalid`, `aria-pressed`, `role="alert"`.

## 📁 Estructura
```
src/
├── components/
│   ├── Navbar.jsx          barra de navegación (Inicio / Catálogo / Contacto / carrito)
│   ├── Hero.jsx            portada con ventajas (CSS Grid)
│   ├── CategoryFilter.jsx  botones de filtro por categoría
│   ├── ProductList.jsx     grilla responsive de tarjetas
│   ├── ProductCard.jsx     tarjeta de un videojuego
│   ├── ProductForm.jsx     formulario para agregar videojuegos
│   ├── Cart.jsx            carrito de compras
│   ├── ContactForm.jsx     formulario de contacto con validación
│   ├── Mensaje.jsx         mensajes de carga y error
│   └── Footer.jsx
├── utils/helpers.js        formato de precio, imágenes y validarContacto()
├── styles/index.css        estilos propios (Flexbox / Grid)
├── App.jsx                 estado global, efectos y funciones que se pasan por props
└── main.jsx
public/
├── data/productos.json     catálogo (nombre, categoría, precio, descripción, imagen)
└── img/                    portadas
capturas/                   evidencia de funcionamiento (semana8/ y eft/)
```

## 🔄 Flujo de datos (state y props)
`App` guarda el estado (`productos`, `carrito`, `categoriaFiltro`, `busqueda`, `mensajes`) y lo entrega a los hijos por **props**. Los hijos avisan los cambios con funciones recibidas por props (`onSeleccionar`, `onAgregar`, `onEliminarProducto`, `onEnviar`…). Por ejemplo, al filtrar en `CategoryFilter` se actualiza el estado de `App` y se re-renderiza `ProductList`.

## 🚀 Instalación y uso

**Requisitos:** [Node.js](https://nodejs.org) 18 o superior y Git.

```bash
# 1. Clonar el repositorio
git clone https://github.com/BayroBastian2025/gamezone-react.git
cd gamezone-react

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev          # abre http://localhost:5173

# 4. (Opcional) Generar la versión de producción y previsualizarla
npm run build
npm run preview      # http://localhost:4173
```

### Cómo usar el sitio
1. **Inicio:** revisa la portada y pulsa *Ver catálogo*.
2. **Filtrar:** usa los botones de categoría y/o el buscador; el número de cada botón indica cuántos juegos tiene.
3. **Agregar un videojuego:** botón *➕ Agregar videojuego*; completa título, categoría, descripción, precio (e imagen opcional).
4. **Eliminar un videojuego:** botón 🗑 en la tarjeta.
5. **Carrito:** *Agregar al carrito* en cada tarjeta y luego *🛒 Ver carrito* para cambiar cantidades o finalizar la compra.
6. **Contacto:** completa nombre, email y mensaje. Si falta información o el formato es incorrecto se muestran errores en cada campo; si es válido aparece la confirmación.

### Reglas de validación del formulario de contacto
- **Nombre:** obligatorio, mínimo 3 caracteres y sin números.
- **Email:** obligatorio y con formato válido (`texto@dominio.ext`).
- **Mensaje:** obligatorio, entre 10 y 500 caracteres.

## 🌐 Publicación en GitHub Pages (opcional)
```bash
npm run deploy     # compila y sube /dist a la rama gh-pages
```
Luego en GitHub: **Settings → Pages → Source: Deploy from a branch → gh-pages / (root)**.

## ✅ Pruebas realizadas
- Filtro por categoría, buscador, agregar/eliminar videojuegos y carrito.
- Formulario de contacto: campos vacíos, formatos inválidos y envío correcto.
- Responsive en 375 px (móvil), 768 px (tablet) y 1366 px (escritorio), sin scroll horizontal.
- Navegador probado: Chromium/Chrome. Evidencia en `capturas/eft/`.
