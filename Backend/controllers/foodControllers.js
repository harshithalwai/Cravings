
// 5. FIXED: foodControllers.js - Better validation and error handling
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
    console.error("Fetch foods error:", error);
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
    
    if (!name?.trim() || !description?.trim() || !price || !category?.trim() || !image) {
      // FIXED: Clean up uploaded file if validation fails
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // FIXED: Validate price
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return res.status(400).json({
        message: "Price must be a valid positive number",
        success: false,
      });
    }

    const food = new foodModel({
      name: name.trim(),
      description: description.trim(),
      price: numPrice,
      image,
      category: category.trim(),
    });

    await food.save();
    res.status(201).json({
      message: "Food item added successfully",
      success: true,
      food,
    });
  } catch (error) {
    console.error("Add food error:", error);
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    res.status(500).json({
      message: "Error adding food item",
      success: false,
      error: error.message,
    });
  }
};

const editItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const foodId = req.params.id;
    
    if (!foodId) {
      return res.status(400).json({
        message: "Food ID is required",
        success: false,
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return res.status(404).json({
        message: "Food item not found",
        success: false,
      });
    }

    // FIXED: Build update object dynamically
    const updateData = {};
    if (name?.trim()) updateData.name = name.trim();
    if (description?.trim()) updateData.description = description.trim();
    if (price && !isNaN(Number(price)) && Number(price) > 0) updateData.price = Number(price);
    if (category?.trim()) updateData.category = category.trim();
    if (image) {
      // Delete old image if updating with new one
      if (food.image) {
        const oldImagePath = `uploads/${food.image}`;
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      updateData.image = image;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No valid fields to update",
        success: false,
      });
    }

    await foodModel.findByIdAndUpdate(foodId, updateData, { new: true });
    res.status(200).json({
      message: "Food item updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Edit food error:", error);
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    res.status(500).json({
      message: "Error updating food item",
      success: false,
    });
  }
};

// Rest of the functions remain the same...
const removeItem = async (req, res) => {
  try {
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
        if (err) console.error("Error deleting image file:", err);
      });
    }
    
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).json({
      message: "Food item removed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Remove food error:", error);
    res.status(500).json({
      message: "Error removing food item",
      success: false,
    });
  }
};

const removeAll = async (req, res) => {
  try {
    await foodModel.deleteMany({});

    fs.readdir("uploads/", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return res.status(500).json({ 
          success: false, 
          message: "Failed to read uploads folder" 
        });
      }

      files.forEach((file) => {
        const filePath = path.join("uploads", file);
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", file, err);
        });
      });

      res.status(200).json({
        message: "All food items removed successfully",
        success: true,
      });
    });
  } catch (error) {
    console.error("Remove all foods error:", error);
    res.status(500).json({
      message: "Error removing all food items",
      success: false,
    });
  }
};

export { addFood, allFood, removeItem, removeAll, editItem };