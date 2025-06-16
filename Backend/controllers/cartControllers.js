<<<<<<< HEAD
import usermodel from "../models/userModel.js";

const addToCart = async (req, res) => {
    res.send("Add to cart functionality is not implemented yet.");
};
const removeFromCart = async (req, res) => {
    res.send("Add to cart functionality is not implemented yet.");
};
const getCartItems = async (req, res) => {
    res.send("Add to cart functionality is not implemented yet.");
};

=======

// 3. FIXED: cartControllers.js - Better error handling and validation
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    
    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please login again",
      });
    }

    const cartData = { ...user.cartData }; // FIXED: Create copy to avoid mutation

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    
    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please login again",
      });
    }

    const cartData = { ...user.cartData }; // FIXED: Create copy

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      
      // FIXED: Remove item if quantity becomes 0
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      
      await userModel.findByIdAndUpdate(userId, { cartData });
      
      return res.json({
        success: true,
        message: "Item removed from cart successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart",
      });
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      cartData: user.cartData || {} // FIXED: Ensure cartData exists
    });
  } catch (error) {
    console.error("Get cart items error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!"
    });
  }
};

>>>>>>> 92878726fc981a92d046ce49216a06d1a6141516
export { addToCart, removeFromCart, getCartItems };
