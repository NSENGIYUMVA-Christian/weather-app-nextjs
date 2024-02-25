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
        <div className={`${styles.col1} ${bicycletteRegular.className}`} >
            <p className={`${styles.col1title} `} >Past Weather Details</p>
            {/* weather data rendering */}
     <div className={styles.pastWeatherDtaContainer} >  
        {PastWeatherData?.map((data:any,index:any)=>{
          return <FieldBox key={index} eachWeatherData={data} />
        })}
     </div>
     {/* view more */}
     
     <a className={styles.viewMoreBtn} >View More</a>
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