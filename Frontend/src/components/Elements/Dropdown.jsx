// Dropdown.js
import React from 'react';

const Dropdown = ({ label, name, options, value, onChange, className = "" }) => {
  return (
    <div className={` ${className}`}>
      <label className="block mb-2 font-medium text-dark ">
        {label}
      </label>
      <select
        name={name}
        className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-dark  "
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
