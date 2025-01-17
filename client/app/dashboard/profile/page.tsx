'use client'
import React, { useEffect,useState } from 'react'
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import styles from "./page.module.scss"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { removeUserFromLocalStorage} from "@/utils/localStorage";

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
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null);

    //user data
    const [userData,setUserData] = useState<any>({
        username:auth?.username,
        password:"" ,
        repeatPassword:"",
        first_name:auth?.first_name,
        last_name:auth?.last_name,
        email:auth?.email
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFile(event.target.files[0]);
      }
    };

    useEffect(()=>{
      //set user data
      setUserData({
        username:auth?.username,
        password:"" ,
        repeatPassword:"",
        first_name:auth?.first_name,
        last_name:auth?.last_name,
        email:auth?.email,
        img_url:auth?.img_url || ""
      })
      /// set current data
      setCurrentWeatherData(getCurrentDataFromLocalStorage())
      /// set past data
      setPastWeatherData(getPastDataFromLocalStorage())
      },[])
      /// handle logout
      const handleLogout = ()=>{
        console.log("logout")
        removeUserFromLocalStorage()
        setAuth(null);
        router.push('/')
        toast.success("Logout success")
      }
      ///// update user form
        ///// handle register form change
    const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [event.target.name]: event.target.value });
        };

        //// update user submit
        const submitUpdatedData = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault()
          if (!file) return;

          const formData = new FormData();
          formData.append('image', file);
          try {
            /// check if password is provided
          
              if(userData.password !== userData.repeatPassword )
              {
                console.log("new pass",userData.password)
                console.log("rep pass",userData.repeatPassword)
                toast.warning("Password doesn't match")
                return
              }
/////  uploading image
const response = await axios.post(`http://localhost:8080/api/v1/image/upload/${auth?.id}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
console.log("image upload success",response)
////updating users
  const {data} = await axios.patch(`http://localhost:8080/api/v1/auth/update/${auth?.id}`,userData)
         console.log("temp",data)
             if(data?.success)
          {
            console.log("update data",data)
            setAuth(data.user)
            setUserData(data.user)
            toast.success(data?.msg)
          }
          if(!data?.success)
          {
            toast.warning(data?.msg)
          }
          } catch (error) {
            toast.warning("There was an error")
             // console.log("there was an error")
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
      {/* profile image */}
      <img
      src={userData?.img_url}
      alt="profile image"
      width={100}
      height={100}
      className={styles.profileImg}
    />
 <input type="file" accept="image/*" onChange={handleFileChange} />
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
         <button className={ `${sofiaProBold.className} ${styles.logoutBtn}`}  onClick={handleLogout} >Logout</button>
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