import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
  });
};

const userList = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password -__v");
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.json({
      message: "All fields are required",
      success: false,
    });
  }
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.json({
      message: "User already exists",
      success: false,
    });
  }
  if (!validator.isEmail(email)) {
    return res.json({
      message: "Invalid email format",
      sucess: false,
    });
  }
  if (password.length < 8) {
    return res.json({
      message: "Password must be between 8 and 20 characters",
      success: false,
    });
  }
  bcrypt.genSalt(12, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const user = await userModel.create({
        name,
        email,
        password: hash,
      });
      const token = generateToken(user._id);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
      });
    });
  });
};


const LoginUser = async (req, res) => {

  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.json({
      message: "All fields are required",
      success: false,
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({
      message: "User does not exist",
      success: false,
    });
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.json({
        message: "Invalid credientials",
        success: false,
      });
    }

    if (!result) {
      return res.json({
        message: "Invalid credientials",
        success: false,
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  });
};

export { RegisterUser, LoginUser, userList };
