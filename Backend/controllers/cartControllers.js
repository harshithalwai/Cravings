import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found , Login again",
      });
    }

    const cartData = await user.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    const upUser = await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found , Login again",
      });
    }

    const cartData = await user.cartData;
    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
      const upUser = await userModel.findByIdAndUpdate(req.body.userId, {
        cartData,
      });
      return res.json({
        success: true,
        message: "Item removed from cart successfully",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Internal Server Error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const cartData = await user.cartData;
    if (cartData) {
      res.json({
        success: true,
        cartData
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong !"
    })
  }
};

export { addToCart, removeFromCart, getCartItems };
