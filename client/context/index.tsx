"use client"
import {createContext,ReactNode, useState,useContext} from"react"


const AppContext =  createContext<any>(undefined);

export function AppWrapper({children}:{
    children:ReactNode
}){
    const [name, setName] = useState('chris')

    return (
        <AppContext.Provider value={{name,setName}} >
            {children}
        </AppContext.Provider>
    )
}


export function useAppContext(){
    return useContext(AppContext)
}