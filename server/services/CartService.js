const Cart = require("../models/Carts")
const Product = require("../models/Products")

class CartService {
    static async addProductToCart({ userId, productId, quantity }) {
        try {
            const product = await Product.findById(productId)
            if (!product) {
                throw new Error("Product not found")
            }
            if (product.count < quantity) {
                throw new Error("Not enough stock")
            }
            if (product.count === 0) {
                throw new Error("Product is out of stock")
            }
            const existingCartItem = await Cart.findOne({ userId, productId })
            if (existingCartItem) {
                existingCartItem.quantity += quantity
                await existingCartItem.save()
                product.count -= quantity
                await product.save()
                return existingCartItem
            }
            const data = await Cart.create({ userId, productId, quantity })
            product.count -= quantity
            await product.save()
            return data
        } catch (err) {
            throw err
        }
    }

    static async updateCartProduct({ userId, cartId, action }) {
        try {
            const cartItem = await Cart.findOne({ _id: cartId, userId })
            if (!cartItem) {
                throw new Error("Cart item not found")
            }
            const product = await Product.findById(cartItem.productId)
            if (!product) {
                throw new Error("Product not found")
            }
            if (action === "plus") {
                if (product.count === 0) {
                    throw new Error("Product is out of stock")
                }
                cartItem.quantity += 1
                product.count -= 1
            } else {
                if (cartItem.quantity === 1) {
                    await Cart.deleteOne({ _id: cartId, userId })
                    product.count += 1
                    await product.save()
                    return null
                }
                cartItem.quantity -= 1
                product.count += 1
            }
            await cartItem.save()
            await product.save()
            return cartItem
        } catch (err) {
            throw err
        }
    }

    static async deleteCartProduct({ userId, cartId }) {
        try {
            const cartItem = await Cart.findOne({ _id: cartId, userId })
            if (cartItem) {
                const product = await Product.findById(cartItem.productId)
                if (product) {
                    product.count += cartItem.quantity
                    await product.save()
                }
                await Cart.deleteOne({ _id: cartId, userId })
            }
            return true
        } catch (err) {
            throw err
        }
    }

    static async getUserCartProducts({ userId }) {
        try {
            const cartItems = await Cart.find({ userId }).populate('productId')
            return cartItems.map(item => {
                if (item.productId) {
                    const product = item.productId.toObject()
                    return {
                        ...product,
                        cartItemId: item._id,
                        quantity: item.quantity,
                        id: product._id
                    }
                }
                return null
            }).filter(item => item !== null)
        } catch (err) {
            throw err
        }
    }
}

module.exports = CartService