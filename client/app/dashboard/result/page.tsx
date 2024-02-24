'use client'
import React, { useEffect } from 'react'
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import styles from "./page.module.scss"
import { useAppContext } from '@/context';
import FieldBox from '@/components/weatherBox/page';
import SunnyWeatherIcon from '@/components/sunnyWeatherIcon';
import { getCurrentDataFromLocalStorage , getPastDataFromLocalStorage} from '@/utils/localStorage';



const resultPage = () => {
     /// getting global context
     const {triggerFetch,setTriggerFetch,auth,setAuth,CurrentWeatherData,setCurrentWeatherData,PastWeatherData,setPastWeatherData} = useAppContext()
     
     useEffect(()=>{
        console.log("99999")
     /// set current data
     setCurrentWeatherData(getCurrentDataFromLocalStorage())
     /// set past data
     setPastWeatherData(getPastDataFromLocalStorage())
     
     },[])
     
     console.log("llll",PastWeatherData);
     console.log("where",CurrentWeatherData?.location?.name);
     const AmOrPm = CurrentWeatherData?.location?.localtime.split(" ")[1].split(":")[0] <= 12 ? "AM" : "PM";
  return (
    <div className={styles.mainContainer} >
        {/* col 1 */}
        <div className={styles.col1} >
            <h3>Past Weather Details</h3>
            {/* weather data rendering */}
     <div>  
        {PastWeatherData?.map((data:any,index:any)=>{
          return <FieldBox key={index} eachWeatherData={data} />
        })}
     </div>
        </div >
        {/* col 2 */}
        <div className={styles.col2}>
      <h3>Current Weather</h3>
     <p> {CurrentWeatherData?.location?.region} {CurrentWeatherData?.location?.country} {CurrentWeatherData?.location?.localtime.split(" ")[1]} {AmOrPm} </p> 
      <SunnyWeatherIcon/>
      <p>{CurrentWeatherData?.current?.temp_c}</p>
        </div>
    </div>
  )
}

export default resultPage