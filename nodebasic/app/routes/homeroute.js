const express = require('express');
const homeController = require('../controllers/homeController');
const dataController = require('../controllers/dataController');


const  router = express.Router();

router.get('/',homeController.index);
router.get('/about',homeController.about);
router.get('/contact',homeController.contact);
router.get('/studentData',dataController.data);

module.exports = router;