import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'

const LoginPage = () => {
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
console.log(formData);
try {
  if(!(formData.email || formData.password)){
    alert("please fill all the field")
  }

  const response = await axios.post("http://localhost:4000/user/login",formData);
  const data = response.data
  console.log(data,".....");
  if (response.status === 200) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("Role", data.alreadyEmail.role);
    alert("success");
    setFormData({ email: "", password: "" });
  }

} catch (error) {
  console.log(error);
}
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="text" placeholder='Enter Your Password' name='password' value={formData.password} onChange={handleChange} />
      </div>
      <div>
       <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default LoginPage