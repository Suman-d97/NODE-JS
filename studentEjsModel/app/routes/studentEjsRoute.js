const express=require('express');
const studentEjsController = require('../controller/studentEjsController');

const router=express.Router();

router.get('/student/list',studentEjsController.index)
router.get('/student/add',studentEjsController.add)
router.post('/student/store',studentEjsController.store)
router.get('/student/edit/:id',studentEjsController.editstudentEjsModel)
router.post('/student/update/:id',studentEjsController.UpdatestudentEjsModel)
router.get('/student/delete/:id',studentEjsController.deletestudentEjsModel)

module.exports=router
