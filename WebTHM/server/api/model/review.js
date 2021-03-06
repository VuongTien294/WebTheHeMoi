const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    star: {
        type: Number,
        required: true
    },
    product: Object,
    user: Object,
    review_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Review' ,ReviewSchema)