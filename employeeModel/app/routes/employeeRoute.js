const express=require('express');
const Upload = require('../utils/empImageUpload');
const employeeController = require('../controller/employeeController');

const router=express.Router();


router.get("/employee/add", employeeController.add)
router.post("/employee/add", Upload.single('image'), employeeController.store)
router.get("/employee/list", employeeController.index)
router.get("/employee/edit/:id", employeeController.editEmp)
router.post("/employee/edit/:id", Upload.single('image'), employeeController.updateEmp)
router.get("/employee/delete/:id", employeeController.deleteEmp)

module.exports=router