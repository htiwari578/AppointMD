import React, { useContext } from 'react'
import { AdminContext } from '../context/Admin.Context'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/Doctor.Context'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {docToken} = useContext(DoctorContext)
  return (
    <div className="min-h-screen bg-white border-r">
        {
            aToken && <ul className="text-[#515151] mt-5">
               <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}to={'/admin-dashboard'}>
                    <img src= {assets.home_icon} alt ="" />
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appoinment'}>
                    <img src= {assets.appointment_icon} alt ="" />
                    <p className="hidden md:block">Appoinment</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to ={'/add-doctor'}>
                    <img src= {assets.add_icon} alt ="" />
                    <p className="hidden md:block">Add Doctos</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-list'}>
                    <img src= {assets.people_icon} alt ="" />
                    <p className="hidden md:block">Doctor List</p>
                </NavLink>
            </ul>
        }
         {
           docToken && <ul className="text-[#515151] mt-5">
               <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}to={'/doctor-dashboard'}>
                    <img src= {assets.home_icon} alt ="" />
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-appointments'}>
                    <img src= {assets.appointment_icon} alt ="" />
                    <p className="hidden md:block">Appoinment</p>
                </NavLink>

              

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-profile'}>
                    <img src= {assets.people_icon} alt ="" />
                    <p className="hidden md:block">Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar