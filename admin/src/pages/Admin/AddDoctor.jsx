import React from 'react'
import {assets} from '../../assets/assets'

const AddDoctor = () => {
  return (
    <form className="m-5 w-full">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl overflow-x-scroll ">
            <div className="flex items-center gap-4 mb-8 text-gray-500">
                <label htmlFor='doc-img'>
                    <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src = {assets.upload_area} alt = "" />
                </label>
                <input type="file" id="doc-img" hidden/>
                <p>Upload doctor <br /> picture </p>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                <div className="w-full lg:flex-1 flex flex-col gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                        <p>Doctor name</p>
                        <input className="border rounded px-3 py-2" type="text" placeholder='Name' required/>
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                        <p>Doctor Email</p>
                        <input className="border rounded px-3 py-2" type="email" placeholder='Email' required/>
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                        <p>Doctor Password</p>
                        <input className="border rounded px-3 py-2" type="password" placeholder='Password' required/>
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                        <p>Experience</p>
                        <select className="border rounded px-3 py-2" name="" id="">
                            <option value="1 year">1 year</option>
                            <option value="2 year">2 year</option>
                            <option value="3 year">3 year</option>
                            <option value="4 year">4 year</option>
                            <option value="5 year">5 year</option>
                            <option value="6 year">6 year</option>
                            <option value="7 year">7 year</option>
                            <option value="8 year">8 year</option>
                            <option value="9 year">9 year</option>
                            <option value="10 year">10 year</option>
                        
                        </select>
                    </div>
                    <div>
                        <p>Fees</p>
                        <input className="border rounded px-3 py-2" type="number" placeholder='fees' required/>
                    </div>
                </div>

                <div className="w-full lg:flex-1 flex flex-col gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                        <p>Speciality</p>
                        <select className="border rounded px-3 py-2" name="" id="">
                        <option value="General physician">General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <p>Education</p>
                        <input className="border rounded px-3 py-2" type="text" placeholder='Education' required/>
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                        <p>Address</p>
                        <input className="border rounded px-3 py-2" type="text" placeholder="address 1" required/>
                        <input className="border rounded px-3 py-2" type="text" placeholder="address 2" required/>
                    </div>

                </div>
            </div>
            <div>
                <p className="mt-4 mb-2">About Doctor</p>
                <textarea className="w-full px-4 pt-2 border rounded" placeholder='Write about doctor' rows={5} required/>
            </div>
            <button className="bg-primary px-10 py-3 text-white rounded-full">Add Doctor</button>
        </div>
    </form>
  )
}

export default AddDoctor