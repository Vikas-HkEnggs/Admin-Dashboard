import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Elements/Button";
import Dropdown from "@/components/Elements/Dropdown"; 
import Input from "@/components/Elements/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select"; 

const PurchaseForm = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState([]);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    customerEmail: "",
    gstNumber: "",
    mobile_no: "",
    address: "",
    quantity: 1,
    product: "",
    optionsSelected: {},
    subOptions: {},
    availability: {},
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-hlrb.onrender.com/api/v1/admin/allProductsWithOptions");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get("https://backend-hlrb.onrender.com/api/v1/common/getAllSaleParty");
        setCompany(res.data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompany();
  }, []);

  const handleProductChange = (product_code) => {
    setFormData((prev) => ({ ...prev, product: product_code }));
    const product = products.find((p) => p.product_code === product_code);
    if (product) {
      const updatedOptions = product.options.map((option) => ({
        ...option,
        subOptions: option.subOptions || [],
      }));
      setOptions(updatedOptions);
    }
  };


  const handleOptionChange = (optionId, value) => {
    setFormData((prevData) => {
      const updatedOptionsSelected = {
        ...prevData.optionsSelected,
        [optionId]: value,
      };

      const updatedSubOptions = { ...prevData.subOptions };
      if (value === "Include") {
        const option = options.find((opt) => opt.id === optionId);
        option?.subOptions.forEach((subOption) => {
          if (!updatedSubOptions[subOption.id]) {
            updatedSubOptions[subOption.id] = "";
          }
        });
      }

      return {
        ...prevData,
        optionsSelected: updatedOptionsSelected,
        subOptions: updatedSubOptions,
      };
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCompanyChange = (selectedOption) => {
    // Automatically fill the other fields based on the selected company
    const selectedCompany = company.find((comp) => comp.party_name === selectedOption.label);
    if (selectedCompany) {
      setFormData((prev) => ({
        ...prev,
        companyName: selectedCompany.party_name,
        gstNumber: selectedCompany.gst_no,
        customerEmail: selectedCompany.party_email,
        mobile_no: selectedCompany.mobile_no,
        address: selectedCompany.address,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/emp/createOrder", {
        product_code: formData.product,
        companyName: formData.companyName,
        customerEmail: formData.customerEmail,
        gstNumber: formData.gstNumber,
        mobile_no: formData.mobile_no,
        address: formData.address,
        quantity: formData.quantity,
        optionsSelected: {
          ...formData.optionsSelected,
          subOptions: formData.subOptions,
        },
      });

      const { statusMessage, productAvailable } = response.data;
      setFormData((prev) => ({
        ...prev,
        availability: {
          message: statusMessage,
          available: productAvailable,
        },
      }));

      toast.success("Order Created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Failed to submit order form:", error);
      toast.error("Failed to submit the order. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const companyOptions = company.map((comp) => ({
    label: comp.party_name,
    value: comp.id,
  }));

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-black mb-6 text-center">Order Punch</h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Customer Details */}
        <div className="bg-gradient-to-r from-green-50 via-white to-green-50 border-2 border-green-400 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-6 bg-green-100 p-2 rounded-md">
            Customer Details
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="w-64">
              <label className="text-black mb-2 block font-medium">Company Name</label>
              <Select
                options={companyOptions}
                onChange={handleCompanyChange}
                placeholder="Select Company"
                className="rounded-lg  py-1"
              />
            </div>
            <Input
              id="gstNumber"
              type="text"
              label="GST Number"
              placeholder="Enter GST number"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-56"
            />
            <Input
              id="customerEmail"
              type="email"
              label="Email"
              placeholder="Enter email address"
              name="email"
              value={formData.customerEmail}
              onChange={handleChange}
              className="w-64"
            />
            <Input
              id="mobile_no"
              type="number"
              label="Mobile Number"
              placeholder="Enter Mobile number"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="w-44"
            />
            <Input
              id="address"
              type="text"
              label="Address"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-64"
            />
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-gradient-to-r from-green-50 via-white to-green-50 border-2 border-green-400 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-6 bg-green-100 p-2 rounded-md">
            Order Details
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Product Dropdown */}
            <Dropdown
              label="Select Product"
              name="productCode"
              options={products.map((product) => ({
                label: `${product.product_name} - ${product.product_code}`, 
                value: product.product_code,
              }))}
              value={formData.product}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-64"
            />

            {/* Quantity Input */}
            <Input
              id="quantity"
              type="number"
              label="Quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-24"
            />
            {/* Product Options */}
            {options.map((option) => (
              <div key={option.id} className="flex flex-col gap-2">
                {option.type === "dropdown" && (
                  <Dropdown
                    label={option.name}
                    name={`option_${option.id}`}
                    options={option.values.map((val) => ({
                      label: val,
                      value: val,
                    }))}
                    value={formData.optionsSelected[option.id] || ""}
                    onChange={(e) =>
                      handleOptionChange(option.id, e.target.value)
                    }
                    className="w-48"
                  />
                )}
                {option.type === "text" && (
                  <Input
                    id={option.id}
                    type="text"
                    label={option.name}
                    placeholder={`Enter ${option.name}`}
                    value={formData.optionsSelected[option.id] || ""}
                    onChange={(e) =>
                      handleOptionChange(option.id, e.target.value)
                    }
                    className="w-48"
                  />
                )}
                {option.type === "boolean" && (
                  <div>
                    <label className="mb-1 block font-medium">
                      {option.name}
                    </label>
                    <div className="flex items-center gap-4">
                      <label>
                        <input
                          type="radio"
                          name={`option-${option.id}`}
                          value="Include"
                          checked={
                            formData.optionsSelected[option.id] === "Include"
                          }
                          onChange={() =>
                            handleOptionChange(option.id, "Include")
                          }
                          className="mr-2"
                        />
                        Include
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`option-${option.id}`}
                          value="NotInclude"
                          checked={
                            formData.optionsSelected[option.id] === "NotInclude"
                          }
                          onChange={() =>
                            handleOptionChange(option.id, "NotInclude")
                          }
                          className="mr-2"
                        />
                        Do not include
                      </label>
                    </div>
                    {formData.optionsSelected[option.id] === "Include" &&
                      option.subOptions?.map((subOption) => (
                        <Input
                          key={subOption.id}
                          id={`suboption-${subOption.id}`}
                          type="text"
                          label={subOption.title}
                          placeholder={`Enter ${subOption.title}`}
                          value={formData.subOptions[subOption.id] || ""}
                          onChange={(e) =>
                            handleSubOptionChange(subOption.id, e.target.value)
                          }
                          className="w-48 mt-2"
                        />
                      ))}
                  </div>
                )}
              </div>
            ))}
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

export default PurchaseForm;
