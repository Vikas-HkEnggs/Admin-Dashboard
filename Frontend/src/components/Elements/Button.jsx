
const Button = ({ type = "button", onClick, className = "", children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white bg-[#0e3758] hover:bg-[#0b2b47] focus:ring-4 focus:outline-none focus:ring-[#0e3758] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-2 text-center ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
