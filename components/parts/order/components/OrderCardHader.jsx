"use client";

import Image from "next/image";

const OrderCardHader = ({ product }) => {
  return (
    <div className="flex flex-col p-2 sm:flex-row bg-ya-dark-white-1">
      <div className="mt-6 sm:mr-4 sm:mt-0">
        <h3 className="text-sm font-medium text-gray-900">
          {product?.product_name}
        </h3>

        <div
          className="mt-3 space-y-6 text-sm text-gray-600"
          dangerouslySetInnerHTML={{
            __html: product?.product_detail?.detail_text,
          }}
        />
      </div>

      <div className="flex items-center sm:flex-col">
        <Image
          src={product?.img_url}
          width="300"
          priority 
          height="400"
          alt={`${"review.author"}.`}
          className="rounded-md"
        />

        {/* <div className="ml-4 sm:ml-0 sm:mt-4">
          <p className="text-sm font-medium text-center text-gray-900">
            {product?.product_price?.price_value} ₺
          </p> */}
        {/* <div className="flex items-center mt-2">
      {[0, 1, 2, 3, 4].map((rating) => (
        <StarIcon
          key={rating}
          className={classNames(
            1 > rating ? "text-gray-900" : "text-gray-200",
            "h-5 w-5 flex-shrink-0"
          )}
          aria-hidden="true"
        />
      ))}
    </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default OrderCardHader;
