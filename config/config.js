import mongoose from "mongoose";
import dotenv from "dotenv";

// console.log(URL,"url>>>>>>>>>>>>>>>>>>");


const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.URI);
        console.log("db connected succesfully");
    }
    catch(err){
        console.log("error",err)

    }



};
export  default connectDB;