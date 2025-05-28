import express from "express"
import userRoute from "./routes/user.js"
import connectDB from "./config/config.js";
import dotenv from "dotenv"

dotenv.config();
const APP = express();
 const PORT = 4094;

 
//// middlewiress
APP.use(express.json());

 APP.use("/api",userRoute);
 connectDB();

 APP.listen(PORT,()=>{
    console.log('server is ruuning on port :>> ',PORT);
 })