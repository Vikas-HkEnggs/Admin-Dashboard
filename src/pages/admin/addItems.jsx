"use client";
import React, { useState } from "react";
import axios from "axios";
import Input from "@/components/Elements/Input";
import Button from "@/components/Elements/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const AddItems = () => {
  const [itemType, setItemType] = useState("product"); 
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const apiUrl =
        itemType === "product"
          ? "https://backend-hlrb.onrender.com/api/v1/emp/addProducts"
          : "https://backend-hlrb.onrender.com/api/v1/emp/addParts";
  
      const payload =
        itemType === "product"
          ? { product_name: name, product_code: code }
          : { part_name: name, part_code: code };
  
      const response = await axios.post(apiUrl, payload);
      console.log("API response:", response.data);
  
      const itemName = response.data[itemType]?.name || name;
      setMessage(`Successfully created ${itemType}: ${itemName}`);
      setName("");
      setCode("");
  
      // Show success toast
      toast.success(`Successfully created ${itemType}: ${itemName}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("API error:", error);
      setMessage(`Failed to create ${itemType}.`);
  
      // Show error toast
      toast.error(`Failed to create ${itemType}. Please try again.`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div className="flex justify-center">
       <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl space-y-6 rounded-lg bg-white p-6 shadow-lg md:p-10"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Add {itemType === "product" ? "Product" : "Part"}
        </h2>

        {message && <p className="text-center text-sm">{message}</p>}

        {/* Item type navigation */}
        <div className="mb-4 flex justify-center space-x-4">
          <Button
            type="button"
            onClick={() => setItemType("product")}
            className={`${
              itemType === "product"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Product
          </Button>
          <Button
            type="button"
            onClick={() => setItemType("part")}
            className={`${
              itemType === "part"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Part
          </Button>
        </div>

        {/* Form fields */}
        <Input
          id="name"
          type="text"
          label={`${itemType === "product" ? "Product" : "Part"} Name`}
          placeholder={`Enter ${itemType} name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          id="code"
          type="text"
          label={`${itemType === "product" ? "Product" : "Part"} Code`}
          placeholder={`Enter ${itemType} code`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <Button type="submit">
          Add {itemType === "product" ? "Product" : "Part"}
        </Button>
      </form>
    </div>
  );
};

export default AddItems;
