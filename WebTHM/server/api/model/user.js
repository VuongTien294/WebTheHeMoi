const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    age: String,
    role: String,
    username:{
       type:String,
       unique: true
    },
    password: String,
    address: String,
    gender: String,
    phone: String,
    email: String

})

module.exports = mongoose.model('User' ,UserSchema)