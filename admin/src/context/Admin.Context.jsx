import { createContext, useState } from "react";
import axios  from 'axios'
import {toast} from 'react-toastify'


export const AdminContext = createContext()


const AdminContextProvider = (props) => {

    const [aToken , setAtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken') : '');

    const [doctors , setDoctors] = useState([])
    const[appointments , setAppointments ] = useState([])
    const[dashData , setDashData] = useState(false)

    const backendUrl = 'https://appointmd-backend.onrender.com'

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailablity = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availablity',{docId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //cancel apppointments from api

    const cancelAppointments = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
           
        }
    }
    //dashboard data from api

    const getDashData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
             
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        aToken , setAtoken,
        backendUrl,doctors,
        getAllDoctors,  changeAvailablity ,
        appointments,setAppointments, getAllAppointments,
        cancelAppointments , dashData, getDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider
