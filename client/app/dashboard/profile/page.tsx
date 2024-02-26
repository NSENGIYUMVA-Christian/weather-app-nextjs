'use client'
import React, { useEffect } from 'react'
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';
import styles from "./page.module.scss"
import Image from 'next/image'
import leftArrowIcon from "../../../public/images/leftArrow.svg"

import { Sofia_Sans } from "next/font/google";
import Link from 'next/link';
const sofiaSansMedium = Sofia_Sans({ weight: "500", subsets: ["latin"] });
const sofiaSansRegular = Sofia_Sans({ weight: "400", subsets: ["latin"] });


const page = () => {
  return (
    <section className={`${styles.main}  `} >
{/* row 1 */}
<div className={styles.row1}>
 
<Link href="/" className={`${sofiaProMedium.className} ${styles.backBtn} `} >  <span className={styles.leftArrowIcon}><Image src={leftArrowIcon} alt='back'  /></span>  <span>Back to search</span></Link>
</div>
{/* row 2 */}
<div className={styles.row2}>
  {/* col1 */}
  <div className={styles.rowCol1}>Col1</div>
  {/* col2 */}
  <div  className={styles.rowCol2}>Col2</div>
</div>
    </section>
  )
}

export default page