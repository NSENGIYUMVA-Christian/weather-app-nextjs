  'use client'
  import React, { useState } from 'react';
  import axios from "axios"
  import { addUserToLocalStorage } from "@/utils/localStorage";
  import { useAppContext } from '@/context';
  import { useRouter } from 'next/navigation'
  import banner from '../../public/images/banner.svg';
  import Image from 'next/image'
  import styles from "./page.module.scss"
import { sofiaProBold,sofiaProMedium,sofiaProRegular,bicycletteRegular } from '@/fonts/fonts';





  const AuthPage = () => {
   
    const {auth,setAuth} = useAppContext()
    const router = useRouter()
  
    console.log("auth test",auth)

      /// login data
    const [loginData, setLoginData] = useState<any>({
      username: '',
      password: ''
    });
      /// login data
    const [registerData, setRegisterData] = useState<any>({
      username: '',
      password: '',
      first_name:'',
      last_name:'',
      email:''
    });
    /// is user has an account
    const [hasAccountAlready,setHasAccountAlready] = useState<boolean>(false)

  ///// handle login form change
    const handleLoginDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };
  ///// handle register form change
    const handleRegisterDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRegisterData({ ...registerData, [event.target.name]: event.target.value });
    };

    /// submit login form data
    const submitLoginData = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      try {
          const {data} = await axios.post("http://localhost:8080/api/v1/auth/login",loginData)
              // set temp auth
       setAuth(data.user);
        /// keeping response in local storage
        addUserToLocalStorage(data.user);
        /// go to dashboard
        router.push('/dashboard')
          //console.log("data is",data)
      } catch (error) {
          console.log("there was an error",error)
      }
    };
    const submitRegisterData = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      try {
          const {data} = await axios.post("http://localhost:8080/api/v1/auth/register",registerData)
        // console.log('form data is', loginData);
          console.log("data is",data)
      } catch (error) {
          console.log("there was an error")
      }
    };

    return (
      <section className={styles.mainContainer} >
        {/* col 1 */}
        <div>
        <Image
      src={banner}
      alt="weather banner"
    />
        </div>
        {/* col-2 */}
        <div className={`${styles.col2}`} >
    {hasAccountAlready ?
    <form className='loginForm' > 
    {/* row 1 */}
      <div className={styles.col2Row1} >
      <h3 className={` ${styles.title} ${bicycletteRegular.className}`} >Login </h3>
    <p className={` ${sofiaProRegular.className}`}  >Enter your login credentials to access your account</p>
      </div>
      {/* row 2 */}
      <div className={styles.col2Row2} >
        {/* field */}
        <div className={styles.field} >
          <label htmlFor="username" className={`${sofiaProRegular.className}`}  >username</label>
        <input id='username' className={sofiaProMedium.className}  type='text' name='username' value={loginData.username} placeholder='john_doe'  onChange={handleLoginDataChange}  />
        </div>
         {/* field */}
        <div className={styles.field} >
        <label htmlFor="password" className={` ${sofiaProRegular.className}`}  >password</label>
        <input id='password' className={sofiaProMedium.className} type='password' name='password' value={loginData.password} placeholder='*******' onChange={handleLoginDataChange} />
        </div>
         {/* forgot password */}
         <a className={`${styles.forgotPassword} ${sofiaProMedium.className} `} >Forgot Password?</a>
   
      </div>
      {/* row 3 */}
      <div className={styles.col2Row3} >
      <button type='submit' onClick={submitLoginData} className={`${styles.submitBtn} ${sofiaProMedium.className}` } >Login</button>
    <p className={`${sofiaProMedium.className} ${styles.toogleFormPara}` } >Don't have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(false)} className={`${styles.toggleLoginBtn}  `}  >Register</button> </span></p> 
      </div>
  </form> : 

    <form className='registerForm' >
      {/* row 1 */}
      <div className={styles.col2Row1}>
      <h3 className={` ${styles.title} ${bicycletteRegular.className}`}>Sign Up</h3>
      <p className={` ${sofiaProRegular.className}`} >Create an account</p>
      </div>
         {/* row 2 */}
      <div className={styles.col2Row2}>
      <div className={styles.field} >
      <label htmlFor="First" className={`${sofiaProRegular.className}`}  >First name</label>
      <input id='First' type='text' name='first_name' value={registerData.first_name}  placeholder='john'  onChange={handleRegisterDataChange} />
      </div>
          <div className={styles.field} >
              <label htmlFor="Last" className={`${sofiaProRegular.className}`} >Last name</label>
    <input id='Last' className={sofiaProMedium.className} type='text' name='last_name' value={registerData.last_name} placeholder='doe'  onChange={handleRegisterDataChange} />
    </div>
        <div className={styles.field} >
            <label htmlFor="Email" className={`${sofiaProRegular.className}`} >Email</label>
    <input id='Email' className={sofiaProMedium.className} type='email' name='email' value={registerData.email} placeholder='john@email'  onChange={handleRegisterDataChange} />
    </div>
        <div className={styles.field} >
            <label htmlFor="Username" className={`${sofiaProRegular.className}`} >Username</label>
    <input id='Username' className={sofiaProMedium.className} type='text' name='username' value={registerData.username} placeholder='john_doe'  onChange={handleRegisterDataChange} />
    </div>
        <div className={styles.field} >
            <label htmlFor="Password" className={`${sofiaProRegular.className}`} >Password</label>
    <input id='Password' className={sofiaProMedium.className} type='password' name='password' value={registerData.password} placeholder='*****'  onChange={handleRegisterDataChange} />
    </div>

      </div>
         {/* row 3 */}
      <div className={styles.col2Row3}>
      <button type='submit' onClick={submitRegisterData}  className={`${styles.submitBtn} ${sofiaProMedium.className}` }  >Sign up</button>
  <p className={`${sofiaProMedium.className} ${styles.toogleFormPara}` } >Have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(true)} className={styles.toggleLoginBtn} >Login</button> </span></p> 
      </div>
   


  </form>
  }
        </div>
        
        
      </section>
    );
  };

  export default AuthPage;
