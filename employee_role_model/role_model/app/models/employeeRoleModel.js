
const mongoose =  require('mongoose')
const schema = mongoose.Schema

const empSchema = new schema({
    emp_name:{
        type: String,
        required: true
    },
    emp_email:{
        type: String,
        required: true,
        unique: true
    },
    emp_password:{
        type: String,
        required: true
    },
    emp_department:{
        type: String,
        required: true
    },
    is_admin:{
        type: String,
        enum:['admin', 'manager', 'employee'],
        default: 'employee'
    }
},{timestamps: true})

const empRoleModel = mongoose.model('employeeRole', empSchema)
module.exports = empRoleModel