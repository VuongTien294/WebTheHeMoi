const BillProduct = require('../model/billProduct')
const Bill = require('../model/bill')
const Product = require('../model/product')

exports.create_billProduct = async (req, res) => {

    // var product = await getProduct(req.body.productId);
    BillProduct.create({
        unitPrice: req.body.unitPrice,
        quantity: req.body.quantity,
        billId: req.body.billId,
        productId: req.body.productId,
        productName: req.body.productName
    }, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.delete_billProduct = (req, res) => {
    BillProduct.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.get_all_billProduct = (req, res) => {
    BillProduct.find({}, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_a_billProduct = (req, res) => {
    console.log("id", req.params.id)
    BillProduct.findById(req.params.id, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_list_billProduct_by_billId = (req, res) => {
    BillProduct.find({ billId: req.params.billId }, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}