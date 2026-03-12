import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'
import { ProductModel } from '../models/product.model.js'
import { io } from '../server.js'

const router = Router()
const productManager = new ProductManager()

    //GET
router.get("/", async (req, res) => {

  try {

    let { limit = 10, page = 1, sort, query } = req.query;

    let filter = {};

    if (query) {

      if (query === "available") {
        filter.stock = { $gt: 0 };
      } else {
        filter.category = query;
      }

    }

    let options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const result = await ProductModel.paginate(filter, options);

    res.json({

      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,

      prevLink: result.hasPrevPage
        ? `?page=${result.prevPage}`
        : null,

      nextLink: result.hasNextPage
        ? `?page=${result.nextPage}`
        : null

    });

  } catch (error) {

    res.status(500).json({
      status: "error",
      error: error.message
    });

  }

});

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

  //socket.io
  const products = await productManager.getProducts()
  io.emit('updateProducts', products)

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

  //socket.io
  const products = await productManager.getProducts()
  io.emit('updateProducts', products)

  res.json({ message: 'Producto eliminado correctamente' })
})
export default router