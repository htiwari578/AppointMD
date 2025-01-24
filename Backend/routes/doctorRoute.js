import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorList, loginDoctor } from '../controllers/doctor.js'
import { authDoctor } from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor, appointmentCancel)

export default doctorRouter;