import express from "express"
import { userLoginUpHandler, userSignUpHandler } from "../controllers/userController.js";
import protect from "../middlewares/authMiddlewire.js";
import User1 from "../models/userModel.js";


const router = express.Router();

/// Get Request
router.post("/signup", userSignUpHandler)
router.post("/login", userLoginUpHandler)
router.get("/profile", protect, async(req,res)=>{
     const user = await User1.findById(req.user.isUserId).select('-password');
  res.json(user);
})

export default router;