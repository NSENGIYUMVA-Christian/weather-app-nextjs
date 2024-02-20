'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import { useEffect } from "react";
import { useAppContext } from "@/context";


export default function Home() {

  const {name,setName} = useAppContext()

  return (
    <main className={styles.title} >
      Hello there {name}
      <button onClick={()=>setName("kevin")} >Change name</button>
    </main>
  );
}
