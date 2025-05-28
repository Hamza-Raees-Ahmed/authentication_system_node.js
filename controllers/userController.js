 import bcrypt from "bcrypt"
import User1 from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { json } from "express";
 const  userSignUpHandler=  async(req,res)=>{
  const {name ,email ,password } = req.body;


//// Cheak if user is exist or not...
//   const userExists = await User1.findOne({  });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" }); //  return added
//   }
  if(!name || !email || !password){
    res.status(400).json("All fileds are mandatory are requied")

}
// hash password

const salt =  await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password ,salt)


//// add user in db

 const newUser = new User1({ name, email, password : hashedPassword });
  await newUser.save();
  if(newUser){
    res.status(200).json({message : "user signup succusfullyy",newUser})
  }
    
 }

 const userLoginUpHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(401).json({ message: "Please fill in all fields" });
    }

    // Find user — MISSING AWAIT
    const isUser = await User1.findOne({ email }); //  added await

    if (!isUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords — must wait until user is found
    const isMatch =  bcrypt.compare(password, isUser.password); //  now isUser.password is defined

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { isUserId: isUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response
    return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

       



 export {userSignUpHandler,userLoginUpHandler}