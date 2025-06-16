// 1. FIXED: app.js - Proper CORS configuration
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();

//Middlewares
dotenv.config({
  path: "./.env",
});

// FIXED: Proper CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN === "*" ? true : process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS?.split(",") || ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: process.env.CORS_CREDENTIALS === "true"
}));

app.use(
  express.json({
    limit: process.env.JSON_LIMIT || "50mb",
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
    extended: true,
    type: "application/json",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.URLENCODED_LIMIT || "50mb"
  })
);

app.use(express.static("public"));
app.use("/images", express.static("uploads"));

//MongoDB connection
connectDB();

// Routes
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// ADDED: Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ADDED: 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;

// 2. FIXED: userControllers.js - JWT expiration and validation fixes
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1d" // FIXED: Added expiration
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
<<<<<<< HEAD
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
=======
  try { // ADDED: try-catch wrapper
    const { name, email, password } = req.body;
    
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "All fields are required",
>>>>>>> 92878726fc981a92d046ce49216a06d1a6141516
        success: false,
      });
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false, // FIXED: typo
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
        success: false,
      });
    }

    // FIXED: Promisified bcrypt
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    
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
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const LoginUser = async (req, res) => {
  try { // ADDED: try-catch wrapper
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials", // FIXED: Don't reveal user existence
        success: false,
      });
    }

    // FIXED: Promisified bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials", // FIXED: spelling
        success: false,
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { RegisterUser, LoginUser, userList };
