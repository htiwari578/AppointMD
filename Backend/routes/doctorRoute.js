import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDocProfile } from '../controllers/doctor.js'
import { authDoctor } from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor, appointmentCancel)
doctorRouter.post('/cancel-appointment',authDoctor, appointmentCancel)
doctorRouter.get('/dashboard',authDoctor, doctorDashboard)
doctorRouter.get('/profile',authDoctor, doctorProfile)
doctorRouter.post('/update-profile',authDoctor, updateDocProfile)

export default doctorRouter;