import express from "express";
import { addFood, allFood ,removeItem} from "../controllers/foodControllers.js";
import upload from "../middlewares/multerMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const foodRouter = express.Router();

foodRouter.get("/list", asyncHandler(allFood));
foodRouter.post("/add", upload.single("image"), asyncHandler(addFood));
foodRouter.delete("/remove/:id",asyncHandler(removeItem))

export default foodRouter;
