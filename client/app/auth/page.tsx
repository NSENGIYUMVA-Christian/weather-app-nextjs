'use client'
import React, { useState } from 'react';
import axios from "axios"
import { addUserToLocalStorage } from "@/utils/localStorage";
import { useAppContext } from '@/context';
useAppContext

const AuthPage = () => {
    const {auth,setAuth} = useAppContext()
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
     setAuth(data);
      /// keeping response in local storage
      //localStorage.setItem('authData',JSON.stringify(resp.data));
       addUserToLocalStorage(data);
       // console.log('form data is', loginData);
        console.log("data is",data)
    } catch (error) {
        console.log("there was an error")
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
    <div>
      <h2>Form</h2>
   {hasAccountAlready ?
   <form > 
   <h2>Login </h2>
   <input type='text' name='username' value={loginData.username} onChange={handleLoginDataChange} />
   <input type='password' name='password' value={loginData.password} onChange={handleLoginDataChange} />
   <button type='submit' onClick={submitLoginData}>Login</button>
  <p>Don't have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(false)} >Register</button> </span></p> 
 </form> : 

  <form >
  <h2>Register</h2>
  <input type='text' name='first_name' value={registerData.first_name} onChange={handleRegisterDataChange} />
  <input type='text' name='last_name' value={registerData.last_name} onChange={handleRegisterDataChange} />
  <input type='email' name='email' value={registerData.email} onChange={handleRegisterDataChange} />
  <input type='text' name='username' value={registerData.username} onChange={handleRegisterDataChange} />
  <input type='password' name='password' value={registerData.password} onChange={handleRegisterDataChange} />
  <button type='submit' onClick={submitRegisterData}>Sign up</button>
 <p>Have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(true)} >Login</button> </span></p> 
</form>
}
      
    </div>
  );
};

export default AuthPage;
