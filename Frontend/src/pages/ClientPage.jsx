import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'

const ClientPage = () => {
  const [product,setProduct] = useState([])
  const Token = localStorage.getItem("token")
  const Role = localStorage.getItem("Role")
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/product/",

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          }
          
        );

        const data = response.data;
        setProduct(data.result)
        console.log(data,"datat");
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  console.log(product,"sssss");
  return (
    <>
      <div>{Role}Page</div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">Product Details</h3>
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Created By</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.map((p) => (
                <tr>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">{p.price}</td>
                  <td className="border px-4 py-2">{p.userId.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ClientPage