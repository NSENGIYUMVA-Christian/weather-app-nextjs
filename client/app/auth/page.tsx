'use client'
import React, { useState } from 'react';
import axios from "axios"

const AuthPage = () => {
  const [formData, setFormData] = useState<any>({
    username: '',
    password: ''
  });

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
      <form >
        <input type='text' name='username' value={formData.username} onChange={handleChange} />
        <input type='password' name='password' value={formData.password} onChange={handleChange} />
        <button type='submit' onClick={submitFormData}>Submit</button>
      </form>
    </div>
  );
};

export default AuthPage;
