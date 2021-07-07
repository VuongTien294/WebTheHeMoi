const mongoose = require('mongoose')

const Contact = new mongoose.Schema({
    from_name: {
        type: String,
        require: true
    },
    from_email:String,
    subject:String,
    message:String
})

module.exports = mongoose.model('Contact' ,Contact)