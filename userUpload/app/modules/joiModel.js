const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const JoiSchema= new Schema({
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        }
        
     })

     const JoiModel= mongoose.model('user', JoiSchema);

     module.exports= JoiModel;