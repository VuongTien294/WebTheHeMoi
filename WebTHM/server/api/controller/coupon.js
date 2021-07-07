const Coupon = require('../model/coupon')

exports.create_coupon = (req ,res) => {
    Coupon.create({
        code: req.body.code,
        discountPersent: req.body.discountPersent,
        status:req.body.status
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.update_coupon = (req ,res) => {
    Coupon.findByIdAndUpdate(req.params.id,{
        code: req.body.code,
        discountPersent: req.body.discountPersent,
        status:req.body.status
    },(err,result) => {
        if(err) res.send(err)
        else {
            res.send("update succesful !")
        }  
    })
}

exports.delete_coupon = (req ,res) => {
    Coupon.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(err)
        res.send("success")
    })
}

exports.get_a_coupon_by_id = (req, res) => {
    Coupon.findById(req.params.id, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_all_coupon = (req ,res) => {
    Coupon.find({},(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.get_a_coupon_by_code = (req ,res) => {
    Coupon.findOne({code:req.params.code},(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}


