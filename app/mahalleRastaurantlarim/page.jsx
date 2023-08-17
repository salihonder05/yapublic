"use client";
import Restaurants from "@/components/mahalleRastaurantlarim/Restaurants";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import animationData from "../../components/lotties/catal-bicak-loading";
import { useEffect, useState } from "react";
import {
  getNeighborhoodRestaurants,
  getNeighbourhoods,
} from "@/components/data/query/query";

if (typeof window !== "undefined") {
  var selectedNeighbourhood = window.localStorage?.getItem(
    "selectedNeighbourhood"
  );
}

const MahalleRastaurantlarim = () => {
  const [loading, setLoading] = useState(true);
  const [noRestaurant, setNoRestaurant] = useState(true);
  const [selectedType, setSelectedType] = useState(1);
  const restaurants = useSelector(({ restaurants }) => restaurants.restaurants);
  useEffect(() => {
    // 2 saniye sonra yükleniyor durumunu kapat
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getNeighborhoodRestaurants(selectedNeighbourhood, selectedType);
    getNeighbourhoods();
  }, [selectedType]);
  useEffect(() => {
    if (restaurants.length > 0) {
      setNoRestaurant(false);
    }
  }, [restaurants]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {!loading ? (
        <Restaurants
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          restaurants={restaurants}
          defaultOptions={defaultOptions}
          noRestaurant={noRestaurant}
        />
      ) : (
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </>
  );
};

export default MahalleRastaurantlarim;
