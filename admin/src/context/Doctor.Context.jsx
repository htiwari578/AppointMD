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
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());
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
        getAppointments
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

