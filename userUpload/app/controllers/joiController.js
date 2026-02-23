const joiModel = require("../modules/joiModel");
const { userSchemavalidation } = require("../utils/schemaValidation");

class JoiController {
  async create(req, res) {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
      };

      const { error, value } = userSchemavalidation.validate(data);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      } else {
        const user = new joiModel(value);
        await user.save();

        return res.status(201).json({
          success: true,
          message: "data created successfully",
          data: data,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async get(req, res) {
    try {
      const data = await joiModel.find();
      return res.status(200).json({
        success: true,
        message: "user joi data list",
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

  async edit(req, res) {
    try {
      const id = req.params.id;
      const data = await joiModel.findById(id);
      return res.status(200).json({
        success: true,
        message: "get user joi data",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = {
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
      };
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "user joi id is required",
        });
      }
      const { error, value } = userSchemavalidation.validate(data);
      const updateJoiData = await joiModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updateJoiData) {
        return res.status(400).json({
          success: false,
          message: "joi user data not found",
        });
      }
      return res.status(200).json({
        sucess: true,
        message: "user updated successfully",
        data: updateJoiData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await joiModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "user joi data delete successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new JoiController();
