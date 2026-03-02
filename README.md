# Backend 1 76800 – Entrega N°2  
**API de Productos y Carritos + Handlebars + WebSockets**  

---

## 📌 Descripción del proyecto

Este proyecto corresponde a la **Entrega N°2** del curso Backend 1 de Coderhouse.

Se parte de la API REST desarrollada en la Entrega N°1 y se amplía incorporando:

Motor de plantillas Handlebars
Comunicación en tiempo real con WebSockets (Socket.io)
Vista dinámica de productos en tiempo real

La aplicación permite:
Gestionar productos y carritos mediante API REST.
Visualizar productos renderizados con Handlebars.
Agregar y eliminar productos en tiempo real sin recargar la página.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- Express-Handlebars
- Socket.io
- JavaScript (ES Modules)
- File System (`fs`)
- Nodemon (entorno de desarrollo)

---

## 📂 Estructura del proyecto

ENTREGA_2/
├─ backend/
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ server.js
│  │  ├─ routes/
│  │  │  ├─ products.router.js
│  │  │  ├─ carts.router.js
│  │  │  └─ views.router.js
│  │  ├─ managers/
│  │  │  ├─ ProductManager.js
│  │  │  └─ CartManager.js
│  │  ├─ views/
│  │  │  ├─ home.handlebars
│  │  │  ├─ realTimeProducts.handlebars
│  │  │  └─ layouts/
│  │  │     └─ main.handlebars
│  │  └─ public/
│  │     └─ js/
│  │        └─ realtime.js
│  └─ data/
│     ├─ products.json
│     └─ carts.json
├─ package.json
├─ package-lock.json
└─ README.md

---

## ▶️ Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>

2️⃣ Instalar dependencias

Desde la raíz del proyecto:

npm install

3️⃣ Ejecutar el servidor

Modo desarrollo:

npm run dev


El servidor se levanta en:

http://localhost:8080 o PORT definido en .env

---

📦 Endpoints disponibles
📍 Productos (/api/products)
🔹 GET /

Obtiene todos los productos.

GET /api/products

🔹 GET /:pid

Obtiene un producto por su ID.

GET /api/products/:pid

🔹 POST /

Crea un nuevo producto (el ID se genera automáticamente).

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

Actualiza un producto por ID (no modifica el ID).

PUT /api/products/:pid

🔹 DELETE /:pid

Elimina un producto por ID.

DELETE /api/products/:pid

🛒 Carritos (/api/carts)
🔹 POST /

Crea un nuevo carrito vacío.

POST /api/carts

🔹 GET /:cid

Obtiene los productos del carrito indicado.

GET /api/carts/:cid

🔹 POST /:cid/product/:pid

Agrega un producto al carrito.
Si el producto ya existe, incrementa la cantidad.

POST /api/carts/:cid/product/:pid

💾 Persistencia de datos

La información se almacena en archivos JSON:

backend/data/products.json
backend/data/carts.json

La lógica de acceso y manipulación de datos se encuentra desacoplada en las clases:

ProductManager
CartManager


🖥️ Vistas con Handlebars
🔹 Home
GET /

Renderiza la lista de productos utilizando Handlebars.

🔹 Productos en Tiempo Real
GET /realtimeproducts

Vista que:

Muestra productos renderizados con Handlebars.

Permite agregar productos mediante WebSocket.

Permite eliminar productos mediante WebSocket.

Se actualiza automáticamente en tiempo real sin recargar la página.

⚡ WebSockets

Se implementa Socket.io para:

Enviar lista de productos al conectar un cliente.

Emitir evento updateProducts cuando:

Se crea un producto.

Se elimina un producto.

Permitir creación y eliminación desde el frontend vía eventos:

newProduct

deleteProduct

Esto permite una experiencia en tiempo real sincronizada entre múltiples clientes conectados.



👤 Autor
Emiliano Lafuente