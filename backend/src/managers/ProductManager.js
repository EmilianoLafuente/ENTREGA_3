//Logica y persistencia

import fs from 'fs'

    class ProductManager {
        constructor(path) {
            this.path = path
    }
    

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            // Si el archivo no existe o está vacío
            return []
        }
    }  

    async getProductById(id) {
            const products = await this.getProducts()
            return products.find(p => p.id === id)
        }

    async addProduct(productData) {
        const products = await this.getProducts()

        const newProduct = {
        id: Date.now().toString(),
        ...productData
        }

        products.push(newProduct)

        await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2)
        )

        return newProduct
    }

    async updateProduct(id, updateData) {
        const products = await this.getProducts()

        const productExists = products.find(p => p.id === id)
        if (!productExists) return null

        const updatedProducts = products.map(p => {
        if (p.id === id) {
            return {
            ...p,
            ...updateData,
            id: p.id // asegura que el id no se modifique
            }
        }
        return p
        })

        await fs.promises.writeFile(
        this.path,
        JSON.stringify(updatedProducts, null, 2)
        )

        return updatedProducts.find(p => p.id === id)
    }

    async deleteProduct(id) {
        const products = await this.getProducts()

        const productExists = products.find(p => p.id === id)
        if (!productExists) return false

        const filteredProducts = products.filter(p => p.id !== id)

        await fs.promises.writeFile(
        this.path,
        JSON.stringify(filteredProducts, null, 2)
        )

        return true
    }

}




export default ProductManager