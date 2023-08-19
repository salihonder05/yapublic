"use client";
import { getNeighborhoodRestaurants } from "@/components/data/query/query";
import { useSelector } from "react-redux";
import NeighborhoodItem from "./NeighborhoodItem";

export default function NeighborhoodList() {
  const neighbourhoodsx = useSelector(
    ({ restaurants }) => restaurants.neighbourhoodsx
  );

  const changeNeighbourhood = (id) => {
    if (typeof window !== "undefined") {
      var shopType = JSON.parse(window.localStorage.getItem("ChoseeType"));
      window.localStorage.setItem("selectedNeighbourhood", JSON.stringify(id));
    }
    getNeighborhoodRestaurants(id, shopType);
    // console.log("neighbourhood?.id: ", neighbourhood?.id);
  };
  return (
    <div style={{ cursor: "pointer" }}>
      <ul
        role="list"
        className="grid grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5"
      >
        {neighbourhoodsx?.map((neighbourhood) => (
          <li
            className="flex col-span-1 rounded-md shadow-sm"
            onClick={() => changeNeighbourhood(neighbourhood?.id)}
            key={neighbourhood?.id}
          >
            <NeighborhoodItem neighbourhood={neighbourhood} />
          </li>
        ))}
      </ul>
    </div>
  );
}
