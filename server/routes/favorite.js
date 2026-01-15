const express = require('express')
const FavoriteService = require('../services/FavoriteService')

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const data = await FavoriteService.getUserFavoriteProducts({ userId: req.userId })
        res.json({ data: data, message: "Favorite products fetched successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const data = await FavoriteService.isProductFavorite({ productId: req.params.id, userId: req.userId })
        res.json({ data: data, message: "Favorite product fetched successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})
router.post('/:id', async (req, res) => {
    try {
        const data = await FavoriteService.setUserFavoriteProduct({ productId: req.params.id, userId: req.userId })
        res.json({ data: data, message: "Favorite product set successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const data = await FavoriteService.removeUserFavoriteProduct({ productId: req.params.id, userId: req.userId })
        res.json({ data: data, message: "Favorite product removed successfully!", status: "success" })
    } catch (err) {
        res.json({ data: null, message: err.message, status: "error" })
    }
})

module.exports = router