import express from "express";
import { RegisterUser, LoginUser } from "../controllers/userControllers.js";
import asyncHandler from "../utils/asyncHandler.js";

// User Router
const userRouter = express.Router();

userRouter.post("/register", asyncHandler(RegisterUser));
userRouter.post("/login", asyncHandler(LoginUser));

export default userRouter;
