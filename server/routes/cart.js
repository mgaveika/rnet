const express = require('express')
const CartProvider = require('../services/CartService')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const data = await CartProvider.addProductToCart({ userId: req.userId, productId: req.body.productId, quantity: req.body.quantity })
        res.json({ data: data, message: "Product added to cart successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await CartProvider.getUserCartProducts({ userId: req.userId })
        res.json({ data: data, message: "Carts fetched successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const data = await CartProvider.updateCartProduct({ userId: req.userId, cartId: req.params.id, action: req.body.action })
        res.json({ data: data, message: "Product updated successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const data = await CartProvider.deleteCartProduct({ userId: req.userId, cartId: req.params.id })
        res.json({ data: data, message: "Product deleted successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

module.exports = router