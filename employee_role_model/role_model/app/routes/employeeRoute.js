

const express = require('express')
const employeeRoleController = require('../controllers/employeeRoleController')
const rolecheck = require('../middleware/rolecheck')

const router = express.Router()

router.post('/create/employee', employeeRoleController.register_employee)
router.post('/login/employee', employeeRoleController.login_employee)
router.get('/employee', employeeRoleController.get_employee)
router.put('/employee/:id', rolecheck, employeeRoleController.update_employee)
router.delete('/employee/:id', rolecheck, employeeRoleController.delete_employee)


module.exports = router