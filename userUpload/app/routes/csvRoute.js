const express=require('express');

const router=express.Router();
const bodyparser=require('body-parser');

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended:true}));

const multer=require('multer');
const path=require('path');
const csvController = require('../controllers/csvController');



const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/csvfile'),function(error,success){
            if(error) throw error;
        })
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage});



router.post('/create/csv',upload.single('file'),csvController.createData)
router.get('/csv',csvController.getData)


