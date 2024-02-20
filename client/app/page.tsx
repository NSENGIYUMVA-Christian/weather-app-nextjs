'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import { useEffect } from "react";
import { useAppContext } from "@/context";




// const getData = async()=>{
//  // await new Promise((resolve)=>setTimeout(resolve,1000))
//    const response = await fetch("http://localhost:8080/");
//    /// throw error
//    if(!response.ok )
//    {
//      throw new Error('Failed to fetch drinks')
//    }
//    const data = await response.json();
//    return data
//  }

export default function Home() {
  // const data = await getData()
  // console.log("ok here", data)

  const {name,setName} = useAppContext()

  return (
    <main className={styles.title} >
      Hello there {name}
      <button onClick={()=>setName("kevin")} >Change name</button>
    </main>
  );
}
