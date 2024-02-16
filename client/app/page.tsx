// page.tsx

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";


const getData = async()=>{
 // await new Promise((resolve)=>setTimeout(resolve,1000))
   const response = await fetch("http://localhost:8080/");
   /// throw error
   if(!response.ok )
   {
     throw new Error('Failed to fetch drinks')
   }
   const data = await response.json();
   return data
 }

export default async function Home() {
  const data = await getData()
  console.log("ok here", data)

  return (
    <main>
      Hello there
    </main>
  );
}
