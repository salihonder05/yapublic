"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const ProductCountAndPrice = ({
  productCount,
  product,
  productState,
  setProductCount,
  setProductState,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between p-2 mt-5 rounded-md sm:mt-4 sm:flex bg-ya-yellow">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() =>
              productCount > 1 ? setProductCount(productCount - 1) : 1
            }
            className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-white rounded-md shadow-sm hover:bg-ya-red/20 sm:w-auto"
          >
            <MinusIcon className="w-5 h-5 text-ya-red" />
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            {productCount}
          </button>
          <button
            type="button"
            onClick={() => setProductCount(productCount + 1)}
            className="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm hover:bg-ya-green/20 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            <PlusIcon className="w-5 h-5 text-ya-red" />
          </button>
        </div>
        <div>
          <span className="text-ya-white">{pExtPrice + prPriceWCount} ₺</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCountAndPrice;
