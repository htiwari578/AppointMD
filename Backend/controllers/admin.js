import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'


export const addDoctor = async (req,res) => {
    try {

        const {name,password ,email,speciality, degree ,experience, about, fees, address} = req.body;
        const imageFile = req.file;
        // check for all data to add doctor
        if(!name || !password || !email || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({
                message:"something is missing",
                success:false
            })
        }
        // validating email format
        if(!validator.isEmail(email)){
            return res.json({
                message:"Please enter a valid email",
                success:false
            })
        }
        // validating strong password
        if(password.length < 8){
            return res.json({
                message:"Please enter a strong password",
                success:false
            })
        }
        // hasing doctor password
        const hashedPassword = await bcrypt.hash(password,10);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword ,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()

        }
        const newDocter = new doctorModel(doctorData)
        await newDocter.save();

        res.json({message:"Doctor added succesfully", success:true})


    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}