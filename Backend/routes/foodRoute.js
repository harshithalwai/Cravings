import express from "express";
import { addFood } from "../controllers/foodControllers.js";
import upload from "../middlewares/multerMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), asyncHandler(addFood));

export default foodRouter;
