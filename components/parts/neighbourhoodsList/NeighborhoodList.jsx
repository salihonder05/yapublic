"use client";
import { getNeighbourhoods } from "@/components/data/query/query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NeighborhoodItem from "./NeighborhoodItem";

export default function NeighborhoodList() {
  const neighbourhoodsx = useSelector(
    ({ restaurants }) => restaurants.neighbourhoodsx
  );
  return (
    <div style={{ cursor: "pointer" }}>
      <ul
        role="list"
        className="grid grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5"
      >
        {neighbourhoodsx?.map((neighbourhood) => (
          <NeighborhoodItem
            neighbourhood={neighbourhood}
            key={neighbourhood.id}
          />
        ))}
      </ul>
    </div>
  );
}
