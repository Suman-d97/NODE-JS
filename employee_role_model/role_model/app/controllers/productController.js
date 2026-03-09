const productModel = require('../models/productModel')

class productController{
async createProduct(req, res){
        try {
            
            if (!req.user || !req.user.id) {
                return res.status(401).json({
                    status: false,
                    message: 'Authentication required to create product'
                });
            }
            const data = {
                product_title: req.body.product_title,
                category: req.body.category,
                product_description: req.body.product_description,
                created_by: req.user.id,
            };

            const product = await productModel.create(data);
            if (product) {
                return res.status(201).json({
                    status: true,
                    message: 'Product created successfully',
                    data: product
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error creating product',
                data: error
            });
        }
    }


    async getAllProducts(req, res){
        try {
            const products = await productModel.find();
            if (products) {
                return res.status(200).json({
                    status: true,
                    message: 'Products retrieved successfully',
                    total: products.length,
                    data: products
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error retrieving products',
                data: error
            })
        }
    }

    async getProductById(req, res){
        try {
            const product = await productModel.findById(req.params.id);
            if (product) {
                return res.status(200).json({
                    status: true,
                    message: 'Product retrieved successfully',
                    data: product
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Product not found'
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error retrieving product',
                data: error
            })
        }
    }

    async updateProduct(req, res){
        try {
            if(req.user.is_admin !== 'admin' && req.user.is_admin !== 'manager'){
                return res.status(403).json({
                    status: false,
                    message: 'Unauthorized to update product'
                })
            }
            const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (product) {
                return res.status(200).json({
                    status: true,
                    message: 'Product updated successfully',
                    data: product
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Product not found'
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error updating product',
                data: error
            })
        }
    }

    async deleteProduct(req, res){
        try {
            if(req.user.is_admin !== 'admin'){
                return res.status(403).json({
                    status: false,
                    message: 'Unauthorized to delete product'
                })
            }
            const product = await productModel.findByIdAndDelete(req.params.id);
            if (product) {
                return res.status(200).json({
                    status: true,
                    message: 'Product deleted successfully',
                    data: product
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Product not found'
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error deleting product',
                data: error
            })
        }
    }
}


module.exports = new productController()