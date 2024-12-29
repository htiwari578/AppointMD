import React, { useContext } from 'react'
import { AdminContext } from '../context/Admin.Context'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
  return (
    <div className="min-h-screen bg-white border-r">
        {
            aToken && <ul className="text-[#515151] mt-5">
               <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}to={'/admin-dashboard'}>
                    <img src= {assets.home_icon} alt ="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appoinment'}>
                    <img src= {assets.appointment_icon} alt ="" />
                    <p>Appoinment</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to ={'/add-doctor'}>
                    <img src= {assets.add_icon} alt ="" />
                    <p>Add Doctos</p>
                </NavLink>

                <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-list'}>
                    <img src= {assets.people_icon} alt ="" />
                    <p>Doctor List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar