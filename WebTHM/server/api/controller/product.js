const Product = require('../model/product')
var Category = require('../model/category');
const fs = require('fs')

var cors = require('cors')

exports.create_product = async (req, res, next) => {
    const product = await new Product({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.file.path,
        description: req.body.description,
        category: req.body.category
    })

    //image: req.file.filename de luu ten file luon

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    quantity: result.quantity,
                    price: result.price,
                    image: result.image,
                    category: result.category,
                    description: result.description,
                    request: {
                        type: 'GET',
                        url: "http://localhost:4000/product/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.update_product = async (req, res) => {

    // if (req.file != undefined) {
    //     console.log('update image product')
    //     updateCategory['image'] = req.file.path;
    // }
    
        const updateProduct = {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.file.path,
            description: req.body.description,
            category: req.body.category
        };

        await Product.findByIdAndUpdate(req.params.id, updateProduct, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            }
            else {
                res.status(200).json({
                    message: 'Product updated',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/products' + result._id
                    }
                });
            }
        })

}

exports.update_product_when_buy_done = async (req, res) => {
    
     const product = await Product.findById(req.body.productId)


    const updateCategory = {
        name: product.name,
        quantity: product.quantity - req.body.buyQuantity,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category
    };

    await Product.findByIdAndUpdate(req.body.productId, updateCategory, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            res.status(200).json({
                message: 'Product updated',
            });
        }
    })
}

exports.delete_product = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.get_all_product = (req, res) => {
    Product.find({}, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_a_product = (req, res) => {
    Product.findById(req.params.id, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_a_product_by_name = (req, res) => {
    // Product.findOne(req.params.name, (err, result) => {
    //     if (err) res.send(err)
    //     res.send(result)
    // })

    Product.find({name:req.params.name}, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_list_product_by_cate = (req, res) => {
    Product.find({ category: req.params.category }, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })

}

exports.get_image = (req, res) => {
   let imageName = "resources/static/assets/uploads/"+req.query.imageName
   fs.readFile(imageName,(err,imageData)=>{
       if(err){
         res.json({
             result:"Failed",
             message:"Cannot upload image!"
         })
       }

    //    res.writeHead(200,{'Content-Type':'image/jpg'})
    //    res.writeHead(200,{'Content-Type':'application/json'})
       res.end(imageData)
   })
}
