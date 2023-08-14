"use client";

import { useState } from "react";

const sides = [
  { id: null, name: "None" },
  { id: 1, name: "Baked beans" },
  { id: 2, name: "Coleslaw" },
  { id: 3, name: "French fries" },
  { id: 4, name: "Garden salad" },
  { id: 5, name: "Mashed potatoes" },
];

const PaymentTypes = () => {
  const [selectedPayment, setSelectedPayment] = useState();
  return (
    <div className="p-2 rounded-md bg-ya-dark-white-2">
      <label className="my-2 text-xs font-semibold text-start text-ya-gray">
        ÖDEME TİPİ
      </label>
      <div className="flex flex-col gap-ya-4">
        <div>
          {sides.map((side, sideIdx) => (
            <div
              key={sideIdx}
              className={`relative flex items-start py-4 mt-2 rounded-md  ${
                selectedPayment === sideIdx ? "bg-ya-green" : "bg-ya-white"
              }`}
            >
              <div className="flex-1 min-w-0 ml-3 text-sm leading-6">
                <label
                  htmlFor={`side-${side.id}`}
                  className={`font-medium  select-none ${
                    selectedPayment === sideIdx
                      ? "text-ya-white"
                      : "text-gray-900"
                  }`}
                >
                  {side.name}
                </label>
              </div>
              <div className="flex items-center h-6 mr-3">
                <input
                  onChange={() => {
                    setSelectedPayment(sideIdx);
                  }}
                  id={`side-${side.id}`}
                  name="plan"
                  type="radio"
                  defaultChecked={side.id === null}
                  class="w-4 h-4 text-ya-green bg-ya-dark-white-2 border-ya-dark-white-2 focus:ring-ya-green dark:focus:ring-ya-green focus:ring-2 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentTypes;
