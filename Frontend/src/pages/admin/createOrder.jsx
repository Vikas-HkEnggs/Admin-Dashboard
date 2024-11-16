import Button from "@/components/Elements/Button";
import Dropdown from "@/components/Elements/Dropdown";
import Input from "@/components/Elements/Input";
import React, { useState } from "react";

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    gstNumber: "",
    address: "",
    productName: "",
    productCode: "",
    productOption1: "",
    productOption2: "",
    productOption3: "",
  });

  const productOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">Order Punch</h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Customer Details */}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            <Input
              id="companyName"
              type="text"
              label="Company Name"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-72"
            />
               <Input
              id="gstNumber"
              type="text"
              label="GST Number"
              placeholder="Enter GST number"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-56"
            />
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-72"
            />
           <Input
              id="phone"
              type="text"
              label="Phone Number"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-44"
            />
            <Input
              id="address"
              type="text"
              label="Address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
               className="w-72"
            />
       
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            <Input
              id="productName"
              type="text"
              label="Product Name"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              className="w-72"
            />
            <Input
              id="productCode"
              type="text"
              label="Product Code"
              placeholder="Product code"
              value={formData.productCode}
              onChange={handleChange}
              className="w-32"
            />
            <Input
              id="productCode"
              type="text"
              label="Quantity"
              placeholder="Quantity"
              value={formData.productCode}
              onChange={handleChange}
              className="w-24"
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-8 ">
            <Dropdown
              label="Product Option 1"
              name="productOption1"
              options={productOptions}
              value={formData.productOption1}
              onChange={handleChange}
              className="w-72"
            />
            <Dropdown
              label="Product Option 2"
              name="productOption2"
              options={productOptions}
              value={formData.productOption2}
              onChange={handleChange}
              className="w-72"
            />
            <Dropdown
              label="Product Option 3"
              name="productOption3"
              options={productOptions}
              value={formData.productOption3}
              onChange={handleChange}
              className="w-72"
            />
            <Dropdown
              label="Product Option 4"
              name="productOption3"
              options={productOptions}
              value={formData.productOption3}
              onChange={handleChange}
              className="w-72"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit">Submit Order</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
