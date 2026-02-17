const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const EmployeeSchema= new Schema({
        name:{
            type: String,
            required: true
        },
        employee_id:{
            type: String,
            index: true,
            default: ()=>Math.floor(100000+ Math.random() * 999999).toString()
        },
        contact:{
            phone:{type: Number},
            email:{type: String},
            address:{type: String},
            full_address:{type: String},
            city:{type: String}
        },
        department:{
            department_name:{
                type: String
            }
        },
        image:{
            type: String,
            default: 'https://www.istockphoto.com/photos/blank-profile-picture'
        }
        
     },{timestamps: true, versionkey: false})

     const EmployeeModel= mongoose.model('employee', EmployeeSchema);

     module.exports= EmployeeModel;