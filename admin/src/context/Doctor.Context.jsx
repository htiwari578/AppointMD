import { createContext } from "react";
import { AppContext } from "./App.context";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const value = {

    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider

