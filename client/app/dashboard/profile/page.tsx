'use client'
import React, { useEffect } from 'react'
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import styles from "./page.module.scss"
import Image from 'next/image'
import leftArrowIcon from "../../../public/images/leftArrow.svg"
import { useAppContext } from '@/context';
import { getCurrentDataFromLocalStorage , getPastDataFromLocalStorage} from '@/utils/localStorage';
import { Sofia_Sans } from "next/font/google";
import Link from 'next/link';
const sofiaSansMedium = Sofia_Sans({ weight: "500", subsets: ["latin"] });
const sofiaSansRegular = Sofia_Sans({ weight: "400", subsets: ["latin"] });


const page = () => {
    /// getting global context
    const {triggerFetch,setTriggerFetch,auth,setAuth,CurrentWeatherData,setCurrentWeatherData,PastWeatherData,setPastWeatherData} = useAppContext()
        /// getting auth data
    const {id,first_name,last_name,email,username} = auth || {}
    useEffect(()=>{
   
      /// set current data
      setCurrentWeatherData(getCurrentDataFromLocalStorage())
      /// set past data
      setPastWeatherData(getPastDataFromLocalStorage())
      
      },[])

  return (
    <section className={`${styles.main}  `} >
{/* row 1 */}
<div className={styles.row1}>
<Link href="/" className={`${sofiaProMedium.className} ${styles.backBtn} `} >  <span className={styles.leftArrowIcon}><Image src={leftArrowIcon} alt='back'  /></span>  <span>Back to search</span></Link>
<span className={`${styles.mainTitle} ${sofiaProMedium.className} `} >Your Profile</span>
</div>
{/* row 2 */}
<div className={styles.row2}>
  {/* col1 */}
  <div className={styles.rowCol1}>
    <div className={`${styles.rowCol1Content} `}>
      <div className={`${styles.rowCol1ContentPart1} `}>
      <span className={`${sofiaProMedium.className} ${styles.usernames} `} >{first_name} {last_name}</span>
      <p className={`${sofiaProBold.className} `}  >User</p>
      </div>
      {/* part 2 */}
     <div>

     </div>
    </div>
  </div>
  {/* col2 */}
  <div  className={styles.rowCol2}>Col2</div>
</div>
    </section>
  )
}

export default page