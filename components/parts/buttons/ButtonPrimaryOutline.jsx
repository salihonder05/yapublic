const ButtonPrimaryOutline = ({children}) => {
    return (
    //   <button className="px-2.5 py-1.5 border-2 font-semibold text-ya-red border-ya-red text-xs rounded-sm hover:border-ya-dark-red hover:bg-ya-dark-red hover:text-white uppercase tracking-wider items-center text-center">
      <button className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-ya-red shadow-sm ring-1 ring-inset ring-ya-red hover:bg-ya-red hover:text-white">
        {children}
      </button>
    );
  };
  
  export default ButtonPrimaryOutline;
  