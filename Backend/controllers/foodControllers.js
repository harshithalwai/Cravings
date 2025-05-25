import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";

const allFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({
      message: "All food items fetched successfully",
      success: true,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching food items",
      success: false,
      error: error.message,
    });
  }
};

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const food = new foodModel({
      name,
      description,
      price,
      image,
      category,
    });

    await food.save();
    res.status(201).json({
      message: "Food item added successfully",
      success: true,
      food,
    });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      }); // Delete the uploaded file if there's an error
    }
    res.status(500).json({
      message: "Error adding food item",
      success: false,
      error: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  const foodId = req.params.id;
  const foodItem = await foodModel.findById(foodId);
  if (!foodItem) {
    return res.status(404).json({
      message: "Food item not found",
      success: false,
    });
  }
  if (foodItem.image) {
    const imagePath = `uploads/${foodItem.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
      }
    });
  }
  await foodModel.findByIdAndDelete(foodId);
  res.status(200).json({
    message: "Food item removed successfully",
    success: true,
  });
};
export { addFood, allFood, removeItem };
