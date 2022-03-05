import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dailyLogin from "../models/dailyLogin.js";

import student from "../models/student.js";
import volunteer from "../models/volunteer.js";
import admin from "../models/admin.js";

const secret = 'test';

export const signin = async (req, res) => {
 
 
  const { email, password,userType } = req.body;

  try {
    if(userType === "student"){
      const oldUser = await student.findOne({ email });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

      const uId=oldUser._id;
      const nDate = new Date().toLocaleDateString();
      const getUser = await dailyLogin.findOne({val:uId});
      if(!getUser){
        const dUser = new dailyLogin({
          val:oldUser._id
        })
       await dUser.save();
       console.log("saved daily!")
        const newUser = await student.findByIdAndUpdate(oldUser._id,{$inc:{dayCount:5}})
        res.status(200).json({ result: newUser, token,message:"first" ,language:"en"});
      }else if(getUser && getUser.date!==nDate){
        await dailyLogin.findOneAndUpdate({uId},{date:nDate,val:getUser.val});
        const newUser = await student.findByIdAndUpdate(oldUser._id,{$inc:{dayCount:5}})
        res.status(200).json({ result: newUser, token,message:"first",language:"en" });
      }else{
        res.status(200).json({ result: oldUser, token,message:"second",language:"en" });
      }
    }
    else if (userType === "volunteer") {
      const oldUser = await volunteer.findOne({ email });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token,language:"en" });

    }
    else
    {
      const oldUser = await admin.findOne({ email });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = (password==oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token ,language:"en"});
    }
   
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {

    const {userType}=req.body;
 
  try {
    if(userType=="student"){
      const { email, password , name ,year} = req.body;

      const oldUser = await student.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await student.create({ email, password: hashedPassword, name, year,userType});
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    const uId=result._id;
      const nDate = new Date().toLocaleDateString();
      const getUser = await dailyLogin.findOne({val:uId});
      if(!getUser){
        const dUser = new dailyLogin({
          val:result._id
        })
       await dUser.save();
        const newResult = await student.findByIdAndUpdate(result._id,{$inc:{dayCount:5}})
        res.status(200).json({ result: newResult, token,message:"first",language:"en" });
      }else if(getUser && getUser.date!==nDate){
        await dailyLogin.findOneAndUpdate({uId},{date:nDate,val:getUser.val});
        const newResult = await student.findByIdAndUpdate(result._id,{$inc:{dayCount:5}})
        res.status(200).json({ result: newResult, token,message:"first",language:"en" });
      }else{
        res.status(200).json({ result: result, token,message:"second",language:"en" });
      }

    }
    else if(userType=="volunteer"){
      const { email, password , name ,year:classRange,subjects,languages} = req.body;

      const oldUser = await volunteer.findOne({ email });

      if (oldUser) return res.status(400).json({ message: "User already exists" });
      
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await volunteer.create({ email, password: hashedPassword, name, classRange, subjects,userType,languages });
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token,language:"en" });
    }
    
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};