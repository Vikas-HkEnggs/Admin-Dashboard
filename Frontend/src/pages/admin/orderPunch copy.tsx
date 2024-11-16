import Button from "@/components/Elements/Button";
import Dropdown from "@/components/Elements/Dropdown";
import Input from "@/components/Elements/Input";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchaseForm = () => {
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
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
          "http://localhost:8080/api/v1/admin/products"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = async (productCode) => {
    setFormData((prev) => ({ ...prev, product: productCode }));
    try {
      const product = products.find((p) => p.productCode === productCode); // Match using productCode
      if (product) {
        const res = await axios.get(
          `http://localhost:8080/api/v1/emp/products/${product.id}/options`
        );

        const updatedOptions = res.data.map((option) => {
          const productOption = product.options.find(
            (opt) => opt.id === option.id
          );
          return {
            ...option,
            subOptions: productOption?.subOptions || [],
          };
        });

        setOptions(updatedOptions);
      }
    } catch (error) {
      console.error("Error fetching product options:", error);
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

  const validateStep = () => {
    const { customerName, customerEmail, quantity, product } = formData;
    return (
      (currentStep === 1 && customerName && customerEmail && quantity > 0) ||
      (currentStep === 2 && product) ||
      currentStep > 2
    );
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/emp/createOrder",
        {
          product_code: formData.product, // productCode is directly stored in formData.product
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          quantity: formData.quantity,
          optionsSelected: {
            ...formData.optionsSelected,
            subOptions: formData.subOptions,
          },
        }
      );

      const { statusMessage, productAvailable } = response.data;

      setFormData((prev) => ({
        ...prev,
        availability: {
          message: statusMessage,
          available: productAvailable,
        },
      }));
      nextStep();
    } catch (error) {
      console.error("Failed to submit order form:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg md:p-10">
          <h1 className="mb-8 text-center text-3xl font-bold">Order Punch</h1>

          <div className="mb-8">
            <div className="mb-2 flex justify-between">
              {[
                "Customer Info",
                "Product Selection",
                "Review",
                "Availability",
              ].map((step, index) => (
                <span
                  key={index}
                  className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${
                    currentStep >= index + 1
                      ? "bg-green-200 text-green-600"
                      : "opacity-50"
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-green-200 text-xs">
              <div
                className="flex flex-col justify-center whitespace-nowrap bg-green-500 text-center text-white shadow-none transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
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
            )}

            {currentStep === 2 && (
              <div>
                <Dropdown
                  label="Product"
                  name="product"
                  options={products.map((product) => ({
                    value: product.productCode, // Use productCode instead of id
                    label: `${product.name} - ${product.productCode}`,
                  }))}
                  value={formData.product}
                  onChange={(e) => handleProductChange(e.target.value)}
                />

                <Input
                  id="quantity"
                  type="number"
                  label="Quantity"
                  placeholder="Enter quantity"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                />

                {options.length > 0 && (
                  <div className="mt-4 max-h-72 overflow-y-auto">
                    <label className="mb-2 block text-base font-medium text-gray-900">
                      Product Details
                    </label>
                    {options.map((option) => (
                      <div key={option.id} className="mb-4">
                        {option.type === "dropdown" && (
                          <Dropdown
                            label={option.name}
                            name={option.name}
                            options={option.values.map((val) => ({
                              label: val,
                              value: val,
                            }))}
                            value={formData.optionsSelected[option.id] || ""}
                            onChange={(e) =>
                              handleOptionChange(option.id, e.target.value)
                            }
                          />
                        )}
                        {option.type === "text" && (
                          <Input
                            id={option.id}
                            type="text"
                            required
                            label={option.name}
                            placeholder={`Enter ${option.name}`}
                            value={formData.optionsSelected[option.id] || ""}
                            onChange={(e) =>
                              handleOptionChange(option.id, e.target.value)
                            }
                          />
                        )}
                        {option.type === "boolean" && (
                          <div>
                            <label className="mb-1 block font-medium">
                              {option.name}
                            </label>
                            <div className="flex items-center">
                              <label className="mr-4">
                                <input
                                  type="radio"
                                  name={`option-${option.id}`}
                                  value="Include"
                                  checked={
                                    formData.optionsSelected[option.id] ===
                                    "Include"
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
                                    formData.optionsSelected[option.id] ===
                                    "NotInclude"
                                  }
                                  onChange={() =>
                                    handleOptionChange(option.id, "NotInclude")
                                  }
                                  className="mr-2"
                                />
                                Do not include
                              </label>
                            </div>

                            {formData.optionsSelected[option.id] ===
                              "Include" &&
                              option.subOptions &&
                              option.subOptions.map((subOption) => (
                                <Input
                                  key={subOption.id}
                                  id={`suboption-${subOption.id}`}
                                  type="text"
                                  label={subOption.name}
                                  placeholder={`Enter ${subOption.name}`}
                                  required
                                  value={
                                    formData.subOptions[subOption.id] || ""
                                  }
                                  onChange={(e) =>
                                    handleSubOptionChange(
                                      subOption.id,
                                      e.target.value
                                    )
                                  }
                                />
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="mb-4 text-lg font-bold">Review Your Details</h2>
                <ul>
                  <li>
                    <strong>Customer Name:</strong> {formData.customerName}
                  </li>
                  <li>
                    <strong>Customer Email:</strong> {formData.customerEmail}
                  </li>
                  <li>
                    <strong>Product:</strong>{" "}
                    {products.find(
                      (p) => p.id === parseInt(formData.product, 10)
                    )?.name || "N/A"}
                  </li>
                  <li>
                    <strong>Quantity:</strong> {formData.quantity}
                  </li>
                  <li>
                    <strong>Options Selected:</strong>
                    <ul>
                      {Object.entries(formData.optionsSelected).map(
                        ([optionId, value]) => {
                          const option = options.find(
                            (opt) => opt.id === parseInt(optionId, 10)
                          );
                          return (
                            <li key={optionId}>
                              {option?.name || "Unknown Option"}: {value}
                              {value === "Include" &&
                                option?.subOptions?.length > 0 && (
                                  <ul>
                                    {option.subOptions.map((subOption) => (
                                      <li key={subOption.id}>
                                        {subOption.name}:{" "}
                                        {formData.subOptions[subOption.id]}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="mb-4 text-lg font-bold">Availability</h2>
                <p>{formData.availability.message}</p>
                {!formData.availability.available && (
                  <Button
                    type="button"
                    onClick={() =>
                      alert("An indent will be created for this product.")
                    }
                  >
                    Create Indent
                  </Button>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {currentStep > 1 && (
                <Button type="button" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {currentStep < 4 && (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep()}
                >
                  Next
                </Button>
              )}
              {currentStep === 4 && (
                <Button type="submit" disabled={!validateStep()}>
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
