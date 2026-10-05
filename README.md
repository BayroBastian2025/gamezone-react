# 🎮 GameZone – eCommerce de videojuegos con React

Proyecto de la **Semana 8 – Desarrollo Frontend I (PFY2201)**: *Mejorando funcionalidades clave en el eCommerce con React*.

## Funcionalidades
- **useState**: catálogo, carrito, vista (catálogo/carrito), formulario, búsqueda y filtro por género.
- **useEffect**: carga dinámica del catálogo desde `public/data/productos.json` con `fetch` (con simulación de latencia), persistencia del carrito en `localStorage` y contador en el título de la pestaña.
- **Renderizado condicional**: spinner de carga, mensaje de error, carrito vacío, botón *Agregar al carrito* → *✔ En el carrito*, botón que alterna *Ver carrito / Volver al catálogo*, contador (badge), mensaje de "sin resultados" y pantalla de compra exitosa.
- **Props y componentes reutilizables**: `Navbar`, `ProductList`, `ProductCard`, `ProductForm`, `Cart`, `Mensaje`, `Footer`.
- **Bootstrap 5** para el diseño responsivo.

## Estructura
```
src/
├── components/   Navbar, ProductList, ProductCard, ProductForm, Cart, Mensaje, Footer
├── utils/        helpers.js (formato de precio, resolución de imágenes)
├── styles/       index.css
├── App.jsx       estado global, efectos y funciones
└── main.jsx
public/
├── data/productos.json   datos cargados con useEffect
└── img/                  portadas
capturas/                  capturas de pantalla para la entrega
```

## Ejecutar en local
```bash
npm install
npm run dev        # http://localhost:5173
```

## Publicar en GitHub Pages
```bash
npm run deploy     # compila y sube /dist a la rama gh-pages
```
Luego en GitHub: **Settings → Pages → Source: Deploy from a branch → gh-pages / (root)**.
