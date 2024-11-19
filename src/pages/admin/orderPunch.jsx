import React, { useState, useEffect } from "react";
import axios from "axios";
import StepNavigator from "@/components/Pages/OrderPunch/StepNavigator";
import CustomerInfoStep from "@/components/Pages/OrderPunch/CustomerInfoStep";
import FormFooter from "@/components/Pages/OrderPunch/FormFooter";
import ProductSelectionStep from "@/components/Pages/OrderPunch/ProductSelectionStep";
import ReviewStep from "@/components/Pages/OrderPunch/ReviewStep";
import Button from "@/components/Elements/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


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
      const product = products.find((p) => p.productCode === productCode);
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
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/emp/createOrder",
        {
          product_code: formData.product,
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
      console.log(statusMessage, productAvailable);
  
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
  
      setCurrentStep(4); // Move to Availability Step
    } catch (error) {
      console.error("Failed to submit order form:", error);
      toast.error("Failed to submit the order. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  const handleCreateIndent = () => {
    // Logic for creating an indent
    alert("Creating an indent for unavailable product...");
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFormData({
      customerName: "",
      customerEmail: "",
      quantity: 1,
      product: "",
      optionsSelected: {},
      subOptions: {},
      availability: {},
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
       <ToastContainer />
      <div className="container mx-auto p-4">
        <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow-lg md:p-10">
          <h1 className="mb-8 text-center text-3xl font-bold">Order Punch</h1>
          <StepNavigator
            currentStep={currentStep}
            steps={[
              "Customer Info",
              "Product Selection",
              "Review",
              "Availability",
            ]}
          />
          <form onSubmit={currentStep === 3 ? handleSubmit : undefined}>
            {currentStep === 1 && (
              <CustomerInfoStep
                formData={formData}
                handleChange={handleChange}
              />
            )}
            {currentStep === 2 && (
              <ProductSelectionStep
                products={products}
                formData={formData}
                options={options}
                handleProductChange={handleProductChange}
                handleChange={handleChange}
                handleOptionChange={handleOptionChange}
                handleSubOptionChange={handleSubOptionChange}
              />
            )}
            {currentStep === 3 && (
              <>
                <ReviewStep
                  formData={formData}
                  products={products}
                  options={options}
                />
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-4 "
                >
                  Submit
                </Button>
              </>
            )}
            {currentStep === 4 && (
              <div>
                <h2 className="mb-4 text-lg font-bold">Availability</h2>
                
                {formData.availability.message ? (
                  <p>{formData.availability.message}</p>
                ) : (
                  <p>Loading availability status...</p>
                )}
                {formData.availability.available !== undefined && (
                  <>
                    <p>
                      <strong>Availability Status:</strong>{" "}
                      {formData.availability.available
                        ? "Available"
                        : "Not Available"}
                    </p>
                    {!formData.availability.available && (
                      <button
                        onClick={handleCreateIndent}
                        className="mt-4 rounded  bg-red-500 px-4 py-2"
                      >
                        Create Indent
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={handleRestart}
                  className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
                >
                  Restart Process
                </button>
              </div>
            )}

            {currentStep !== 4 && currentStep !== 3 && (
              <FormFooter
                currentStep={currentStep}
                nextStep={nextStep}
                prevStep={prevStep}
                validateStep={validateStep}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
