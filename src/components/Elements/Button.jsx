
const Button = ({ type = "button", onClick, className = "", children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`my-2 w-full rounded-lg bg-[#0e3758] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#0b2b47] focus:outline-none focus:ring-4 focus:ring-[#0e3758] sm:w-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
