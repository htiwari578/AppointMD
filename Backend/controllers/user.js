import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import {v2 as cloudinary} from "cloudinary"

export const registerUser = async (req,res) => {

    try {
        const {name,email,password} = req.body
        if(!name || !email , !password){
            return res.json({message:"Something is missing",success:false
        })
        }
        // validating email
        if (!validator.isEmail(email)) {
            return res.json({message:"Enter a valid email",success:false})
        }
        // validating strong password
        if (password.length < 8) {
            return res.json({message:"Enter a valid password",success:false})
        }
        // hasing user password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password:hashedPassword 
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
        res.json ({success:true, 
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

export const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            res.json({message:"Something is missing",success:false})
        }
        const user = await userModel.findOne({email})
        if(!user) {
           return res.json({
                message:"User does not exist", success:false})
        }
        // check if user password matched or not
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(isPasswordMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
            res.json({success:true,token})
        }else{
            res.json({message:"Invalid credentials",success:false})
        }

    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

// api to get user profile data

export const getProfile = async (req,res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

// to update profile

export const updateProfile = async (req, res) => {
    try {
        const {userId, name,phone,address,dob,gender} = req.body
        const imageFile = req.file
        if(!name || !phone || !address || !dob || !gender){
            return res.json({message:"Data Missing", success:false})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        res.json({
            message:"Profile Updated",
            success:true
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}