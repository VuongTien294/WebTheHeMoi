const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    productId: String,
    productName:String,
    userId: String,
    userName:String
})

module.exports = mongoose.model('Comment' ,CommentSchema)