const mongoose = require('mongoose')

const BillSchema = new mongoose.Schema({
    buyerId:String,
    status:String,
    priceTotal: Number,
    discountPercent:{
        type:Number,
        default:0
    },
    couponName: {
        type:String,
        default :"Khong"
    }
})

module.exports = mongoose.model('Bill' ,BillSchema)