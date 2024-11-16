// Dropdown.js
import React from "react";

const Dropdown = ({ label, name, options, value, onChange, className = "" }) => {
  return (
    <div className={` ${className}`}>
      <label className="mb-2 block font-medium ">
        {label}
      </label>
      <select
        name={name}
        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3  "
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
