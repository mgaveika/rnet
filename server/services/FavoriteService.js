const Favorite = require("../models/Favorites")
const Product = require("../models/Products")

class FavoriteService {
    static async getUserFavoriteProducts({ userId }) {
        try {
            const data = await Favorite.find({ userId })
            const products = await Product.find({ _id: { $in: data.map(f => f.productId) } })
            return products
        } catch (err) {
            throw err
        }
    }
    static async isProductFavorite({ productId, userId }) {
        try {
            const data = await Favorite.findOne({ productId, userId })
            return data !== null
        } catch (err) {
            throw err
        }
    }
    static async setUserFavoriteProduct({ productId, userId }) {
        try {
            const data = await Favorite.create({ productId, userId })
            return data
        } catch (err) {
            throw err
        }
    }
    static async removeUserFavoriteProduct({ productId, userId }) {
        try {
            const data = await Favorite.deleteOne({ productId, userId })
            return data
        } catch (err) {
            throw err
        }
    }
}

module.exports = FavoriteService