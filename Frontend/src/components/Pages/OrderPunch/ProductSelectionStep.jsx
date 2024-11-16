import React from "react";
import Dropdown from "@/components/Elements/Dropdown";
import Input from "@/components/Elements/Input";

const ProductSelectionStep = ({
  products,
  formData,
  options,
  handleProductChange,
  handleChange,
  handleOptionChange,
  handleSubOptionChange,
}) => (
  <div>
    <Dropdown
      label="Product"
      name="product"
      options={products.map((product) => ({
        value: product.productCode,
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
        <label className="block mb-2 text-base font-medium text-gray-900">
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
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
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
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
              />
            )}
            {/* Boolean type */}
            {option.type === "boolean" && (
              <div>
                <label className="block font-medium text-dark mb-1">
                  {option.name}
                </label>
                <div className="flex items-center">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name={`option-${option.id}`}
                      value="Include"
                      checked={
                        formData.optionsSelected[option.id] === "Include"
                      }
                      onChange={() => handleOptionChange(option.id, "Include")}
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
                      label={subOption.name}
                      placeholder={`Enter ${subOption.name}`}
                      required
                      value={formData.subOptions[subOption.id] || ""}
                      onChange={(e) =>
                        handleSubOptionChange(subOption.id, e.target.value)
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
);

export default ProductSelectionStep;
