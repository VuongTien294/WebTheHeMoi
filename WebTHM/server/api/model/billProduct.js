const mongoose = require('mongoose')

const BillProductSchema = new mongoose.Schema({
	unitPrice:Number,
	quantity:Number,
	billId:String,
	productId:String,
	productName:String,
})

module.exports = mongoose.model('BillProduct' ,BillProductSchema)