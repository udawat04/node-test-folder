import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    phone:"",
    role:"",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (
        !(
          formData.name ||
          formData.email ||
          formData.password ||
          formData.phone ||
          formData.role
        )
      ) {
        alert("please fill all the field");
      }

      const response = await axios.post(
        "http://localhost:4000/user/create",
        formData
      );
      const data = response.data;
      console.log(data, ".....");
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        alert("success");
        setFormData({ email: "", password: "",phone:"",role:"",name:""});
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="Enter Your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          type="text"
          placeholder="Enter Your Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">Phone</label>
        <input
          type="text"
          placeholder="Enter Your Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">Role</label>
        <input
          type="text"
          placeholder="Enter Your Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SignupPage;
