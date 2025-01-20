import express from 'express'
import { bookAppointment, cancelAppointments, getProfile, listAppointmnets, loginUser, registerUser, updateProfile } from '../controllers/user.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile',upload.single("image"),authUser, updateProfile)
userRouter.post('/book-appointment',authUser, bookAppointment)
userRouter.get('/appointments',authUser, listAppointmnets)
userRouter.get('/cancel-appointment',authUser, cancelAppointments)

export default userRouter