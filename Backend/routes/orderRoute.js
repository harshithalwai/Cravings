import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

import { placeOrder } from "../controllers/orderControllers.js";

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, asyncHandler(placeOrder))

export default orderRouter;