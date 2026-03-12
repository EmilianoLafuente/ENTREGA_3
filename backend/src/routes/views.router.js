import { Router } from 'express'
import { ProductModel } from '../models/product.model.js'
import { CartModel } from "../models/cart.model.js"

const router = Router()

// LISTA PRODUCTOS
router.get("/products", async (req, res) => {

  const { page = 1 } = req.query

  const result = await ProductModel.paginate({}, {
    page,
    limit: 10,
    lean: true
  })

  res.render("home", {
    products: result.docs,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: `?page=${result.prevPage}`,
    nextLink: `?page=${result.nextPage}`
  })

  

})

// DETALLE PRODUCTO
router.get("/products/:pid", async (req, res) => {

  const product = await ProductModel
    .findById(req.params.pid)
    .lean()

  res.render("product", { product })

})

// VER CARRITO
router.get("/carts/:cid", async (req, res) => {

  const cart = await CartModel
    .findById(req.params.cid)
    .populate("products.product")
    .lean()

  res.render("cart", { cart })

})


export default router