

const mongoose = require('mongoose')
const Schema= mongoose.Schema

const csvSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    city:{
        type: String
    },

})

const csvModel = mongoose.model('csvmodel', csvSchema)
module.exports = csvModel