import dotenv from "dotenv";
dotenv.config();

import app from './app.js'
import http from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 8080

// Crear servidor HTTP
const httpServer = http.createServer(app)

// Inicializar socket.io
const io = new Server(httpServer)

// Exportarlo para usarlo en otras partes
export { io }

// Conexión de clientes (solo logs)
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado')

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado')
  })
})

// Levantar servidor
httpServer.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})