const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "default.jpg",
    },

    is_admin: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;