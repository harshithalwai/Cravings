import express from "express";
import authMiddleware from "../middlewares/authMiddlewarre.js";
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from "../controllers/cartControllers.js";
import asyncHandler from "../utils/asyncHandler.js";
const cartRouter = express.Router();

cartRouter.get("/add",authMiddleware, asyncHandler(addToCart));
cartRouter.get("/remove", authMiddleware, asyncHandler(removeFromCart));
cartRouter.get("/items", authMiddleware, asyncHandler(getCartItems));

export default cartRouter;
