import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Elements/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReusableSelect from "@/components/Elements/ReusableSelect";

const PurchaseForm = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState([]);
  const [options, setOptions] = useState([]);
  const [responseModal, setResponseModal] = useState({
    visible: false,
    data: null,
  });
  const [formData, setFormData] = useState({
    companyName: "",
    customerEmail: "",
    gstNumber: "",
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
        const res = await axios.get(
          "https://backend-hlrb.onrender.com/api/v1/admin/allProductsWithOptions"
        );
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
        const res = await axios.get(
          "https://backend-hlrb.onrender.com/api/v1/common/getAllSaleParty"
        );
        setCompany(res.data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompany();
  }, []);

  const handleProductChange = (selectedOption) => {
    const product_code = selectedOption?.value; 
    setFormData((prev) => ({ ...prev, product: product_code }));

    // Find product details and set options
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

  const handleSubOptionChange = (subOptionId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      subOptions: {
        ...prevData.subOptions,
        [subOptionId]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCompanyChange = (selectedOption) => {
    const selectedCompany = company.find(
      (comp) => comp.party_name === selectedOption.label
    );
    if (selectedCompany) {
      setFormData((prev) => ({
        ...prev,
        companyName: selectedCompany.party_name,
        gstNumber: selectedCompany.gst_no || "",
        customerEmail: selectedCompany.party_email || "",
        address: selectedCompany.address || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create ordered optionsSelected array
      const orderedOptions = options.map((option) => ({
        name: option.name,
        value: formData.optionsSelected[option.id] || null,
        subOptions: option.subOptions
          ? option.subOptions.map((subOption) => ({
              name: subOption.title,
              value: formData.subOptions[subOption.id] || null,
            }))
          : null,
      }));

      // Submit the ordered data to the backend
      const response = await axios.post(
        "https://backend-hlrb.onrender.com/api/v1/emp/createOrder",
        {
          product_code: formData.product,
          companyName: formData.companyName,
          customerEmail: formData.customerEmail,
          gstNumber: formData.gstNumber,
          address: formData.address,
          quantity: formData.quantity,
          optionsSelected: orderedOptions,
        }
      );

      setResponseModal({ visible: true, data: response.data });

      // Show success toast notification
      toast.success("Order Created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      console.log("Order response:", response.data);
    } catch (error) {
      // Show error toast notification
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

  const productOptions = products.map((product) => ({
    label: `${product.product_name} - ${product.product_code}`,
    value: product.product_code,
  }));

  const closeModal = () => {
    setResponseModal({ visible: false, data: null });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        Order Punch
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Customer Details */}
        <div className="bg-gradient-to-r from-green-50 via-white to-green-50 border-2 border-green-400 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-6 bg-green-100 p-2 rounded-md">
            Customer Details
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="w-64">
              <ReusableSelect
                label="Company Name"
                options={companyOptions}
                onChange={handleCompanyChange}
                value={formData.companyName}
                placeholder="Select Company"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="text-black mb-2 block font-medium">
                GST Number
              </label>
              <input
                id="gstNumber"
                type="text"
                label="GST Number"
                placeholder="Enter GST number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-56 h-10 block  border rounded-lg p-1 px-2.5 text-gray-900"
              />
            </div>

            <div className="flex flex-col justify-start items-start">
              <label className="text-black mb-2 block font-medium">Email</label>
              <input
                id="customerEmail"
                type="email"
                label="Email"
                placeholder="Enter email address"
                name="email"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-64 h-10 block  border rounded-lg p-1 px-2.5 text-gray-900"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="text-black mb-2 block font-medium">
                Address
              </label>
              <input
                id="address"
                type="text"
                label="Address"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-80 h-10 block  border rounded-lg p-1 px-2.5 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-gradient-to-r from-green-50 via-white to-green-50 border-2 border-green-400 p-6 pb-16 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-6 bg-green-100 p-2 rounded-md ">
            Order Details
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Product Dropdown */}
            <ReusableSelect
              label="Product"
              options={productOptions}
              onChange={handleProductChange}
              value={formData.product}
              placeholder="Select Product"
              className="w-72"
            />

            {/* Quantity Input */}
            <div className="flex flex-col justify-start items-start">
              <label className="text-black mb-2 block font-medium">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                label="Quantity"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-24 h-10 block  border rounded-lg p-1 px-2.5 text-center   text-gray-900"
              />
            </div>
            {/* Product Options */}
            {options.map((option) => (
              <div key={option.id} className="flex flex-col">
                {option.type === "dropdown" && (
                  <ReusableSelect
                    label={option.name}
                    name={`option_${option.id}`}
                    placeholder={option.name}
                    options={option.values.map((val) => ({
                      label: val,
                      value: val,
                    }))}
                    value={formData.optionsSelected[option.id] || ""}
                    onChange={(selectedOption) =>
                      handleOptionChange(option.id, selectedOption?.value || "")
                    }
                    className="w-48 "
                  />
                )}
                {option.type === "text" && (
                  <div className="flex flex-col justify-start items-start">
                    <label className="text-black mb-2 block font-medium">
                      Thickness
                    </label>
                    <input
                      id={option.id}
                      type="text"
                      label={option.name}
                      placeholder={`Enter ${option.name}`}
                      value={formData.optionsSelected[option.id] || ""}
                      onChange={(e) =>
                        handleOptionChange(option.id, e.target.value)
                      }
                      className="w-48 h-10 block  border rounded-lg p-1 px-2.5 text-gray-900"
                    />
                  </div>
                )}
                {option.type === "boolean" && (
                  <div className="relative mt-4">
                    <label className="block font-medium mb-1">
                      {option.name}
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2">
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
                        />
                        Include
                      </label>
                      <label className="flex items-center gap-2">
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
                        />
                        Do not include
                      </label>
                    </div>

                    {/* Inline Sub-Options Card with Close Button */}
                    {formData.optionsSelected[option.id] === "Include" && (
                      <div className="absolute top-12   left-0   p-4 w-32 h-14 z-10 transition-all duration-300 ease-in-out">
                        <div className="flex justify-between items-center  mb-2">
                          {option.subOptions?.map((subOption) => (
                            <input
                              key={subOption.id}
                              id={`suboption-${subOption.id}`}
                              type="text"
                              className="w-32 mb-2 text-sm p-2 block border-gray-500 bg-white text-black"
                              // label={subOption.title}
                              placeholder={`Enter ${subOption.title}`}
                              value={formData.subOptions[subOption.id] || ""}
                              onChange={(e) =>
                                handleSubOptionChange(
                                  subOption.id,
                                  e.target.value
                                )
                              }
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                optionsSelected: {
                                  ...prev.optionsSelected,
                                  [option.id]: "NotInclude",
                                },
                              }))
                            }
                            className="text-red-400 hover:text-red-500 ml-2 text-center text-2xl mt-[-11px]"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    )}
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
       {/* Modal */}
       {responseModal.visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Order Response</h2>
            <p className="mb-4">{responseModal.data?.statusMessage?.message}</p>
            <div className="flex justify-end space-x-4">
              {responseModal.data?.statusMessage?.available ? (
                <Button onClick={() => alert("Proceeding to delivery")}>
                  Go for Deliver
                </Button>
              ) : (
                <Button
                  onClick={() => alert("Creating indent for the order")}
                  className="bg-red-500"
                >
                  Create Indent
                </Button>
              )}
              <Button onClick={closeModal} className="bg-gray-500">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseForm;
