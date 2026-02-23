const fs = require("fs");

const UserModel = require("../modules/userModule");

class UserApiController {
  async createUser(req, res) {
    //console.log(req.body);
    //console.log(req.file);

    try {
      const { name, email, city } = req.body;
      const data = new UserModel({
        name,
        email,
        city,
      });

      if (req.file) {
        data.image = req.file.path;
      }
      const user = await data.save();
      return res.status(201).json({
        success: true,
        message: "user created successfully",
        data: user,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getUser(req, res) {
    try {
      const data = await UserModel.find();
      return res.status(200).json({
        success: true,
        message: "user list",
        total: data.length,
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getEditUser(req, res) {
    try {
      const id = req.params.id;
      const data = await UserModel.findById(id);
      return res.status(200).json({
        success: true,
        message: "get user",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }


  
  async updateUser(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "user id is required",
        });
      }
      if (req.file) {
        const user = await UserModel.findById(id);
        if (user && user.image && user.image !== "default.png") {
          const imagePath = user.image;
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        req.body.image = req.file.path;
      }
      const data = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message: "user updated successfully",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);
      if (user && user.image && user.image !== "default.png") {
        const imagePath = user.image;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new UserApiController();
