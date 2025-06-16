import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { placeOrder, verifyPayment } from "../controllers/orderControllers.js";

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, asyncHandler(placeOrder))
orderRouter.post("/verify", authMiddleware, asyncHandler(verifyPayment))


export default orderRouter;