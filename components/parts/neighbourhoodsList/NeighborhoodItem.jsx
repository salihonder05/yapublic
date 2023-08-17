"use client";
import { getNeighborhoodRestaurants } from "@/components/data/query/query";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let arr = ["bg-ya-red", "bg-ya-green", "bg-ya-yellow", "bg-ya-gray"];

const NeighborhoodItem = ({ neighbourhood, key }) => {
  const changeNeighbourhood = () => {
    if (typeof window !== "undefined") {
      var shopType = JSON.parse(window.localStorage.getItem("ChoseeType"));
      window.localStorage.setItem(
        "selectedNeighbourhood",
        JSON.stringify(neighbourhood?.id)
      );
    }
    getNeighborhoodRestaurants(neighbourhood?.id, shopType);
    // console.log("neighbourhood?.id: ", neighbourhood?.id);
  };

  return (
    <li
      key={key}
      className="flex col-span-1 rounded-md shadow-sm"
      onClick={changeNeighbourhood}
    >
      <div
        className={classNames(
          arr[Math.floor(Math.random() * arr.length)],
          // "bg-pink-600",
          "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
        )}
      >
        {neighbourhood?.name?.slice(0, 3)}
      </div>
      <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <span
            // href={"project.href"}
            className="font-medium text-gray-900 hover:text-gray-600"
          >
            {neighbourhood?.name?.split(" ")[0]}
          </span>
          <p className="text-gray-500">{neighbourhood?.name?.split(" ")[1]}</p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default NeighborhoodItem;
