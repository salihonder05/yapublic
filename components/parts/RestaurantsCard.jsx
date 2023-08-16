"use client";

import Image from "next/image";
import Link from "next/link";

export default function RestaurantsCard({ restaurant }) {
  const restaurantDetail = (restaurant) => {
    // console.log("object: ", restaurant);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("accountId", restaurant?.point_account?.id);
    }
  };
  return (
    <div key={restaurant?.id}>
      <div className="relative">
        <div className="relative w-full overflow-hidden rounded-lg h-72">
          <Image
            src={restaurant?.point_account?.brand?.brand_banner}
            width={100}
            height={100}
            priority
            alt={restaurant?.point_account?.account_title}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-center text-gray-900 ">
            {restaurant?.point_account?.account_title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {restaurant?.point_account?.brand?.length}
          </p>
        </div>
        <div className="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 opacity-50 h-36 bg-gradient-to-t from-black"
          />
          <p className="relative text-lg font-semibold text-white">
            {restaurant?.point_account?.price}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          href="/restaurant"
          className="relative flex items-center justify-center px-8 py-2 text-sm font-medium text-ya-white bg-ya-gray border border-transparent rounded-md hover:bg-ya-red"
          onClick={() => restaurantDetail(restaurant)}
        >
          Restaurant&apos;a git
          {/* <span className="sr-only">
            , {restaurant?.point_account?.account_title}
          </span> */}
        </Link>
      </div>
    </div>
  );
}
