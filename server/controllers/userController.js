import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import transactionModel from "../model/transactionModel.js";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(201).json({
            success: true,
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        console.error(`Error in registerUser: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            token,
            user: { name: user.name, email: user.email },
        });

    } catch (err) {
        console.error(`Error in loginUser: ${err}`);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const userCredit = async(req, res)=>{
    try{
        const {userId} = req.body
        const user = await userModel.findOne({_id : userId})
        return res.json({
            success: true,
            credits: user.creditBalance,
            user: {name: user.name}
        })

    }
    catch(err){
        console.log(`Error in userCredit is ${err}`)
        return res.json({success: false,
            message: err.message
        })
    }

}
export const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  
  export const paymentRazorPay = async (req, res) => {
    try {
      const { userId, planId } = req.body;
  
      if (!userId || !planId) {
        return res.json({ success: false, message: "Missing Details" });
      }
  
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      let credits, plan, amount;
  
      switch (planId) {
        case 'Basic':
          plan = 'Basic';
          credits = 100;
          amount = 10;
          break;
  
        case 'Advanced':
          plan = 'Advanced';
          credits = 500;
          amount = 50;
          break;
  
        case 'Business':
          plan = 'Business';
          credits = 5000;
          amount = 250;
          break;
  
        default:
          return res.json({ success: false, message: "Plan Not Found" });
      }
  
      const date = Date.now();
  
      const transactionData = {
        userId,
        plan,
        amount,
        credits,
        date,
      };
  
      const newTransaction = await transactionModel.create(transactionData);
  
      const options = {
        amount: amount * 100, // amount in paise
        currency: process.env.CURRENCY,
        receipt: newTransaction._id.toString(),
      };
  
      razorPayInstance.orders.create(options, (error, order) => {
        if (error) {
          console.log(`Error in Razorpay order: ${error}`);
          return res.json({ success: false, message: error });
        }
        return res.json({ success: true, order });
      });
  
    } catch (err) {
      console.log(`Error in Razorpay payment: ${err}`);
      return res.status(500).json({ success: false, message: "Payment Failed", error: err.message });
    }
  };

  export const verifyRazorPay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
  
      // Fetch order info from Razorpay using the correct field
      const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);
  
      if (!orderInfo || !orderInfo.receipt) {
        return res.json({ success: false, message: "Invalid Order Info" });
      }
  
      // Find transaction using receipt (stored as _id in transactionModel)
      const transactionData = await transactionModel.findById(orderInfo.receipt);
      if (!transactionData) {
        return res.json({ success: false, message: "Transaction not found" });
      }
  
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment Already Processed" });
      }
  
      // Update user credits
      const userData = await userModel.findById(transactionData.userId);
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      const updatedCreditBalance = userData.creditBalance + transactionData.credits;
  
      // Update user's credits and mark transaction as paid
      await userModel.findByIdAndUpdate(userData._id, {
        creditBalance: updatedCreditBalance,
      });
  
      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
  
      return res.json({ success: true, message: "Credit Added" });
  
    } catch (err) {
      console.error(`Error in verifyRazorPay: ${err}`);
      return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
  };
  
