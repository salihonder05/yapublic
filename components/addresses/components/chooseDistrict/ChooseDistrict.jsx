"use client";

import ButtonPrimaryIcon from "@/components/parts/buttons/ButtonPrimaryIcon";
import Logo from "@/components/parts/Logo";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ChoiceCard from "../addAddress/components/ChoiceCard";

const ChooseDistrict = ({ setOpenDistrictSelect, town, setDistrict }) => {
  const [districts, setDistricts] = useState();
  const getDistricts = async () => {
    const PROJECT_API_URL = process.env.PROJECT_API_URL;

    try {
      const response = await fetch(PROJECT_API_URL + "districtsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          townId: town,
        }),
      });
      const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
      if (response.ok) {
        setDistricts(data.data.data.districtsx);
        // console.log("data.data.data.districtx: ", data.data.data.districtsx);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  useEffect(() => {
    getDistricts();
  }, []);

  if (!(districts?.length > 0)) {
    return (
      <div>
        <div className="flex items-center justify-between w-full mb-4 sm:w-full">
          <ButtonPrimaryIcon handleOnClick={() => setOpenDistrictSelect(false)}>
            <ChevronLeftIcon
              className="-ml-0.5 h-6 w-auto inline-flex"
              aria-hidden="true"
            />{" "}
            <span className="text-ya-yellow">GERİ DÖN</span>
          </ButtonPrimaryIcon>
          <Logo />
        </div>
        <div
          className="p-2 m-2 rounded-md bg-ya-dark-white-1 hover:bg-ya-dark-white-2"
          style={{ cursor: "pointer" }}
        >
          <h1>Seçtiğiniz ilçeye ait bir semt bulunamadı</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-4 sm:w-full">
        <ButtonPrimaryIcon handleOnClick={() => setOpenDistrictSelect(false)}>
          <ChevronLeftIcon
            className="-ml-0.5 h-6 w-auto inline-flex"
            aria-hidden="true"
          />{" "}
          <span className="text-ya-yellow">GERİ DÖN</span>
        </ButtonPrimaryIcon>
        <Logo />
      </div>
      {districts?.map((district) => (
        <ChoiceCard
          setOpenSelect={setOpenDistrictSelect}
          setState={setDistrict}
          state={district}
          key={district?.id}
        />
      ))}
    </div>
  );
};

export default ChooseDistrict;
