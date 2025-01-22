import validator from 'validator'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';
import {v2 as cloudinary} from "cloudinary"
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'

dotenv.config();


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

//api to book appointment
 
export const bookAppointment = async (req,res)=> {
    try {
        const {userId , docId,  slotDate,  slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')
     

        if(!docData.available){
            return res.json({success:false ,message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked;
       
       

       

        // checking for slots availablity
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false ,message:"Slots not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }

        }else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime)
        }
       
        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointementData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()

        }
        const newAppointment = new appointmentModel(appointementData)
        await newAppointment.save()


        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({
            message:"Appointment booked",
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


//api to get user appointments for frontend my-appointments


export const listAppointmnets = async (req,res) =>{
    try {
        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId})

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


//api to cancel appointment

export const cancelAppointments = async (req,res)=> {
    try {
        const {userId, appointmentId} =  req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user 
        if(appointmentData.userId !== userId) {
            return res.json({
                success:false,
                message:"Unauthorized action"
            })
        }
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

//api for payment using razorpay

 const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const paymentRazorpay = async (req,res)=>{

    try {
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
    
        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment cancelled or not found"})
        }
        //creating options for razorpay
    
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt : appointmentId,
    
        }
        //create of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({success:true,order})
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
   
}

//api to verify payment of razorpay

export const verifyRazorpay = async (req,res)=>{
    try {
        const {razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment successfull"})
        }else{
            res.json({success:false,message:"Payment failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({
            message:"Server error",
            success:false
        })
    }
}