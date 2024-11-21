import React from "react";
import Select from "react-select";

const ReusableSelect = ({ label, options, onChange, placeholder, value, className }) => {
  return (
    <div className={`flex flex-col  ${className}`}>
      <label className="text-black mb-2 block font-medium">{label}</label>
      <Select
        options={options}
       onChange={onChange}
        placeholder={placeholder}
        value={options.find((option) => option.value === value)}
        className="rounded-lg"
      />
    </div>
  );
};

export default ReusableSelect;
