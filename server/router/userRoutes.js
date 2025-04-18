import express from "express";
import { loginUser, paymentRazorPay, registerUser, userCredit, verifyRazorPay } from "../controllers/userController.js";
import { userAuth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredit)
userRouter.post("/pay-razor", userAuth, paymentRazorPay)
userRouter.post("/verify-razor", verifyRazorPay)

export default userRouter;
