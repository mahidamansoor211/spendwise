function Button({ children, onClick, type, className }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 w-full sm:w-auto
        bg-blue-600 text-white rounded-lg 
        hover:bg-blue-900 
        flex items-center justify-center gap-x-2 
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
