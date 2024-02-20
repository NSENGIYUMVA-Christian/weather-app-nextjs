"use client"
import {createContext,ReactNode, useState,useContext} from"react"
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "@/utils/localStorage";

const AppContext =  createContext<any>(undefined);

export function AppWrapper({children}:{
    children:ReactNode
}){
     ////////auth state
    const [auth,setAuth] = useState(getUserFromLocalStorage())
  

    return (
        <AppContext.Provider value={{auth,setAuth}} >
            {children}
        </AppContext.Provider>
    )
}


export function useAppContext(){
    return useContext(AppContext)
}