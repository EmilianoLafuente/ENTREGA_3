import fs from 'fs'

class CartManager {
  constructor(path) {
    this.path = path
  }


    async createCart() {
        let carts = []

        try {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        carts = JSON.parse(data)
        } catch (error) {
        carts = []
        }

        const newCart = {
        id: Date.now().toString(),
        products: []
        }

        carts.push(newCart)

        await fs.promises.writeFile(
        this.path,
        JSON.stringify(carts, null, 2)
        )

        return newCart
    }

    async getCartById(id) {
        try {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)

        return carts.find(c => c.id === id) || null
        } catch (error) {
        return null
        }
    }

    async addProductToCart(cartId, productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)

        const cartIndex = carts.findIndex(c => c.id === cartId)
        if (cartIndex === -1) return null

        const cart = carts[cartIndex]

        const productIndex = cart.products.findIndex(
        p => p.product === productId
        )

        if (productIndex !== -1) {
        // El producto ya existe, incrementa quantity
        cart.products[productIndex].quantity += 1
        } else {
        // El producto no existe, se agrega
        cart.products.push({
            product: productId,
            quantity: 1
        })
        }

        carts[cartIndex] = cart

        await fs.promises.writeFile(
        this.path,
        JSON.stringify(carts, null, 2)
        )

        return cart
    }

}

export default CartManager