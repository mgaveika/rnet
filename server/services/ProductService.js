const Product = require("../models/Products")

class ProductService {
    static async getAllProducts() {
        try {
            const data = await Product.find()
            return data
        } catch (err) {
            throw err
        }
    }
    static async getProductById({ id }) {
        try {
            const data = await Product.findById(id)
            return data
        } catch (err) {
            throw err
        }
    }
}

module.exports = ProductService