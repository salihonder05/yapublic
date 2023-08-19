"use client";

import Image from "next/image";

const CartHeader = ({ account }) => {
  return (
    <div className="flex flex-col justify-between p-2 rounded-md sm:flex-row bg-ya-soft-black">
      <div className="flex items-center justify-start sm:flex-col">
        <Image
          src={account?.brand?.brand_banner}
          width="300"
          priority
          height="400"
          alt={`${"review.author"}.`}
          className="w-full !h-24 rounded-md"
        />
      </div>
      <div className="flex items-center mt-6 sm:mr-4 sm:mt-0 ">
        <h3 className="text-sm font-medium text-ya-white ">
          {account?.account_title}
        </h3>
      </div>
    </div>
  );
};

export default CartHeader;
