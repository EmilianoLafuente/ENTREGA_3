import app from './app.js'
import http from 'http'
import { Server } from 'socket.io'
import ProductManager from './managers/ProductManager.js'
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8080

// Crear servidor HTTP manual
const httpServer = http.createServer(app)

// Inicializar socket.io  
const io = new Server(httpServer)

// Exportarlo para usarlo en otras partes
export { io }

// Escuchar conexiones
const productManager = new ProductManager('backend/data/products.json')

io.on('connection', async (socket) => {
  console.log('🟢 Cliente conectado')

  const products = await productManager.getProducts()
  socket.emit('updateProducts', products)

  //Add con scoket.io
  socket.on('newProduct', async (productData) => {
    await productManager.addProduct(productData)

    const products = await productManager.getProducts()
    io.emit('updateProducts', products)
  })

  //Delete con scoket.io
  socket.on('deleteProduct', async (id) => {
  await productManager.deleteProduct(id)

  const products = await productManager.getProducts()
  io.emit('updateProducts', products)
})

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado')
  })
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})