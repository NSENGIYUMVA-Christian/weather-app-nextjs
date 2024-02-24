'use client'
import React from 'react'
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import styles from "./page.module.scss"
import { useAppContext } from '@/context';
import FieldBox from '@/components/weatherBox/page';
import SunnyWeatherIcon from '@/components/sunnyWeatherIcon';





const resultPage = () => {
     /// getting global context
     const {auth,setAuth,CurrentWeatherData,setCurrentWeatherData,PastWeatherData,setPastWeatherData} = useAppContext()
     console.log("llll",PastWeatherData)
     console.log("where",CurrentWeatherData?.location?.name)
     const AmOrPm = CurrentWeatherData?.location?.localtime.split(" ")[1].split(":")[0] <= 12 ? "AM" : "PM"
  return (
    <div className={styles.mainContainer} >
        {/* col 1 */}
        <div className={styles.col1} >
            <h3>Past Weather Details</h3>
            {/* weather data rendering */}
     <div>
        {PastWeatherData.map((data:any,index:any)=>{
          return <FieldBox key={index} eachWeatherData={data} />
        })}
     </div>

        </div >
        {/* col 2 */}
        <div className={styles.col2}>
      <h3>Current Weather</h3>
     <p>{CurrentWeatherData?.location?.name} {CurrentWeatherData?.location?.region} {CurrentWeatherData?.location?.country} {CurrentWeatherData?.location?.localtime.split(" ")[1]} {AmOrPm} </p> 
      <SunnyWeatherIcon/>
        </div>
    </div>
  )
}

export default resultPage