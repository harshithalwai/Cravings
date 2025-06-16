import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from "../controllers/cartControllers.js";
import asyncHandler from "../utils/asyncHandler.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, asyncHandler(addToCart));
cartRouter.post("/remove", authMiddleware, asyncHandler(removeFromCart));
cartRouter.post("/items", authMiddleware, asyncHandler(getCartItems));

export default cartRouter;
