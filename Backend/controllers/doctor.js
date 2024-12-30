import doctorModel from "../models/doctorModel.js";

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