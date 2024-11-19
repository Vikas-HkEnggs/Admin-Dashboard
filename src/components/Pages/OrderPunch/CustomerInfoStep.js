import React from "react";
import Input from "@/components/Elements/Input";

const CustomerInfoStep = ({ formData, handleChange }) => (
  <div>
    <Input
      id="customerName"
      type="text"
      label="Customer Name"
      placeholder="Enter customer name"
      required
      value={formData.customerName}
      onChange={handleChange}
    />
    <Input
      id="customerEmail"
      type="email"
      label="Customer Email"
      placeholder="customer@gmail.com"
      required
      value={formData.customerEmail}
      onChange={handleChange}
    />
  </div>
);

export default CustomerInfoStep;
