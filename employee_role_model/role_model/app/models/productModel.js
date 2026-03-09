
const mongoose = require('mongoose');
const schema = mongoose.Schema

const productSchema = new schema({
    product_title:{
        type: String,
        required: true 
    },
    category:{
        type: String,
        required: true
    },
    product_description:{
        type: String,
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeRole'
    }
    
},{timestamps: true})

const productModel = mongoose.model('product', productSchema)
module.exports = productModel