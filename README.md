# Backend 1 76800 – Entrega N°3  
**API de Productos y Carritos + MongoDB + Mongoose + Paginación + Handlebars**  

---

## 📌 Descripción del proyecto

Este proyecto corresponde a la Entrega Final **Entrega N°3** del curso Backend 1 de Coderhouse.

A partir de la aplicación desarrollada en la Entrega N°2, se realiza una migración de la persistencia de datos desde archivos JSON hacia MongoDB, utilizando Mongoose como ODM.

Además se implementan funcionalidades avanzadas como:

Paginación de productos

Filtros y ordenamientos

Relación entre carritos y productos mediante populate

Vistas dinámicas con Handlebars

La aplicación permite:

Gestionar productos y carritos mediante API REST

Persistir los datos en MongoDB Atlas

Consultar productos con paginación, filtros y ordenamiento

Visualizar productos y carritos mediante Handlebars

---

## 🛠️ Tecnologías utilizadas

Node.js
Express
MongoDB Atlas
Mongoose
mongoose-paginate-v2
Express-Handlebars
Socket.io
JavaScript (ES Modules)
Nodemon
Dotenv

---

## 📂 Estructura del proyecto

ENTREGA_3/
├─ backend/
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ server.js
│  │  ├─ config/
│  │  │  └─ mongo.js
│  │  ├─ models/
│  │  │  ├─ product.model.js
│  │  │  └─ cart.model.js
│  │  ├─ routes/
│  │  │  ├─ products.router.js
│  │  │  ├─ carts.router.js
│  │  │  └─ views.router.js
│  │  ├─ managers/
│  │  │  ├─ ProductManager.js
│  │  │  └─ CartManager.js
│  │  ├─ views/
│  │  │  ├─ home.handlebars
│  │  │  ├─ product.handlebars
│  │  │  ├─ cart.handlebars
│  │  │  └─ layouts/
│  │  │     └─ main.handlebars
│  │  └─ public/
│  │     └─ js/
│  │        └─ realtime.js
│  └─ data/
├─ package.json
├─ package-lock.json
├─ .env
└─ README.md

---

## ▶️ Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>

2️⃣ Instalar dependencias

Desde la raíz del proyecto:

npm install

3️⃣ Configurar variables de entorno

Crear archivo .env en la raíz del proyecto:

MONGO_URI=TU_URI_DE_MONGODB_ATLAS
PORT=8080

4️⃣ Ejecutar el servidor

Modo desarrollo:
npm run dev

El servidor se levanta en:
http://localhost:8080

---

📦 Endpoints disponibles

📍 Productos (/api/products)

🔹 GET /
Obtiene productos con paginación, filtros y ordenamiento.

Ejemplo:

GET /api/products
GET /api/products?limit=5
GET /api/products?page=2
GET /api/products?sort=asc
GET /api/products?query=category
GET /api/products?query=available

Respuesta:

{
  "status": "success",
  "payload": [],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}
🔹 GET /:pid
Obtiene un producto por ID.
GET /api/products/:pid

🔹 POST /
Crea un nuevo producto.
POST /api/products

Body ejemplo:

{
  "title": "Producto prueba",
  "description": "Descripción del producto",
  "code": "ABC123",
  "price": 100,
  "status": true,
  "stock": 10,
  "category": "test",
  "thumbnails": []
}
🔹 PUT /:pid
Actualiza un producto.
PUT /api/products/:pid

🔹 DELETE /:pid
Elimina un producto.

🔹 DELETE /api/products/:pid
🛒 Carritos (/api/carts)

🔹 POST /
Crea un carrito vacío.
POST /api/carts

🔹 GET /:cid
Obtiene un carrito con populate de productos.
GET /api/carts/:cid

🔹 PUT /:cid
Actualiza todos los productos del carrito.
PUT /api/carts/:cid

🔹 PUT /:cid/products/:pid
Actualiza la cantidad de un producto específico en el carrito.
PUT /api/carts/:cid/products/:pid

Body ejemplo:

{
  "quantity": 5
}

🔹 DELETE /:cid/products/:pid
Elimina un producto del carrito.
DELETE /api/carts/:cid/products/:pid

🔹 DELETE /:cid
Vacía completamente el carrito.
DELETE /api/carts/:cid

-------------------------------------

🗄️ Persistencia de datos

La persistencia ahora se realiza en MongoDB Atlas utilizando Mongoose.

Se utilizan los siguientes modelos:
ProductModel

Colección:
products

Campos principales:

title
description
price
stock
category
code
status

Además incluye paginación con mongoose-paginate-v2.
CartModel

Colección:
carts

Estructura:

products: [
  {
    product: {
      type: ObjectId,
      ref: "products"
    },
    quantity: Number
  }
]

Esto permite usar:
populate("products.product")

para obtener los productos completos del carrito.


🖥️ Vistas con Handlebars
🔹 Lista de productos
GET /products

Renderiza productos con paginación.

🔹 Detalle de producto
GET /products/:pid

Muestra información completa del producto.

🔹 Visualización de carrito
GET /carts/:cid

Lista los productos pertenecientes al carrito.

⚡ WebSockets

Se mantiene soporte de Socket.io para conexiones en tiempo real.

Permite:
Conexión de clientes
Actualización dinámica de productos en la interfaz

👤 Autor
Emiliano Lafuente