"use client";

import { useEffect, useState } from "react";

const CartAddressCard = () => {
  const [address, setAddress] = useState();
  async function fetchUserAddress() {
    if (typeof window !== "undefined") {
      var addressId = window.localStorage.getItem("selectedAddressId");
    }

    try {
      const response = await fetch("http://localhost:3000/api/singleAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: addressId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("datafetchUserAddress: ", data.data.data.address);
        setAddress(data.data.data.address);
      } else {
        console.error("Error fetching customer list:", response.status);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserAddress();
  }, []);
  return (
    <div className="p-2 rounded-md bg-ya-dark-white-1">
      <label className="my-2 text-xs font-semibold text-start text-ya-gray">
        SİPARİŞİN GÖNDERİM ADRESİ
      </label>
      <div className="p-2 text-center rounded-lg cursor-pointer hover:bg-ya-dark-green bg-ya-green text-ya-white">
        {address?.address_name + " / " + address?.citiy?.name + " / " + address?.district?.name}
      </div>
    </div>
  );
};

export default CartAddressCard;
