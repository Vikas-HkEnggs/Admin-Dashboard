"use client";
import React, { useState } from "react";
import axios from "axios";
import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for the toast


const CreatePOForm = () => {
  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [options, setOptions] = useState([]);

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
        updatedOptions[index].values = []; // Initialize values as an empty array
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

    if (!name || !productCode) {
      alert("Product Name and Code are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/admin/add-products", {
        name,
        productCode,
        options,
      });
      alert("Product and options added successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-lg bg-white shadow-lg p-6 md:p-10 max-w-3xl mx-auto"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Create PO Form for the Product
        </h2>

        <Input
          id="name"
          type="text"
          label="Product Name"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          id="productCode"
          type="text"
          label="Product Code"
          placeholder="Enter product code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          required
        />

        {/* Options Section */}
        <div className="space-y-4 mt-6">
          {options.map((option, idx) => (
            <div key={idx} className="space-y-2 p-4 border-b border-gray-200">
              {/* Select Type First */}
              <div className="flex space-x-4 items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={option.type}
                  onChange={(e) =>
                    handleOptionChange(idx, "type", e.target.value)
                  }
                  className="border rounded-md p-2 w-full"
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
                <div className="space-y-2 w-full mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    SubOptions
                  </label>
                  {option.subOptions.map((sub, subIdx) => (
                    <div key={subIdx} className="flex space-x-2 items-center">
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
                        className="border rounded-md p-2 w-full"
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
        <div className="flex space-x-4 mt-4">
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
