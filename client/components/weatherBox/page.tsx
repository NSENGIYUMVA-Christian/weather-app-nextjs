import React, { FC } from 'react'
import localFont from "next/font/local"
import styles from "./page.module.scss";



 type FieldProps = {
  eachWeatherData: any
    }


const FieldBox:FC<FieldProps> = ({eachWeatherData}) => {

  // destructure data
  const {date,temperature} = eachWeatherData

  console.log("wele",eachWeatherData)

  return (
  <div className={styles.fieldContainer} >  
    <p>{date.split(" ")[0] }:{temperature + '\u00B0'+"C"}</p>
  </div>
  )
}

export default FieldBox