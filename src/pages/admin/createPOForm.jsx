"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "@/components/Elements/Dropdown";
import Select from "react-select";

const CreatePOForm = () => {
  const [product_name, setProduct_name] = useState("");
  const [product_code, setProduct_code] = useState("");
  const [options, setOptions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://backend-hlrb.onrender.com/api/v1/admin/allProducts"
        );
        // console.log(res.data.products);
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addOptionRow = () => {
    const newOption = { type: "", name: "", value: "", subOptions: [] };
    setOptions([...options, newOption]);
  };

  const removeLastOption = () => {
    const updatedOptions = [...options];
    updatedOptions.pop(); // Remove the last option
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index, key, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][key] = value;

    // Reset fields based on selected type
    if (key === "type") {
      updatedOptions[index].name = "";
      if (value === "dropdown" || value === "boolean") {
        updatedOptions[index].values = [];
        updatedOptions[index].subOptions =
          value === "boolean" ? [{ title: "", value: "", type: "" }] : [];
      } else {
        updatedOptions[index].values = null;
      }
    }

    setOptions(updatedOptions);
  };

  const handleSubOptionChange = (optionIndex, subIndex, key, value) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].subOptions[subIndex][key] = value;

    // Clear value field if suboption type is text
    if (key === "type" && value === "text") {
      updatedOptions[optionIndex].subOptions[subIndex].value = null;
    }
    setOptions(updatedOptions);
  };

  
  const handleProductChange = (selectedOption) => {
    // console.log(selectedOption,"selectedOption");
    const selectedProduct = products.find(
      (product) => product.product_id === selectedOption.value 
    );

    // console.log(selectedProduct.product_name, "selectedProduct.product_name");
    setProduct_name(selectedProduct.product_name);
  
    if (selectedProduct) {
      
      setProduct_name(selectedProduct.product_name);
      setProduct_code(selectedProduct.product_code); 
    }
  };
  
  

  const productOptions = products.map((product) => ({
    value: product.product_id,
    label: product.product_name,
  }));


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product_code, product_name);

    if (!product_name || !product_code) {
      alert("Product Name and Code are required.");
      return;
    }

    try {
      await axios.post("https://backend-hlrb.onrender.com/api/v1/admin/createPoForm", {
        product_name,
        product_code,
        options,
      });
      alert("Product and options added successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg md:p-10"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Create PO Form for the Product
        </h2>
        <div className="">
          <label className="text-black mb-2 block font-medium">
            Product Name
          </label>
          <Select
            options={productOptions}
            onChange={handleProductChange}
            placeholder="Select Product Name"
            className="rounded-lg  py-1"
          />
        </div>

        {/* Product Code Field */}
        <div className="mb-4">
          <Input
            id="product-code"
            type="text"
            label="Product Code"
            value={product_code} 
            placeholder="Product Code will appear here"
            disabled
          />
        </div>

        {/* Options Section */}
        <div className="mt-6 space-y-4">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="space-y-2 border-b border-gray-200 p-4 relative"
            >
              {/* Select Type First */}
              <div className="flex items-center space-x-4">
                <Dropdown
                  label="Type"
                  name={`option-type-${idx}`}
                  options={[
                    { value: "dropdown", label: "Dropdown" },
                    { value: "text", label: "Text" },
                    { value: "boolean", label: "Boolean" },
                  ]}
                  value={option.type}
                  onChange={(e) =>
                    handleOptionChange(idx, "type", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              {/* Render fields based on selected type */}
              <Input
                id={`option-name-${idx}`}
                type="text"
                label="Option"
                placeholder="Enter option name"
                value={option.name}
                onChange={(e) =>
                  handleOptionChange(idx, "name", e.target.value)
                }
                required
              />

              {/* Show Value input for dropdown and boolean types */}
              {(option.type === "dropdown" || option.type === "boolean") && (
                <Input
                  id={`option-values-${idx}`}
                  type="text"
                  label="Values (comma-separated)"
                  placeholder="Enter values separated by commas"
                  value={option.values?.join(", ") || ""}
                  onChange={(e) => {
                    const valuesArray = e.target.value
                      .split(",")
                      .map((val) => val.trim());
                    handleOptionChange(idx, "values", valuesArray);
                  }}
                  required
                />
              )}

              {/* SubOptions for boolean type */}
              {option.type === "boolean" && (
                <div className="mt-2 w-full space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    SubOptions
                  </label>
                  {option.subOptions.map((sub, subIdx) => (
                    <div key={subIdx} className="flex items-center space-x-2">
                      <Input
                        id={`suboption-title-${idx}-${subIdx}`}
                        type="text"
                        placeholder="SubOption Title"
                        value={sub.title}
                        onChange={(e) =>
                          handleSubOptionChange(
                            idx,
                            subIdx,
                            "title",
                            e.target.value
                          )
                        }
                        required
                      />

                      <select
                        value={sub.type}
                        onChange={(e) =>
                          handleSubOptionChange(
                            idx,
                            subIdx,
                            "type",
                            e.target.value
                          )
                        }
                        className="w-full rounded-md border p-2"
                        required
                      >
                        <option value="" disabled>
                          Select suboption type
                        </option>
                        <option value="dropdown">Dropdown</option>
                        <option value="text">Text</option>
                      </select>

                      {sub.type === "dropdown" && (
                        <Input
                          id={`suboption-value-${idx}-${subIdx}`}
                          type="text"
                          placeholder="SubOption Value"
                          value={sub.value || ""}
                          onChange={(e) =>
                            handleSubOptionChange(
                              idx,
                              subIdx,
                              "value",
                              e.target.value
                            )
                          }
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Option Button */}
        <div className="mt-4 flex space-x-4">
          <Button
            type="button"
            onClick={addOptionRow}
            className="bg-green-400 text-black hover:bg-green-500 focus:ring-4 focus:ring-[#fff]"
          >
            Add Option
          </Button>

          {/* Remove Option Button */}
          <Button
            type="button"
            className=" bg-red-400 text-black hover:bg-red-500 focus:ring-4 focus:ring-[#fff]"
            onClick={removeLastOption}
          >
            Remove Option
          </Button>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePOForm;
