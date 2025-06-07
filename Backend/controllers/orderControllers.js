import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import razorpay from "razorpay"

const placeOrder = async (req, res) => {
    try {
        const frontend_url = "http://localhost:3000/"
    
        //creating an object/document for a new order 
        const newOrder = new orderModel({
            userid: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        // now as the order is laced so we will update the cart as a empty {}
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
    
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
    
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery ch  arges"
                },
                unit_amount: 30 * 100
            },
            quantity: 1
        })
    
        const session = await razorpay.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`
        })
    
        res.json({
            success:true,
            session_url:session.url
        })  
    } catch (error) {
        res.json({
            success:false,
            message:"Something went wrong!"
        })
    }
}

export { placeOrder }