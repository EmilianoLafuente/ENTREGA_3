import { CartModel } from "../models/cart.model.js";

class CartManager {

  async createCart() {

    const newCart = await CartModel.create({
      products: []
    });

    return newCart;

  }

  async getCartById(id) {

    const cart = await CartModel
      .findById(id)
      .populate("products.product")
      .lean();

    return cart;

  }

  async addProductToCart(cartId, productId) {

    const cart = await CartModel.findById(cartId);

    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === productId
    );

    if (productIndex !== -1) {

      cart.products[productIndex].quantity += 1;

    } else {

      cart.products.push({
        product: productId,
        quantity: 1
      });

    }

    await cart.save();

    return cart;

  }

}

export default CartManager;