'use client'
 
import React,{useEffect, useLayoutEffect} from 'react'
import { useAppContext } from '@/context';
import { useRouter } from 'next/navigation'
import banner from '../../public/images/banner.svg';
import Image from 'next/image'
import styles from "./page.module.scss"


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
  <h2>welcome {first_name} to dashboard</h2> 
  </div>

    </div> }
  </>
   
    
  )
}

export default dashboard