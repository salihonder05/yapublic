"use client";

import { useEffect, useState } from "react";
import KitchensCard from "./components/KitchensCard";
const PROJECT_API_URL = process.env.PROJECT_API_URL;
const Kitchens = () => {
  const [kitchens, setKitchens] = useState();

  const getKitchens = async () => {
    try {
      const response = await fetch(PROJECT_API_URL + "kitchens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
      if (response.ok) {
        setKitchens(data.data.data.kitchens);
        // Auth();
        // dispatch(authActions.updateState({ authModalOpen: false }));
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  useEffect(() => {
    getKitchens();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-6">
          {kitchens?.map((kitchen, index) => (
            <KitchensCard kitchen={kitchen} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kitchens;
