import { createContext, useState } from "react";
import { AppContext } from "./App.context";
import axios from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const  backendUrl = import.meta.env.VITE_BACKEND_URL

    const [docToken , setDocToken] = useState(localStorage.getItem('docToken')?localStorage.getItem('docToken') : '')

    const [appointments,setAppointments] = useState([])

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

    const value = {
        docToken , setDocToken,
        backendUrl , appointments, setAppointments,
        getAppointments,completeAppointments,
        cancelAppointments
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

