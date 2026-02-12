const express=require('express');

const Upload = require('../utils/userImageUpload');
const userController = require('../controllers/userController');

const router=express.Router();

router.post('/create/user',Upload.single('image'),userController.createUser)
router.get('/user',userController.getUser)
router.get('/user/:id',userController.getEditUser)
router.put('/user/:id',Upload.single('image'),userController.updateUser)
router.delete('/user/:id',userController.deleteUser)



module.exports=router