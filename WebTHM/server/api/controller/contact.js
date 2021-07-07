const Contact = require('../model/contact')


exports.create_contact = (req ,res) => {
    
    Contact.create({
        from_name: req.body.from_name,
        from_email:req.body.from_email,
        subject:req.body.subject,
        message:req.body.message
    },(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}

exports.get_all_contact = (req ,res) => {
    Contact.find({},(err,result) => {
        if(err) res.send(err)
        res.send(result)
    })
}