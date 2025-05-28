import mongoose from "mongoose";

 const userSchma = new mongoose.Schema({
  name:{
    type : String,
    require : true
  },
  email:{
    type : String,
    require : true,
    unique: true
  },
  password:{
    type : String,
    require : true
  }
 },{timestamps: true})

const User1 = mongoose.model("userSignup",userSchma)


export default User1;