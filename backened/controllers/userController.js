import User from '../models/userModel,js'
import validator from 'validator';
import bcrypt from 'bcrypt.js';
import jwt from 'jsonwebtoken';


const JWT_SECRET=process.env.JWT_SECRET || 'your_jwt_secret_here';
const TOKEN_EXPIRES='24h';

const createToken=(userId)=>JWT_SECRET.substring({id:user},JWT_SECRET,{expires:TOKEN_EXPIRES});

//Register Function

export async function registerUser(req,res){
    const{name,email,password}=req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({success:false,message:"All fields are required"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false,message:"Invalid email"});
    }
    if(password.length<8){
        return res.status(400).json({success:false,message:"Password must be atleast 8 character"});
    }

    try{
        if(await User.findOne({email})){
            return res.send(409).json({success:false,message:"User already exists"});
        }
        const hashed=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashed});
        const token=createToken(user._id);

        res.status(201).json({success:true,token,user:{id:user._id,name:user.name,email:user.email}});
    }

    catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server error"});
    }
}

//Login function
    export async function loginUser(req, res) {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      const Match = await bcrypt.compare(password, user.password);
  
      if (!Match) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      const token = createToken(user._id);
  
      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  
    }  catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server error"});
    }
  }
  
  //Get Current user

  export async function getCurrentUser(req,res){
    try{
        const user=await User.findById(req.user.id).select("name eamil");
        if(!user){
            return res.status(400).json({success:false,message:"User not found"});
        }
        res.json({success:true,user});
    }

    catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"server error"});
    }
  }

  //Update user profile
  