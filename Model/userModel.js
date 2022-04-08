const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    userName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    password: {
      type: String,
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userModel);
