"use client";

import ButtonPrimaryIcon from "@/components/parts/buttons/ButtonPrimaryIcon";
import Logo from "@/components/parts/Logo";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ChoiceCard from "../addAddress/components/ChoiceCard";

const ChooseTown = ({ city, setTown, setOpenTownSelect }) => {
  const [towns, setTowns] = useState();

  const getTowns = async () => {
    const PROJECT_API_URL = process.env.PROJECT_API_URL;

    try {
      const response = await fetch(PROJECT_API_URL + "townsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cityId: city,
        }),
      });
      const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
      if (response.ok) {
        setTowns(data.data.data.townsx);
        // console.log("data.data.data.cities: ", data.data.data.townsx);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  useEffect(() => {
    getTowns();
  }, []);

  if (!(towns?.length > 0)) {
    return (
      <div>
        <div className="flex items-center justify-between w-full mb-4 sm:w-full">
          <ButtonPrimaryIcon handleOnClick={() => setOpenTownSelect(false)}>
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
          <h1>Seçtiğiniz Şehre ait bir ilçe bulunamadı</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-4 sm:w-full">
        <ButtonPrimaryIcon handleOnClick={() => setOpenTownSelect(false)}>
          <ChevronLeftIcon
            className="-ml-0.5 h-6 w-auto inline-flex"
            aria-hidden="true"
          />{" "}
          <span className="text-ya-yellow">GERİ DÖN</span>
        </ButtonPrimaryIcon>
        <Logo />
      </div>
      {towns?.map((town) => (
        <ChoiceCard
          setOpenSelect={setOpenTownSelect}
          setState={setTown}
          state={town}
          key={town?.id}
        />
      ))}
    </div>
  );
};

export default ChooseTown;
