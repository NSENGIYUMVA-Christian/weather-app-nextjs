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
     <div className={`${styles.rowCol1ContentPart2} `}>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className} >Email</span>
        <p className={`${sofiaProMedium.className}`}>{email}</p>
         </div>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className}>First Name</span>
        <p className={`${sofiaProMedium.className}`} >{first_name}</p>
         </div>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className}>Last Name</span>
        <p className={`${sofiaProMedium.className}`} >{last_name}</p>
         </div>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className}>Username</span>
        <p className={`${sofiaProMedium.className}`} >{username}</p>
         </div>
     </div>
    </div>
  </div>
  {/* col2 */}
  <div  className={styles.rowCol2}>
  <form >
      <div className={styles.field} >
      <label htmlFor="First" className={`${sofiaProRegular.className}`}  >First name</label>
      <input id='First' type='text' name='first_name' value={first_name}  placeholder='john'   />
      </div>
          <div className={styles.field} >
              <label htmlFor="Last" className={`${sofiaProRegular.className}`} >Last name</label>
    <input id='Last' className={sofiaProMedium.className} type='text' name='last_name' value={last_name}    />
    </div>
        <div className={styles.field} >
            <label htmlFor="Email" className={`${sofiaProRegular.className}`} >Email</label>
    <input id='Email' className={sofiaProMedium.className} type='email' name='email' value={email}    />
    </div>
        <div className={styles.field} >
            <label htmlFor="Username" className={`${sofiaProRegular.className}`} >Username</label>
    <input id='Username' className={sofiaProMedium.className} type='text' name='username' value={username}    />
    </div>
        <div className={styles.field} >
            <label htmlFor="Password" className={`${sofiaProRegular.className}`} >Password</label>
    <input id='Password' className={sofiaProMedium.className} type='password' name='password' value={""} placeholder='*****'    />
    </div>
        <div className={styles.field} >
            <label htmlFor="RepeatPassword" className={`${sofiaProRegular.className}`} >Repeat Password</label>
    <input id='Password' className={sofiaProMedium.className} type='password' name='password' value={""} placeholder='*****'    />
    </div>   
  </form>
  </div>

</div>
  {/* Row 3 */}
  <div className={styles.rowCol3}>
  <button className={`${styles.updateBtn}`} >Update</button>
  <button className={`${styles.cancelBtn}`} >Cancel</button>
  </div>
    </section>
  )
}

export default page