const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const UserSchema= new Schema({
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
        },
        image:{
            type: String,
            default: 'default.jpg'
        }
        
     })

     const UserModel= mongoose.model('user', UserSchema);

     module.exports= UserModel;