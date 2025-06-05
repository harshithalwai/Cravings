import express from "express";
import { addFood, allFood ,removeItem,removeAll,editItem} from "../controllers/foodControllers.js";
import upload from "../middlewares/multerMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const foodRouter = express.Router();

foodRouter.get("/list", asyncHandler(allFood));
foodRouter.post("/add", upload.single("image"), asyncHandler(addFood));
foodRouter.delete("/remove/:id",asyncHandler(removeItem))
foodRouter.delete("/removeAll",asyncHandler(removeAll))
foodRouter.patch("/edit/:id", upload.single("image"), asyncHandler(editItem)); // Assuming you want to use the same addFood function for editing

export default foodRouter;
