const OrderTypeChoices = ({ selectedType, setSelectedType }) => {
  const orderTypeHandler = (value) => {
    setSelectedType(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ChoseeType", JSON.stringify(value));
    }
  };
  return (
    <div className="flex flex-row items-center justify-center text-white gap-x-2">
      <div
        className={`${
          selectedType === 1
            ? "bg-ya-red hover:bg-ya-dark-red"
            : "bg-ya-gray hover:bg-ya-dark-gray"
        } w-full p-2 flex justify-center rounded-md cursor-pointer `}
        onClick={() => orderTypeHandler(1)}
      >
        PAKET SERVİS
      </div>
      <div
        className={`${
          selectedType === 2
            ? "bg-ya-red hover:bg-ya-dark-red"
            : "bg-ya-gray hover:bg-ya-dark-gray"
        } w-full p-2 flex justify-center rounded-md cursor-pointer `}
        onClick={() => orderTypeHandler(2)}
      >
        GELİP ALACAĞIM
      </div>
    </div>
  );
};

export default OrderTypeChoices;
