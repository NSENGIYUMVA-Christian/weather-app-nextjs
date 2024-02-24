'use client'
import React from 'react'
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import styles from "./page.module.scss"
import { useAppContext } from '@/context';


const resultPage = () => {
     /// getting global context
     const {auth,setAuth,CurrentWeatherData,setCurrentWeatherData,PastWeatherData,setPastWeatherData} = useAppContext()
     console.log("llll",PastWeatherData)
  return (
    <div className={styles.mainContainer} >
        {/* col 1 */}
        <div className={styles.col1} >
            <h3>Past Weather Details</h3>
            {/* weather data rendering */}
     <div>
        {PastWeatherData.map((x:any,index:number)=>{
            return <h2 key={index} >{x.date}</h2>
        })}
     </div>

        </div >
        {/* col 2 */}
        <div className={styles.col2}>

        </div>
    </div>
  )
}

export default resultPage