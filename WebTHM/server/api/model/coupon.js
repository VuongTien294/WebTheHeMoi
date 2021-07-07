const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    code: String,
    discountPersent: Number,
    status: String
})

module.exports = mongoose.model('Coupon' ,CouponSchema)