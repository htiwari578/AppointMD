import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';

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