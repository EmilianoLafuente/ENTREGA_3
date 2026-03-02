import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()
const productManager = new ProductManager('backend/data/products.json')

    //GET
router.get('/', async  (req, res) => {
  const products = await productManager.getProducts()

  res.json(products)
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params
  const product = await productManager.getProductById(pid)

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  res.json(product)
})

    //POST
router.post('/', async (req, res) => {
  const productData = req.body

  const newProduct = await productManager.addProduct(productData)

  res.status(201).json(newProduct)
})

    //PUT
router.put('/:pid', async (req, res) => {
  const { pid } = req.params
  const updateData = req.body

  const updatedProduct = await productManager.updateProduct(pid, updateData)

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  res.json(updatedProduct)
})

    //DELETE
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params

  const deleted = await productManager.deleteProduct(pid)

  if (!deleted) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  res.json({ message: 'Producto eliminado correctamente' })
})
export default router