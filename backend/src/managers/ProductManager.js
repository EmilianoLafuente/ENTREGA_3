//Logica y persistencia
import { ProductModel } from "../models/product.model.js"

    class ProductManager {
    
    //Devuelvo todos los prodcuts desde mongoDB
    async getProducts() {
        return ProductModel.find().lean()
    } 

    //Devuelvo el producto desde mongoDB
    async getProductById(id) {
    return ProductModel.findById(id).lean()
    }

    //Crear el producto en mongoDB
    async addProduct(productData) {
    const newProduct = await ProductModel.create(productData)
    return newProduct
    }

    //Actualizar un producto en mongoDB
    async updateProduct(id, updateData) {

    const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    )

    return updatedProduct

    }

    async deleteProduct(id) {

    const deletedProduct = await ProductModel.findByIdAndDelete(id)

    if (!deletedProduct) return false

    return true

    }

}


export default ProductManager