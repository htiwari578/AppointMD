import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'


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

// API for admin login
export const loginAdmin = async (req,res) =>  {
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY );
            // const token = jwt.sign(
            //     { email: email },
            //     process.env.JWT_SECRET_KEY,
            //     { expiresIn: '1h' } // Token will expire in 1 hour
            // );
            res.json({success:true,token})
        }else{
            res.json({
                message:"Invalid credentials",
                success:false
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

// api to get all doctors list for admin panel

export const allDoctors = async (req ,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

//api to get all appointments list

export const appointmentsAdmin = async (req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({
            success:true,
            appointments
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

//api for appointment cancellation
export const appointmentsCancel = async (req,res)=> {
    try {
        const { appointmentId} =  req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        //realeasing doctor slot 
        const {docId, slotDate , slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked ;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"Appointments Cancelled"})
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}