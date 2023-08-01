const ButtonBlockPrimary = ({ children, type, handleOnClick, className }) => {
  return (
    <button
      type={type ? type : "button"}
      className={`${className} inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-ya-red hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-red sm:col-start-2`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default ButtonBlockPrimary;
