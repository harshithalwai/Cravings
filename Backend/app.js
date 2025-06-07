// 1. FIXED: app.js - Correct imports and better error handling
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Load environment variables first
dotenv.config({
  path: "./.env",
});

// App Config
const app = express();

// FIXED: Proper CORS configuration with error handling
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.CORS_ORIGIN === "*") {
      return callback(null, true);
    }
    
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  methods: process.env.CORS_METHODS?.split(",") || ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: process.env.CORS_CREDENTIALS === "true",
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(
  express.json({
    limit: process.env.JSON_LIMIT || "50mb",
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.URLENCODED_LIMIT || "50mb"
  })
);

// Static files
app.use(express.static("public"));
app.use("/images", express.static("uploads"));

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cravings Backend API is running!",
    timestamp: new Date().toISOString()
  });
});

// Connect to MongoDB
connectDB();

// API Routes
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// CORS error handler
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      success: false,
      message: 'CORS policy violation'
    });
  } else {
    next(err);
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error Stack:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

export default app;

