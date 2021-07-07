const Bill = require('../model/bill')
const User = require('../model/user')

exports.create_bill = (req ,res) => {
    Bill.create({
        buyerId:req.body.buyerId,
        status:req.body.status,
        priceTotal: req.body.priceTotal,
        discountPercent: req.body.discountPercent,
        couponName: req.body.couponName
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.update_bill = (req ,res) => {

    const updateBill = {
        discountPercent: req.body.discountPercent,
        couponName: req.body.couponName,
        buyerId:req.body.buyerId,
        status:req.body.status,
        priceTotal:req.body.priceTotal
    };

    Bill.findByIdAndUpdate(req.params.id,updateBill,(error,result) => {
        if(error) res.send(err)
        res.send("update succesful !")
    })
}

exports.delete_bill = (req ,res) => {
    Bill.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.get_all_bill = (req ,res) => {
    Bill.find({},(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.get_a_bill = (req ,res) => {
    console.log("id",req.params.id)
    Bill.findById(req.params.id ,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.get_a_bill_by_user = (req ,res) => {
    Bill.find({buyerId: req.params.buyerId} ,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}
