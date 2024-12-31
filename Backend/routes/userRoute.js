import express from 'express'
import { getProfile, loginUser, registerUser } from '../controllers/user.js'
import authUser from '../middleware/authUser.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser, getProfile)

export default userRouter