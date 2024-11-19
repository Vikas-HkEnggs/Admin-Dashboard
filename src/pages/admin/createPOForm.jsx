"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import "react-toastify/dist/ReactToastify.css"; 
import Dropdown from "@/components/Elements/Dropdown";

const CreatePOForm = () => {
  const [product_name, setProduct_name] = useState("");
  const [product_code, setProduct_code] = useState("");
  const [options, setOptions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/admin/allProducts"
        );
        console.log(res.data.products);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product_name || !product_code) {
      alert("Product Name and Code are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/admin/createPoForm", {
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

        <Dropdown
          label="Product"
          name="product"
          options={products.map((product) => ({
            value: product._id,
            label: product.product_name, 
          }))}
          value={product_name}
          onChange={(e) => setProduct_name(e.target.value)}
        />
    

        <Dropdown
          label="Product"
          name="product"
          options={products.map((product) => ({
            value: product._id,
            label: product.product_code, 
          }))}
          value={product_code}
          onChange={(e) => setProduct_code(e.target.value)}
        />


        {/* Options Section */}
        <div className="mt-6 space-y-4">
          {options.map((option, idx) => (
            <div key={idx} className="space-y-2 border-b border-gray-200 p-4">
              {/* Select Type First */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={option.type}
                  onChange={(e) =>
                    handleOptionChange(idx, "type", e.target.value)
                  }
                  className="w-full rounded-md border p-2"
                  required
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="dropdown">Dropdown</option>
                  <option value="text">Text</option>
                  <option value="boolean">Boolean</option>
                </select>
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

              {/* Show Value input for both dropdown and boolean types */}
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

        {/* Add Option and Option with SubOption buttons */}
        <div className="mt-4 flex space-x-4">
          <Button
            type="button"
            onClick={addOptionRow}
            className="bg-gray-200 text-black hover:bg-gray-300"
          >
            Add Option
          </Button>
        </div>

        <div className="mt-6">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePOForm;
