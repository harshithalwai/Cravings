
// 4. FIXED: orderControllers.js - Improved validation and error handling
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import Razorpay from "razorpay"
import crypto from "crypto" // ADDED: Missing import

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, userId } = req.body;
        
        // FIXED: Better validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items are required and must be a non-empty array"
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid amount is required"
            });
        }

        if (!address || !address.trim()) {
            return res.status(400).json({
                success: false,
                message: "Address is required"
            });
        }

        // Verify user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Creating a new order 
        const newOrder = new orderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address
        })
        
        await newOrder.save()
        
        // Clear the user's cart after placing order
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
    
        // Create Razorpay order
        const options = {
            amount: Math.round(amount * 100), // FIXED: Ensure integer
            currency: "INR",
            receipt: `order_${newOrder._id}`,
            notes: {
                orderId: newOrder._id.toString(),
                userId: userId
            }
        }
    
        const razorpayOrder = await razorpay.orders.create(options)
    
        res.json({
            success: true,
            orderId: razorpayOrder.id,
            amount: amount,
            mongoOrderId: newOrder._id
        })
        
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! " + error.message
        })
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, mongoOrderId } = req.body;
        
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !mongoOrderId) {
            return res.status(400).json({
                success: false,
                message: "Missing required payment details"
            });
        }

        // Verify payment signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');
        
        if (expectedSignature === razorpay_signature) {
            // Payment is verified, update order status
            const updatedOrder = await orderModel.findByIdAndUpdate(mongoOrderId, { 
                payment: true,
                status: "Order Confirmed"
            }, { new: true });

            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }
            
            res.json({
                success: true,
                message: "Payment verified successfully",
                order: updatedOrder
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({
            success: false,
            message: "Payment verification error"
        });
    }
}

export { placeOrder, verifyPayment }
