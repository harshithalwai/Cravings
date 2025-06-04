import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express();

//Middlewares
dotenv.config({
  path: "./.env",
});
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: process.env.CORS_CREDENTIALS || true,
    methods: process.env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      process.env.CORS_ALLOWED_HEADERS || "Content-Type, Authorization",
  })
);
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
    limit: process.env.URLENCODED_LIMIT || "50mb",
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.static("public"));
app.use("/images",express.static("uploads"));

//MongoDB connection
connectDB();

// Routes
app.use("/food", foodRouter);
app.use("/user", userRouter);

export default app;
