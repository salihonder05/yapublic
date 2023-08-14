"use client";

import CartAddressCard from "@/components/siparisiTamamla/CartAddressCard";
import PaymentTypes from "@/components/siparisiTamamla/PaymentTypes";
import OrderText from "@/components/siparisiTamamla/OrderText";
import CompleteOrder from "@/components/siparisiTamamla/CompleteOrder";

const SiparisiTamamla = () => {
  return (
    <>
      {/* <div className="min-h-full">   */}
      <main>
        <div className="flex flex-col max-w-3xl py-6 mx-auto sm:px-6 lg:px-8 gap-y-4">
          <CartAddressCard />
          <PaymentTypes />
          <OrderText />
          <CompleteOrder />
        </div>
      </main>
      {/* </div> */}
    </>
  );
};

export default SiparisiTamamla;
