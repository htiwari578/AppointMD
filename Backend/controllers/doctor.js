import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";

export const changeAvailablity = async (req,res) => {
    try {
        const {docId} = req.body;
        const doctorData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !doctorData.available})
        res.json({
            message:"Availablity Changed",
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

export const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({
            success:true,
            doctors
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}


//api for doctor login

export const loginDoctor = async (req,res)=>{
    try {
        const {email , password} = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const passwordisMatch = await bcrypt.compare(password ,doctor.password)

        if(passwordisMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET_KEY)
            res.json({
                success:true,
                token
            })
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }


    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

//api to get doctor appointments for doctor pannel

export const appointmentsDoctor = async (req,res)=> {
    try {
        const {docId} = req.body

        const appointments = await appointmentModel.find({docId})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}