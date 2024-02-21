'use client'
 
import React,{useEffect, useLayoutEffect} from 'react'
import { useAppContext } from '@/context';
import { useRouter } from 'next/navigation'
import banner from '../../public/images/banner.svg';
import searchIcon from '../../public/images/searchIcon.svg'
import Image from 'next/image'
import styles from "./page.module.scss"
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import {  toast } from 'react-toastify';
import SearchIcon from '@/components/searchIcon';



const dashboard = () => {
    const router = useRouter()
       
    const {auth,setAuth} = useAppContext()
console.log("test hh",auth)
    useLayoutEffect(()=>{
       if(!auth)
       {
        router.push('/auth')
       }
    },[])

    /// getting auth data
    const {id,first_name,last_name,email,username} = auth || {}
  return (<>
 {auth && <div className={`${styles.mainContainer} `}>
  {/* col 1 */}
  <div>
    {/* weather banner */}
    <Image
      src={banner}
      alt="weather banner"
    />
  </div>
  {/* col-2 */}
  <div className={styles.col2} >
  <h3>Hi {first_name}</h3> 
 
  <form>
    <div className={styles.col2Row1} >
    <h3 className={` ${styles.title} ${bicycletteRegular.className}`} >Location</h3>
    <p>Please select your location desire</p>
    </div>
   
    <div className={styles.col2Row2} >
      <div className={styles.field}  >
      <label htmlFor="location" className={`${sofiaProRegular.className}`}  > Location</label>
      <div className={styles.searchContainer} ><input  id="location" type="text" name=""  className={sofiaProMedium.className}  placeholder='Kanombe,Kigali,Rwanda' /> <span className={styles.searchIconContainer} > <SearchIcon/></span> </div> 
      </div>
    </div>
    {/* submit search btn */}
    <div className={styles.col2Row3}>
    <button className={styles.submitBtn} >Submit</button>
    </div>
  
  </form>
  </div>

    </div> }
  </>
   
    
  )
}

export default dashboard