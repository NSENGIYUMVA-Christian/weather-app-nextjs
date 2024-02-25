'use client'
import React, { useEffect } from 'react'
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import styles from "./page.module.scss"
import Image from 'next/image'
import { useAppContext } from '@/context';
import FieldBox from '@/components/weatherBox/page';
import SunnyWeatherIcon from '@/components/sunnyWeatherIcon';
import { getCurrentDataFromLocalStorage , getPastDataFromLocalStorage} from '@/utils/localStorage';
import sunclouds from '../../../public/images/sunclouds.png';
import { Sofia_Sans } from "next/font/google";

const sofiaSansMedium = Sofia_Sans({ weight: "500", subsets: ["latin"] });
const sofiaSansRegular = Sofia_Sans({ weight: "400", subsets: ["latin"] });


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
        <h3 className={`${styles.currentLocationTitle} ${bicycletteRegular.className}`}>Current Weather</h3>
          <div className={`${styles.currentWeatherContainer}`} >
          <div className={`${styles.currentWeather}`}  >
         <div className={styles.sunIcon} ><SunnyWeatherIcon   /></div> 
          <p className={`${styles.currentLocationSubTitle} ${sofiaSansRegular.className}`} >Current Location</p>
          <p className={`${sofiaSansRegular.className} ${styles.currentWeatherData} `} > {CurrentWeatherData?.location?.region} {CurrentWeatherData?.location?.country} {CurrentWeatherData?.location?.localtime.split(" ")[1]} {AmOrPm} </p> 
      <p className={`${sofiaSansMedium.className} ${styles.currentWeatherData}`}  >{CurrentWeatherData?.current?.temp_c + '\u00B0'+"C"}</p>
         
          </div>
     </div>
   
        </div>
    </div>
  )
}

export default resultPage