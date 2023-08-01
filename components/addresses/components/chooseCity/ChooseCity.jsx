"use client";

import ButtonPrimaryIcon from "@/components/parts/buttons/ButtonPrimaryIcon";
import Logo from "@/components/parts/Logo";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ChoiceCard from "../addAddress/components/ChoiceCard";

const ChooseCity = ({ setCity, setOpenCitySelect }) => {
  const [cities, setCities] = useState();
  const getCities = async () => {
    const PROJECT_API_URL = process.env.PROJECT_API_URL;

    try {
      const response = await fetch(PROJECT_API_URL + "cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
      if (response.ok) {
        setCities(data.data.data.cities); 
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-4 sm:w-full">
        <ButtonPrimaryIcon handleOnClick={() => setOpenCitySelect(false)}>
          <ChevronLeftIcon
            className="-ml-0.5 h-6 w-auto inline-flex"
            aria-hidden="true"
          />{" "}
          <span className="text-ya-yellow">GERİ DÖN</span>
        </ButtonPrimaryIcon>
        <Logo />
      </div>
      {cities?.map((city) => (
        <ChoiceCard
          setOpenSelect={setOpenCitySelect}
          setState={setCity}
          state={city}
          key={city?.id}
        />
      ))}
    </div>
  );
};

export default ChooseCity;
