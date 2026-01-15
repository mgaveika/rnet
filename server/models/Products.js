const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    count: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)