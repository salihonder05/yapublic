"use client";

import { useEffect, useState } from "react";
import CongratsModal from "../CongratsModal";

const CartAddressCard = ({ address }) => {
  return (
    <div className="p-2 rounded-md bg-ya-dark-white-1">
      <label className="my-2 text-xs font-semibold text-start text-ya-gray">
        SİPARİŞİN GÖNDERİM ADRESİ
      </label>
      <div className="p-2 text-center rounded-lg cursor-pointer hover:bg-ya-dark-green bg-ya-green text-ya-white">
        {address?.address_name +
          " / " +
          address?.citiy?.name +
          " / " +
          address?.district?.name}
      </div>
    </div>
  );
};

export default CartAddressCard;
