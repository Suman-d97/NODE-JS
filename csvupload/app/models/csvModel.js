

const mongoose = require('mongoose')
const Schema= mongoose.Schema

const csvSchema = new Schema({
    productId:{
        type: String
    },
    productName:{
        type: String
    },
    
    category:{
        type: String
    },
    brand:{
        type: String
    },
    price:{
        type: Number
    },
    stock:{
        type: Number
    },
    rating:{
        type: Number
    },
})

const csvModel = mongoose.model('csvmodel', csvSchema)
module.exports = csvModel