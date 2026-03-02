import app from './app.js'
import http from 'http'
import { Server } from 'socket.io'
import ProductManager from './managers/ProductManager.js'

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

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado')
  })
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})