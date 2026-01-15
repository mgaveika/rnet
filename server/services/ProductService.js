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
    static async updateProductById({ id, ...body }) {
        try {
            const data = await Product.findByIdAndUpdate(id, body, { new: true })
            return data
        } catch (err) {
            throw err
        }
    }
    static async createProduct({ body }) {
        try {
            const data = await Product.create(body)
            return data
        } catch (err) {
            throw err
        }
    }
}

module.exports = ProductService