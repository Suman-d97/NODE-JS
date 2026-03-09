const express = require('express')
const productController = require('../controllers/productController')
const rolecheck = require('../middleware/rolecheck')
const router = express.Router()

router.post('/create/product', rolecheck, productController.createProduct) 
router.get('/products', productController.getAllProducts)
router.get('/product/:id', productController.getProductById)
router.put('/product/:id', rolecheck, productController.updateProduct)
router.delete('/product/:id', rolecheck, productController.deleteProduct)


module.exports = router