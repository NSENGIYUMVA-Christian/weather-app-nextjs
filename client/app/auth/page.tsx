  'use client'
  import React, { useState } from 'react';
  import axios from "axios"
  import { addUserToLocalStorage } from "@/utils/localStorage";
  import { useAppContext } from '@/context';
  import { useRouter } from 'next/navigation'
  import banner from '../../public/images/banner.svg';
  import Image from 'next/image'
  import styles from "./page.module.scss"


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
        <div className={styles.col2} >
    {hasAccountAlready ?
    <form className='loginForm' > 
      <div className={styles.col2Row1} >
      <h2 className={styles.title} >Login  </h2>
    <p>Enter your login credentials to access your account</p>
      </div>
      <div className={styles.col2Row2} >
        {/* field */}
        <div className={styles.field} >
          <label htmlFor="">username</label>
        <input type='text' name='username' value={loginData.username} placeholder='john_doe'  onChange={handleLoginDataChange}  />
        </div>
         {/* field */}
        <div className={styles.field} >
        <label htmlFor="">password</label>
        <input type='password' name='password' value={loginData.password} placeholder='johndoe@email.com' onChange={handleLoginDataChange} />
        </div>
         {/* forgot password */}
         <a className={styles.forgotPassword} >Forgot Password?</a>
   
      </div>
      <div className={styles.col2Row3} >
      <button type='submit' onClick={submitLoginData} className={styles.submitBtn} >Login</button>
    <p>Don't have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(false)} className={styles.toggleLoginBtn}  >Register</button> </span></p> 
      </div>
  </form> : 
    <form className='registerForm' >
      {/* row 1 */}
      <div className={styles.col2Row1}>
      <h2 className={styles.title}>Sign Up</h2>
      <p>Create an account</p>
      </div>
         {/* row 2 */}
      <div className={styles.col2Row2}>
      <div className={styles.field} >
      <label htmlFor="">First name</label>
      <input type='text' name='first_name' value={registerData.first_name} onChange={handleRegisterDataChange} />
      </div>
          <div className={styles.field} >
              <label htmlFor="">Last name</label>
    <input type='text' name='last_name' value={registerData.last_name} onChange={handleRegisterDataChange} />
    </div>
        <div className={styles.field} >
            <label htmlFor="">Email</label>
    <input type='email' name='email' value={registerData.email} onChange={handleRegisterDataChange} />
    </div>
        <div className={styles.field} >
            <label htmlFor="">Username</label>
    <input type='text' name='username' value={registerData.username} onChange={handleRegisterDataChange} />
    </div>
        <div className={styles.field} >
            <label htmlFor="">Password</label>
    <input type='password' name='password' value={registerData.password} onChange={handleRegisterDataChange} />
    </div>

      </div>
         {/* row 3 */}
      <div className={styles.col2Row3}>
      <button type='submit' onClick={submitRegisterData}  className={styles.submitBtn} >Sign up</button>
  <p>Have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(true)} className={styles.toggleLoginBtn} >Login</button> </span></p> 
      </div>
   


  </form>
  }
        </div>
        
        
      </section>
    );
  };

  export default AuthPage;
