'use client'
 
import React,{useEffect, useLayoutEffect, useState} from 'react'
import { useAppContext } from '@/context';
import { useRouter } from 'next/navigation'
import banner from '../../public/images/banner.svg';
import searchIcon from '../../public/images/searchIcon.svg'
import Image from 'next/image'
import styles from "./page.module.scss"
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import {  toast } from 'react-toastify';
import SearchIcon from '@/components/searchIcon';
import axios from "axios"
import { structrurePastWeatherData } from '@/utils/structrurePastWeatherData';
import { addCurrentDataToLS, addPastDataToLS } from '@/utils/localStorage';
import Link from 'next/link';


const dashboard = () => {
    const router = useRouter()
    /// getting global context
    const {auth,setAuth,isLoading,setIsLoading,CurrentWeatherData,setCurrentWeatherData,PastWeatherData,setPastWeatherData} = useAppContext()
    ///// weather state
    const [weatherSearch,setWeatherSearch] = useState<any>({
      city:""
    })

    //// handle weather on change
    const handleWeatherOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWeatherSearch({ ...weatherSearch, [event.target.name]: event.target.value });
    };

    /// fetch data
    const fetchData = async()=>{
      try {
        setIsLoading(true)
        //// get current weather data
        const {data} = await axios.get(`https://api.weatherapi.com/v1/current.json?key=bd38e0750b764db6a8795807230208&q=${weatherSearch.city}`)
       /// get past weather data
       const daysToSubtract = 5;
       const latitude = data?.location?.lat
       const longitude = data?.location?.lon
       const EndDate = data?.location?.localtime.split(' ')[0]
    //// calculate start date
       const originalDate = new Date(EndDate); 
       const subtractedDate = new Date(originalDate); 
       subtractedDate.setDate(subtractedDate.getDate() - daysToSubtract); 
       const startDate  = subtractedDate.toISOString().split('T')[0]; 
       const tempPastData = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${EndDate}&hourly=temperature`)
        const realPastWeatherData = structrurePastWeatherData(tempPastData?.data)
       /// set past weather data
        setPastWeatherData(realPastWeatherData)
         addPastDataToLS(realPastWeatherData)
       /// set current weather data
       setCurrentWeatherData(data)
       addCurrentDataToLS(data)
       //go to result page
       router.push('/dashboard/result')
      } catch (error) {
        console.log("weather error",error)
       }
       finally{
        setIsLoading(false)
       }
    }
    ///// handle submit of weather query
    const handleWeatherSubmit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
   e.preventDefault()
   fetchData()
    }

    /// testing
    useEffect(()=>{
     console.log("weather is =",CurrentWeatherData)
     console.log("past data is =",PastWeatherData)
    
    },[CurrentWeatherData])
 
    useLayoutEffect(()=>{
       if(!auth)
       {
        router.push('/')
       }
    },[])

    /// getting auth data
    const {id,first_name,last_name,email,username} = auth || {}
  return (<>
 {auth && <div className={`${styles.mainContainer} `}>
  {/* col 1 */}
  <div className={`${styles.col1}`} >
    {/* weather banner */}
    <Image
      src={banner}
      alt="weather banner"
    />
  </div>
  {/* col-2 */}
  <div className={styles.col2} >
  <span className={`${styles.currentUser} ${sofiaProBold.className} `} > <Link href="/dashboard/profile" >{last_name} {first_name}</Link> </span> 
 
  <form>
    <div className={styles.col2Row1} >
    <h3 className={` ${styles.title} ${bicycletteRegular.className}`} >Location</h3>
    <p>Please select your location desire</p>
    </div>
   
    <div className={styles.col2Row2} >
      <div className={styles.field}  >
      <label htmlFor="location" className={`${sofiaProRegular.className}`}  > Location</label>
      <div className={styles.searchContainer} ><input  id="location" type="text" name="city" value={weatherSearch.city} onChange={handleWeatherOnChange} className={sofiaProMedium.className}  placeholder='Kanombe,Kigali,Rwanda' /> <span className={styles.searchIconContainer} > <SearchIcon/></span> </div> 
      </div>
    </div>
    {/* submit search btn */}
    <div className={styles.col2Row3}>
    <button className={styles.submitBtn} onClick={handleWeatherSubmit} disabled={isLoading} >{isLoading ? "Loading..." : "Submit"}</button>
    </div>
      
  </form>
  </div>

    </div> }
  </>
   
    
  )
}

export default dashboard