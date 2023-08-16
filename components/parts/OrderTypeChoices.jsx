"use client";

import { useState } from "react";

const OrderTypeChoices = ({selectedType, setselectedType}) => {
  const orderTypeHandler = (value) => {
    setselectedType(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ShopType", JSON.stringify(value));
    }
  };
  return (
    <div className="flex flex-row justify-center items-center gap-x-2 text-white">
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
