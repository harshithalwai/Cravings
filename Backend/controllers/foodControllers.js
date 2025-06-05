import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
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
      return res.json({
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
      }); // Deleting the uploaded file if there's an error
    }
    res.status(500).json({
      message: "Error adding food item",
      success: false,
      error: error.message,
    });
  }
};
const editItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.filename : null;
  const foodId = req.params.id;
  if (!name || !description || !price || !category || !image) {
    return res.json({
      message: "Kindly update the fields !",
      success: false,
    });
  }
  const food = await foodModel.findById(foodId);
  if (!food) {
    return res.json({
      message: "Food item not found",
      success: false,
    });
  }
  await foodModel.findByIdAndUpdate(foodId, req.body, { new: true });
  res.status(200).json({
    message: "Food item updated successfully",
    success: true,
  });
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

const removeAll = async (req, res) => {
  await foodModel.deleteMany({}); // If you're using MongoDB

  fs.readdir("uploads/", (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to read uploads folder" });
    }

    files.forEach((file) => {
      const filePath = path.join("uploads", file); // ✅ Correct full path

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", file, err);
        }
      });
    });

    res.status(200).json({
      message: "Food items removed successfully",
      success: true,
    });
  });
};
export { addFood, allFood, removeItem, removeAll, editItem };
