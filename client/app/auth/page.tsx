'use client'
import React, { useState } from 'react';
import axios from "axios"

const AuthPage = () => {
    /// user data
  const [formData, setFormData] = useState<any>({
    username: '',
    password: ''
  });
  /// is user has an account
  const [hasAccountAlready,setHasAccountAlready] = useState<boolean>(false)

///// handle form change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  /// submit form data
  const submitFormData = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    try {
        const {data} = await axios.post("http://localhost:8080/api/v1/auth/login",formData)
       // console.log('form data is', formData);
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
   <h2>Login</h2>
   <input type='text' name='username' value={formData.username} onChange={handleChange} />
   <input type='password' name='password' value={formData.password} onChange={handleChange} />
   <button type='submit' onClick={submitFormData}>Submit</button>
  <p>Don't have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(false)} >Register</button> </span></p> 
 </form> : 
  <form >
  <h2>Register</h2>
  <input type='text' name='username' value={formData.username} onChange={handleChange} />
  <input type='password' name='password' value={formData.password} onChange={handleChange} />
  <button type='submit' onClick={submitFormData}>Submit</button>
 <p>Have an account? <span> <button type='button' onClick={()=>setHasAccountAlready(true)} >Login</button> </span></p> 
</form>
}
      
    </div>
  );
};

export default AuthPage;
