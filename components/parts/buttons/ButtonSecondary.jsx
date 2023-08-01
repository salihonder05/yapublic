"use client";
const ButtonSecondary = ({ children, handleOnClick, className }) => {
  return (
    //   <button className="px-2.5 py-1.5 border border-ya-yellow hover:border-ya-dark-yellow font-semibold text-black bg-ya-yellow text-xs rounded-sm hover:bg-ya-dark-yellow uppercase tracking-wider items-center text-center">
    <button
      onClick={handleOnClick}
      className={`${className} rounded-md bg-ya-yellow px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ya-yellow`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
