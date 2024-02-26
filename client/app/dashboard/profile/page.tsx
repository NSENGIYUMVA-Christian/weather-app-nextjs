'use client'
import React, { useEffect,useState } from 'react'
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
import {  toast } from 'react-toastify';
import axios from "axios"


const page = () => {
    /// getting global context
    const {triggerFetch,setTriggerFetch,auth,setAuth,CurrentWeatherData,setCurrentWeatherData,PastWeatherData,setPastWeatherData} = useAppContext()
   
    //user data
    const [userData,setUserData] = useState<any>({
        username:auth?.username,
        password:"" ,
        repeatPassword:"",
        first_name:auth?.first_name,
        last_name:auth?.last_name,
        email:auth?.email
    })

    useEffect(()=>{
      //set user data
      setUserData({
        username:auth?.username,
        password:"" ,
        repeatPassword:"",
        first_name:auth?.first_name,
        last_name:auth?.last_name,
        email:auth?.email
      })
      /// set current data
      setCurrentWeatherData(getCurrentDataFromLocalStorage())
      /// set past data
      setPastWeatherData(getPastDataFromLocalStorage())
      },[])

      ///// update user form
        ///// handle register form change
    const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [event.target.name]: event.target.value });
        };

        //// update user submit
        const submitUpdatedData = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault()
          try {
            //  const {data} = await axios.post("http://localhost:8080/api/v1/auth/register",registerData)
          
            console.log("update data",userData)
              toast.success("Update success")
          } catch (error) {
              console.log("there was an error")
          }
        };

  return (
    <section className={`${styles.main}  `} >
{/* row 1 */}
<div className={styles.row1}>
<Link href="/dashboard" className={`${sofiaProMedium.className} ${styles.backBtn} `} >  <span className={styles.leftArrowIcon}><Image src={leftArrowIcon} alt='back'  /></span>  <span>Back to search</span></Link>
<span className={`${styles.mainTitle} ${sofiaProMedium.className} `} >Your Profile</span>
</div>
{/* row 2 */}
<div className={styles.row2}>
  {/* col1 */}
  <div className={styles.rowCol1}>
    <div className={`${styles.rowCol1Content} `}>
      <div className={`${styles.rowCol1ContentPart1} `}>
      <span className={`${sofiaProMedium.className} ${styles.usernames} `} >{auth?.first_name} {auth?.last_name}</span>
      <p className={`${sofiaProBold.className} `}  >User</p>
      </div>
      {/* part 2 */}
     <div className={`${styles.rowCol1ContentPart2} `}>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className} >Email</span>
        <p className={`${sofiaProMedium.className}`}>{auth?.email}</p>
         </div>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className}>First Name</span>
        <p className={`${sofiaProMedium.className}`} >{auth?.first_name}</p>
         </div>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className}>Last Name</span>
        <p className={`${sofiaProMedium.className}`} >{auth?.last_name}</p>
         </div>
         <div className={`${styles.rowCol1ContentPart2FieldBox} `} >
        <span className={sofiaProRegular.className}>Username</span>
        <p className={`${sofiaProMedium.className}`} >{auth?.username}</p>
         </div>
     </div>
    </div>
  </div>
  {/* col2 */}
  <div  className={styles.rowCol2}>
  <form >
      <div className={styles.field} >
      <label htmlFor="First" className={`${sofiaProRegular.className}`}  >First name</label>
      <input id='First' type='text' name='first_name' value={userData?.first_name}  onChange={handleUserDataChange}   />
      </div>
          <div className={styles.field} >
              <label htmlFor="Last" className={`${sofiaProRegular.className}`} >Last name</label>
    <input id='Last' className={sofiaProMedium.className} type='text' name='last_name' value={userData?.last_name}  onChange={handleUserDataChange}  />
    </div>
        <div className={styles.field} >
            <label htmlFor="Email" className={`${sofiaProRegular.className}`} >Email</label>
    <input id='Email' className={sofiaProMedium.className} type='email' name='email' value={userData?.email} onChange={handleUserDataChange}   />
    </div>
        <div className={styles.field} >
            <label htmlFor="Username" className={`${sofiaProRegular.className}`} >Username</label>
    <input id='Username' className={sofiaProMedium.className} type='text' name='username' value={userData?.username}  onChange={handleUserDataChange}  />
    </div>
        <div className={styles.field} >
            <label htmlFor="Password" className={`${sofiaProRegular.className}`} >Password</label>
    <input id='Password' className={sofiaProMedium.className} type='password' name='password' value={userData?.password} placeholder='*****'  onChange={handleUserDataChange}  />
    </div>
        <div className={styles.field} >
            <label htmlFor="RepeatPassword" className={`${sofiaProRegular.className}`} >Repeat Password</label>
    <input id='Password' className={sofiaProMedium.className} type='password' name='repeatPassword' value={userData?.repeatPassword} placeholder='*****'  onChange={handleUserDataChange}  />
    </div>   
  </form>
  </div>

</div>
  {/* Row 3 */}
  <div className={styles.rowCol3}>
  <button className={`${styles.updateBtn}`} onClick={submitUpdatedData} >Update</button>
  <button className={`${styles.cancelBtn}`} >Cancel</button>
  </div>
    </section>
  )
}

export default page