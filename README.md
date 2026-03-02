# Backend 1 76800 – Entrega N°1  
**API de Productos y Carritos**  

---

## 📌 Descripción del proyecto

Este proyecto corresponde a la **Entrega N°1** del curso **Backend 1** de Coderhouse.  
Consiste en el desarrollo de una **API REST** utilizando **Node.js y Express**, que permite gestionar productos y carritos de compra, con persistencia de datos mediante archivos JSON.

No se incluye implementación visual, ya que toda la interacción se realiza mediante endpoints HTTP (Postman, navegador o cliente similar).

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- JavaScript (ES Modules)
- File System (`fs`)
- Nodemon (entorno de desarrollo)

---

## 📂 Estructura del proyecto

ENTREGA_1/
├─ backend/
│ ├─ src/
│ │ ├─ app.js
│ │ ├─ server.js
│ │ ├─ routes/
│ │ │ ├─ products.router.js
│ │ │ └─ carts.router.js
│ │ └─ managers/
│ │ ├─ ProductManager.js
│ │ └─ CartManager.js
│ └─ data/
│ ├─ products.json
│ └─ carts.json
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

👤 Autor
Emiliano Lafuente