const Comment = require('../model/comment')
const User = require('../model/user')
const Product = require('../model/product')

exports.create_comment = async (req, res) => {
    var product =await Product.findById(req.body.productId)
    var user = await User.findById(req.body.userId)

    Comment.create({
        content: req.body.content,
        productId: req.body.productId,
        productName : product.name,
        userId: req.body.userId,
        userName: user.name

    }, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.update_comment = (req, res) => {
     Comment.findByIdAndUpdate(req.params.id,
        {
            content: req.body.content,
            userId: req.body.userId,
            productId: req.body.productId
        }
        , (err, result) => {
            if (err) res.send(err)
            else {
                res.send("update succesful !")
            }
        })
}

exports.delete_comment = (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.get_all_comment = (req, res) => {
    Comment.find({}, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_a_comment = (req, res) => {
    console.log("id", req.params.id)
    Comment.findById(req.params.id, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_list_comment_by_productId = (req, res) => {
    console.log("id", req.params.id)
    Comment.find({ productId: req.params.productId }, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}
