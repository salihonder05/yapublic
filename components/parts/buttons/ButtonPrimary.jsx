"use client"
const ButtonPrimary = ({ children, handleOnClick, className }) => {
  return (
    // <button className="px-2.5 py-1.5 border border-ya-red hover:border-ya-dark-red font-semibold text-white bg-ya-red text-xs rounded-sm hover:bg-ya-dark-red uppercase tracking-wider items-center text-center">
    <button
      onClick={handleOnClick}
      className={
        `${className} ` +
        `rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ya-red`
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
