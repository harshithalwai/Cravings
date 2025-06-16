import express from "express";
import { RegisterUser, LoginUser, userList } from "../controllers/userControllers.js";
import asyncHandler from "../utils/asyncHandler.js";

// User Router
const userRouter = express.Router(); //comment
//Comment
userRouter.get("/list",asyncHandler(userList));
userRouter.post("/register", asyncHandler(RegisterUser));
userRouter.post("/login", asyncHandler(LoginUser));

export default userRouter;
