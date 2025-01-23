import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/Admin.Context';
import Navbar from './componets/Navbar';
import Sidebar from './componets/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/Doctor.Context';
import DoctorDashborad from './pages/Doctor/DoctorDashborad';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {docToken} = useContext(DoctorContext)

  return aToken || docToken ? (
    <div className="bg-[#F8F9FD]" >

      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
         {/* admin route */}
          <Route path ='/' element={<></>} />
          <Route path ='/admin-dashboard' element={<Dashboard/>} />
          <Route path ='/all-appoinment' element={<AllAppointment/>} />
          <Route path ='/add-doctor' element={<AddDoctor/>} />
          <Route path ='/doctor-list' element={<DoctorList/>} />
         

          {/* doctor route */}
          <Route path ='/doctor-dashboard' element={<DoctorDashborad/>} />
          <Route path ='/doctor-appointments' element={<DoctorAppointment/>} />
          <Route path ='/doctor-profile' element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
     <Login />
     <ToastContainer />
    </>
  )
}

export default App