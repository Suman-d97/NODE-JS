const csv = require("csvtojson");
const productModel = require("../models/productModel");
class ProductController {
  async createData(req, res) {
    try {
      const userData = [];
      csv()
        .fromFile(req.file.path)
        .then(async (response) => {
          for (let i = 0; i < response.length; i++) {
            userData.push({
              productId: response[i].productId,
              productName: response[i].productName,
              category: response[i].category,
              brand: response[i].brand,
              price: response[i].price,
              stock: response[i].stock,
              rating: response[i].rating,
            });
          }

          const data = await productModel.insertMany(userData);

          return res.status(201).json({
            message: "product data inserted successfully",
            data: data,
          });
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }




  async getData(req, res) {
    try {
      const data = await productModel.find();
      return res.status(200).json({
        message: "product data get successfully",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }




  async findData(req, res) {
    try {
      const id = req.params.id;
      const data = await productModel.findOne({ productId: id.trim() }).lean();
      return res.status(200).json({
        message: "product find successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }




  async searchData(req, res) {
    try {
      const productName = req.query.productName;
      const data = await productModel.find({ productName });
      return res.status(200).json({
        message: "this is the product",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }




  async categoryData(req, res) {
    try {
      const category = req.query.category;
      const data = await productModel.find({ category });
      if (!data.length) {
        return res.status(404).json({
          message: "product not found with this category",
          data: data,
        });
      }
      return res.status(200).json({
        message: "find product by category successfully",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }




  async priceData(req, res) {
    try {
      const price = req.query.price;
      const data = await productModel.find({ price: price });
      if (!data.length) {
        return res.status(404).json({
          message: "product not found with this price",
          data: data,
        });
      }
      return res.status(200).json({
        message: "find product by price successfully",
        total: data.length,
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }




  async deleteData(req, res) {
    try {
      const id = req.params.id;
      const data = await productModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "product deleted successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
