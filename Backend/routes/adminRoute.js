import express from 'express'

import { addDoctor, allDoctors, appointmentsAdmin, loginAdmin } from '../controllers/admin.js';
import upload from '../middleware/multer.js';
import { authAdmin } from '../middleware/authAdmin.js';
import { changeAvailablity } from '../controllers/doctor.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin,upload.single('image'),addDoctor );
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/change-availablity',authAdmin, changeAvailablity)
adminRouter.post('/appointments',authAdmin, appointmentsAdmin)

export default adminRouter;