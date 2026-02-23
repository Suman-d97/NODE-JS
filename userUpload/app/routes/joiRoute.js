const express=require('express');
const joiController = require('../controllers/joiController');



const router=express.Router();



router.post('/create/data',joiController.create)
router.get('/data', joiController.get)
router.get('/data/:id',joiController.edit)
router.put('/data/:id',joiController.update)
router.delete('/data/:id',joiController.delete)



module.exports=router