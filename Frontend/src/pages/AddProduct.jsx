import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'

const AddProduct = () => {
    const [formData, setFormData] = useState({
      name: "",
      price: "",
    });

    const Token = localStorage.getItem("token")

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
        if (!(formData.name || formData.price)) {
          alert("please fill all the field");
        }

      const response = await axios.post(
        "http://localhost:4000/product/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${Token}`, 
            
          },
        }
      );
        const data = response.data;
        console.log(data, ".....");
        if (response.status === 200) {
          localStorage.setItem("token", data.token);
          alert("success");
          setFormData({ name: "", price: "" });
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
          <label htmlFor="">Price</label>
          <input
            type="text"
            placeholder="Enter Your Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
}

export default AddProduct