
const mongoose = require('mongoose')
const Schema= mongoose.Schema

const productSchema = new Schema({
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
    }

},{
    toJSON: {
        transform: function(doc, ret) {
            delete ret._id
            delete ret.__v
        }
    },

    toObject: {
        transform: function(doc, ret) {
            delete ret._id
            delete ret.__v
        }
    }
})

const productModel = mongoose.model('productmodel', productSchema)
module.exports = productModel
