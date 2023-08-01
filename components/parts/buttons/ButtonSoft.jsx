const ButtonSoft = ({ handleOnClick, children }) => {
  return (
    <button
      onClick={handleOnClick}
      className="rounded-md bg-ya-red/20 px-2.5 py-1.5 text-sm font-semibold text-ya-dark-red shadow-sm hover:bg-ya-red/40"
    >
      {children}
    </button>
  );
};

export default ButtonSoft;
