const Category = require('../model/category')

exports.create_category = (req ,res) => {
    console.log("body " ,req.body)
    Category.create({
        name: req.body.name
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.update_category = (req ,res) => {
    console.log("Hello",req.params.id)
    Category.findByIdAndUpdate(req.params.id,{
        name: req.body.name
    },(err,result) => {
        if(err) res.send(err)
        else {
            res.send("update succesful !")
        }  
    })
}

exports.delete_category = (req ,res) => {
    Category.findByIdAndDelete(req.params.id,(error,result) => {
        if(error) res.send(err)
        res.send("success")
    })
}

exports.get_all_category = (req ,res) => {
    Category.find({},(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.get_a_category = (req ,res) => {
    console.log(typeof req.params.id)
    Category.findById(req.params.id ,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

//Test goi api theo ten
exports.get_a_category_by_name = (req ,res) => {
    console.log(req.params.name)
    console.log(req.body.name)
    Category.findOne(req.params.name,(err ,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}


