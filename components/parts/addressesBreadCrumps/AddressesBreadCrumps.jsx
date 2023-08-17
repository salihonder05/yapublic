"use client";
import { getNeighborhoodRestaurants } from "@/components/data/query/query";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import CitiesSelectMenu from "./components/Cities";
import DistrictSelectMenu from "./components/District";
import NeighborhoodSelectMenu from "./components/Neighborhood";
import TownsSelectMenu from "./components/Towns";

const AddressesBreadCrumps = ({ mainSelectedType }) => {
  const [city, setCity] = useState();
  const [town, setTown] = useState();
  const [district, setDistrict] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [selectedType, setselectedType] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var localStorageShopType = JSON.parse(
        window.localStorage.getItem("ChoseeType")
      );
      setselectedType(localStorageShopType);
    }
  }, []);
  useEffect(() => {
    setCity();
    setTown();
    setDistrict();
    setNeighborhood();
  }, [mainSelectedType]);
  useEffect(() => {
    if (neighborhood?.id && selectedType) {
      getNeighborhoodRestaurants(neighborhood?.id, selectedType);
    }
  }, [neighborhood?.id, selectedType]);

  const selectTownHandler = (event) => {
    // setTownId(event?.id);
    // setCities(event);
    // console.log("neighborhood?.id: " ,neighborhood);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "selectedNeighbourhood",
        JSON.stringify(neighborhood?.id)
      );
    }
    getNeighborhoodRestaurants(neighborhood?.id, selectedType);
  };

  return (
    <div className="flex items-center py-4 ml-10 rounded-md md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
      <div className="relative">
        <CitiesSelectMenu setCity={setCity} city={city} />
      </div>
      {city?.id > 0 && (
        <div className="relative flex items-center ml-1 item-flex">
          <ChevronRightIcon
            className="w-5 h-5 mt-2 text-gray-400"
            aria-hidden="true"
          />
          <TownsSelectMenu setTown={setTown} town={town} cityId={city?.id} />
        </div>
      )}
      {town?.id > 0 && (
        <div className="relative flex items-center ml-2 item-flex">
          <ChevronRightIcon
            className="w-5 h-5 mt-2 text-gray-400"
            aria-hidden="true"
          />
          <DistrictSelectMenu
            setDistrict={setDistrict}
            district={district}
            townId={town?.id}
          />
        </div>
      )}
      {district?.id > 0 && (
        <div className="relative flex items-center ml-2 item-flex">
          <ChevronRightIcon
            className="w-5 h-5 mt-2 text-gray-400"
            aria-hidden="true"
          />
          <NeighborhoodSelectMenu
            setNeighborhood={setNeighborhood}
            neighborhood={neighborhood}
            districtId={district?.id}
          />
          <ButtonPrimary
            handleOnClick={selectTownHandler}
            className="px-5 py-2 mx-5 mt-2"
          >
            RESTAURANTLAR
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default AddressesBreadCrumps;
