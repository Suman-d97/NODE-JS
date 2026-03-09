
const jwt = require('jsonwebtoken');
const empRoleModel = require('../models/employeeRoleModel')

class EmpRoleController{
    async register_employee(req, res){
        try {
           const role = req.body.is_admin || 'employee';
            const data = {
                emp_name: req.body.emp_name,
                emp_email: req.body.emp_email,
                emp_password: req.body.emp_password,
                emp_department: req.body.emp_department,
                is_admin: role
            };
            const record = await empRoleModel.create(data)
            res.status(200).json({
                status: true,
                message: 'Record created successfully',
                data: record
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error creating record',
                data: error
            })
        }
    }




    async login_employee(req, res){
        try {
            const { emp_email, emp_password } = req.body;
            
            if (!emp_email || !emp_password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            const record = await empRoleModel.findOne({ emp_email: emp_email });
            if (!record) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            if(record.emp_password !== emp_password){
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                });
            }

            const token = jwt.sign({
                id: record._id,
                emp_name: record.emp_name,
                emp_email: record.emp_email,
                emp_department: record.emp_department,
                is_admin: record.is_admin
            }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})

            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    id: record._id,
                    emp_name: record.emp_name,
                    emp_email: record.emp_email,
                    emp_department: record.emp_department,
                    is_admin: record.is_admin,
                },
                token: token
            })
            
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error logging in',
                data: error
            })
        }
    }





    async get_employee(req, res){
        try {
            const emp_list = await empRoleModel.find()
            res.status(200).json({
                status: true,
                message: 'Record fetched successfully',
                total: emp_list.length,
                data: emp_list
                
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error fetching record',
                data: error
            })
        }
    }





    async update_employee(req, res){
        try {
            const id = req.params.id
            if (req.user.is_admin !== 'admin' && req.user.is_admin !== 'manager') {
                return res.status(403).json({
                    status: false,
                    message: 'Unauthorized to update employee'
                });
            }
            const record = await empRoleModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json({
                status: true,
                message: 'Record updated successfully',
                data: record
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error updating record',
                data: error
            })
        }
    }




    async delete_employee(req, res){
        try {
            const id = req.params.id
             if (req.user.is_admin !== 'admin') {
                return res.status(403).json({
                    status: false,
                    message: 'Unauthorized to delete employee'
                });
            }

            const record = await empRoleModel.findByIdAndDelete(id)
            if(record){
                res.status(200).json({
                    status: true,
                    message: 'Record deleted successfully',
                    data: record
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Error deleting record',
                data: error
            })
        }
    }
}


module.exports = new EmpRoleController()