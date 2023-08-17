"use client";
import { useEffect, useState } from "react";
import { getRestaurantsProducts } from "../data/query/query";
import ProductsList from "./components/ProductsList";

export default function RestaurantProducts({ restaurantsProducts }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      var accountId = window.localStorage.getItem("accountId");
    }
    getRestaurantsProducts(accountId);
  }, []);

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 -mx-px rounded-md sm:mx-0 md:grid-cols-1 lg:grid-cols-1">
        {restaurantsProducts?.map((product) => (
          <ProductsList product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
