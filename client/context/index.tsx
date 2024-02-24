"use client"
import {createContext,ReactNode, useState,useContext} from"react"
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "@/utils/localStorage";


const AppContext =  createContext<any>(undefined);

export function AppWrapper({children}:{
    children:ReactNode
}){
     ////////auth state
    const [auth,setAuth] = useState(getUserFromLocalStorage())
      /// weather data
      const [CurrentWeatherData,setCurrentWeatherData] = useState<any>(null)
      /// past weather data
      const [PastWeatherData,setPastWeatherData] = useState<any>(null)
      /// loading 
      const [isLoading,setIsLoading] = useState<boolean>(false)

  

    return (
        <AppContext.Provider value={{auth,setAuth,isLoading,setIsLoading,CurrentWeatherData,setCurrentWeatherData,PastWeatherData,setPastWeatherData}} >
            {children}
        </AppContext.Provider>
    )
}


export function useAppContext(){
    return useContext(AppContext)
}