const Input = ({ id, type, label, placeholder, required, value, onChange, }) => {
  return (
    <div className="">
      <label htmlFor={id} className="block mb-2 font-medium text-dark">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        required={required}
        value={value} 
        onChange={onChange}
        
      />
    </div>
  );
};

export default Input;
