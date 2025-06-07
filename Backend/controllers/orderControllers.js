import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import Razorpay from "razorpay"

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const placeOrder = async (req, res) => {
    try {
        const frontend_url = "http://localhost:3000/"
    
        // ✅ FIXED: Access data directly from req.body (not req.body.orderData)
        const { items, amount, address } = req.body;
        
        // Validate required fields
        if (!items || !amount || !address) {
            return res.json({
                success: false,
                message: "Missing required fields: items, amount, or address"
            });
        }

        // Creating an object/document for a new order 
        const newOrder = new orderModel({
            userId: req.body.userId, // ✅ FIXED: changed from 'userid' to 'userId'
            items: items,
            amount: amount,
            address: address
        })
        
        await newOrder.save()
        
        // Clear the user's cart after placing order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
    
        // ✅ FIXED: Proper Razorpay integration
        const options = {
            amount: amount * 100, // Amount in paise (multiply by 100)
            currency: "INR",
            receipt: `order_${newOrder._id}`,
            notes: {
                orderId: newOrder._id.toString(),
                userId: req.body.userId
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
        res.json({
            success: false,
            message: "Something went wrong! " + error.message
        })
    }
}

// Optional: Add payment verification function
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, mongoOrderId } = req.body;
        
        // Verify payment signature (recommended for security)
        const crypto = require('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');
        
        if (expectedSignature === razorpay_signature) {
            // Payment is verified, update order status
            await orderModel.findByIdAndUpdate(mongoOrderId, { 
                payment: true,
                status: "Order Confirmed"
            });
            
            res.json({
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            res.json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.json({
            success: false,
            message: "Payment verification error"
        });
    }
}

export { placeOrder, verifyPayment }