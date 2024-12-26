import { createContext, useState } from "react";


export const AdminContext = createContext()


const AdminContextProvider = (props) => {

    const [aToken , setAtoken] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        aToken , setAtoken,
        backendUrl,
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider