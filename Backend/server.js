import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})