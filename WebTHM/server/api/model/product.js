const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: Number,
    price: Number,
    image: String,
    description: String,
    category: String
   
})

module.exports = mongoose.model('Product' ,ProductSchema)