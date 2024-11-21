const Input = ({
  id,
  type,
  label,
  placeholder,
  required,
  value,
  onChange,
  className = "w-full ", 
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-black mb-2 block font-medium">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        className={`block rounded-lg border border-gray-300 bg-gray-50  p-2.5 text-gray-900  ${className}`}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
