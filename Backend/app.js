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
app.use(cors());
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

export default app;
