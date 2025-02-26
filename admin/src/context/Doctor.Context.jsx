import { createContext, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const  backendUrl = 'https://appointmd-backend.onrender.com'

    const [docToken , setDocToken] = useState(localStorage.getItem('docToken')?localStorage.getItem('docToken') : '')

    const [appointments,setAppointments] = useState([])
    const [dashData , setDashData] = useState(false)
    const [profileData , setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{docToken}})
            if(data.success){
                setAppointments(data.appointments)
              
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    //function to mark appointment completed

    const completeAppointments = async (appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl+ '/api/doctor/complete-appointment',{appointmentId}, {headers:{docToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // function to cancel appointments
    const cancelAppointments = async (appointmentId)=>{
        try {
            const {data} = await axios.post(backendUrl+ '/api/doctor/cancel-appointment',{appointmentId}, {headers:{docToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    //for doctor dashboard

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{docToken}})
            if(data.success){
                setDashData(data.dashData)
            
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    //fetch api data of doctor profile

    const getProfileData = async ()=>{
        try {
            const {data}=  await axios.get(backendUrl + '/api/doctor/profile',{headers:{docToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        docToken , setDocToken,
        backendUrl , appointments, setAppointments,
        getAppointments,completeAppointments,
        cancelAppointments,dashData,setDashData,
        getDashData,profileData , setProfileData,
        getProfileData 
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

