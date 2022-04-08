require("dotenv").config()
const express = require("express");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// const verify = (req, res, next) => {
//     const auth
// }

const upload = multer({ storage: storage }).single("avatar");

router.get("/", async (req, res) => {
  const getUser = await userModel.find();
  res.json({
    status: "users found",
    data: getUser,
  });
});

router.get("/:id", async (req, res) => {
  const getUser = await userModel.findById(req.params.id);
  res.json({
    status: "users found",
    data: getUser,
  });
});

router.post("/register", upload, async (req, res) => {
  const { userName, email, password, companyName } = req.body;

  const hash = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, hash);

  const image = await cloudinary.uploader.upload(req.file.path);

  const getUser = await userModel.create({
    userName,
    email,
    companyName,
    password: newPassword,
    avatar: image.secure_url,
  });
  res.json({
    status: "users found",
    data: getUser,
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({
    email,
  });

  if (findUser) {
    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (checkPassword) {
      const token = jwt.sign(
        {
          email: findUser.email,
          _id: findUser._id,
          userName: findUser.userName,
          companyName: findUser.companyName,
        },
        "THISisMysupERSecreT",
        { expiresIn: "2d" }
      );
      res.json({
        status: "welcome",
        data: {
          email: findUser.email,
          _id: findUser._id,
          userName: findUser.userName,
          companyName: findUser.companyName,
          token,
        },
      });
    } else {
      res.json({ status: "Password not correct" });
    }
  } else {
    res.json({ status: "No user with this Email" });
  }
});

module.exports = router;
