import { Router } from 'express'
import { CartModel } from '../models/cart.model.js'
import CartManager from '../managers/CartManager.js'

const router = Router()
const cartManager = new CartManager()

// GET carrito
router.get("/:cid", async (req, res) => {

  const cart = await CartModel
    .findById(req.params.cid)
    .populate("products.product")
    .lean()

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" })
  }

  res.json(cart)
})


// POST crear carrito
router.post('/', async (req, res) => {

  const newCart = await cartManager.createCart()

  res.status(201).json(newCart)

})

// POST agregar producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {

  const { cid, pid } = req.params

  const cart = await CartModel.findById(cid)

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" })
  }

  const productIndex = cart.products.findIndex(
    p => p.product.toString() === pid
  )

  if (productIndex !== -1) {

    cart.products[productIndex].quantity += 1

  } else {

    cart.products.push({
      product: pid,
      quantity: 1
    })

  }

  await cart.save()

  res.json(cart)

})

// PUT actualizar todos los productos
router.put("/:cid", async (req, res) => {

  const products = req.body.products

  const cart = await CartModel.findByIdAndUpdate(
    req.params.cid,
    { products },
    { new: true }
  )

  res.json(cart)

})


// PUT actualizar cantidad de producto
router.put("/:cid/products/:pid", async (req, res) => {

  const { quantity } = req.body

  const cart = await CartModel.findById(req.params.cid)

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" })
  }

  const product = cart.products.find(
    p => p.product.toString() === req.params.pid
  )

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado en carrito" })
  }

  product.quantity = quantity

  await cart.save()

  res.json(cart)

})


// DELETE eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {

  const cart = await CartModel.findById(req.params.cid)

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" })
  }

  cart.products = cart.products.filter(
    p => p.product.toString() !== req.params.pid
  )

  await cart.save()

  res.json({ status: "producto eliminado" })

})


// DELETE vaciar carrito
router.delete("/:cid", async (req, res) => {

  await CartModel.findByIdAndUpdate(req.params.cid, {
    products: []
  })

  res.json({ status: "carrito vaciado" })

})

export default router