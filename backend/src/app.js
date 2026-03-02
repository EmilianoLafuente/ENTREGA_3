//app.js para Express, middlewares y rutas
import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()

app.use(express.json())

//routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


export default app