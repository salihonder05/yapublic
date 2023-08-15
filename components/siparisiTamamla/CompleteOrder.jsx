"use client";

import { useEffect, useState } from "react";
import CongratsModal from "../CongratsModal";
import { uploadShopCart } from "../parts/order/orderFunctions";

const CompleteOrder = ({ address, getCart, totalAmount, items }) => {
  // const [totalAmount, setTotalAmount] = useState(0);
  // const [items, setItems] = useState([]);
  const [openCongrats, setOpenCongrats] = useState(false);
  console.log("address1: ", address);
  const [addressPicker, setAddressPicker] = useState({
    addressPicker: address?.id,
    selectedAddressID: address?.id,
    addressName: address?.address_name,
    addressLocationName: address?.town?.name + ", " + address?.citiy?.name,
    modalVisible: false,
    serviceTime: address?.address_delivery_point?.point_time,
    serviceFee: address?.address_delivery_point?.point_fee,
    serviceMin: address?.address_delivery_point?.point_min_pay,
  });

  useEffect(() => {
    setTimeout(() => {
      setAddressPicker({
        addressPicker: address?.id,
        selectedAddressID: address?.id,
        addressName: address?.address_name,
        addressLocationName: address?.town?.name + ", " + address?.citiy?.name,
        modalVisible: false,
        serviceTime: address?.address_delivery_point?.point_time,
        serviceFee: address?.address_delivery_point?.point_fee,
        serviceMin: address?.address_delivery_point?.point_min_pay,
      });
    }, 2000);
  }, []);

  useEffect(() => {
    getCart();
    // return (cleanUp = () => {});
  }, []);

  const uploadeOrder = async () => {
    const deneme = await uploadShopCart(
      items,
      totalAmount,
      addressPicker,
      1,
      1
    );
    if (deneme?.success) {
      setOpenCongrats(true);
    }
  };

  return (
    <div className="flex sm:gap-y-4">
      <div className="flex flex-col items-center justify-center p-1 rounded-l-md text-ya-yellow bg-ya-soft-black basis-1/2">
        <label className="text-xs text-ya-white">TOPLAM TUTAR</label>
        <label className="text-2xl">{totalAmount.toFixed(2)} TL</label>
      </div>
      <button
        type="button"
        className="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-semibold shadow-sm text-ya-white bg-ya-green rounded-r-md basis-1/2 ring-1 ring-inset ring-ya-green hover:bg-ya-dark-green sm:col-start-1 sm:mt-0"
        onClick={uploadeOrder}
        // ref={cancelButtonRef}
      >
        DEVAM ET
      </button>
      <CongratsModal open={openCongrats} setOpen={setOpenCongrats} />
    </div>
  );
};

export default CompleteOrder;
