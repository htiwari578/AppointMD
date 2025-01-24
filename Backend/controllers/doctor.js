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

// api to mark appointment completed for doctor panel

export const appointmentComplete = async (req,res)=>{
    try {
        const {docId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:"Appointment Completed"})
        }else{
            return res.json({success:false,message:"Mark failed"})
        }

    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

// api to cancel appointment for doctor panel

export const appointmentCancel = async (req,res)=>{
    try {
        const {docId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:"Appointment Cancelled"})
        }else{
            return res.json({success:false,message:"Cancellatiion  failed"})
        }

    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

//api to get dashboard data for doctor pannel

export const doctorDashboard = async(req,res)=>{
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})

        let earnings = 0
        //totl earnings
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })
        //total patients
        let patients = []
        appointments.map((item)=> {
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)

        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

//api to get doctor profile for doctor pannel

export const doctorProfile = async(req,res)=>{
    try {
        const {docId}= req.body

        const profileData = await doctorModel.findById({docId}).select('-password')

        res.json({
            success:true,profileData
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}

// api to update doctor profile

export const updateDocProfile = async (req,res)=>{
    try {
        const {docId, fees, address, available} = req.body

        await doctorModel.findByIdAndUpdate(docId, {fees,address,available})

        res.json({success:true,message:"profile updated"})


    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}