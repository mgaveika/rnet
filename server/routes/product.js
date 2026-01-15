const express = require('express')
const ProductService = require('../services/ProductService')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const data = await ProductService.createProduct({ body: { ...req.body, owner: req.userId } })
        res.json({ data: data, message: "Product created successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await ProductService.getAllProducts()
        res.json({ data: data, message: "Products fetched successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const data = await ProductService.getProductById({ id: req.params.id })
        res.json({ data: data, message: "Product fetched successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const data = await ProductService.updateProductById({ id: req.params.id, ...req.body })
        res.json({ data: data, message: "Product updated successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

module.exports = router