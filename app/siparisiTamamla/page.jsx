"use client";

import CartAddressCard from "@/components/siparisiTamamla/CartAddressCard";
import PaymentTypes from "@/components/siparisiTamamla/PaymentTypes";
import OrderText from "@/components/siparisiTamamla/OrderText";
import CompleteOrder from "@/components/siparisiTamamla/CompleteOrder";
import { useEffect, useState } from "react";
import CongratsModal from "@/components/Modal/CongratsModal";
import { useSelector } from "react-redux";
import Cart from "@/components/cart/Cart";
import store from "../Redux/store";
import { cartActions } from "../Redux/features/cart-slice";

import Lottie from "react-lottie";
import animationData from "../../components/lotties/cartpage-loading";
const SiparisiTamamla = () => {
  const [address, setAddress] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState([]);
  const openCart = useSelector(({ cart }) => cart.openCart);
  const [loading, setLoading] = useState(true);

  const getCart = async (address) => {
    if (typeof window !== "undefined") {
      var shop_cart = await JSON.parse(
        window.localStorage.getItem("shop_cart")
      );
    }
    setItems(shop_cart);

    let totalAmount = 0;
    for (let i = 0; i < shop_cart.length; i++) {
      totalAmount += parseFloat(shop_cart[i].total);
    }
    setTotalAmount(parseFloat(totalAmount));
  };

  useEffect(() => {
    //sayfa açıldığında sepet pop-up'ını kapatıyoruz
    store.dispatch(cartActions.updateState({ openCart: false }));
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
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
        await setAddress(data.data.data.address);
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
    getCart();
  }, []);
  return (
    <div>
      {/* <div className="min-h-full">   */}
      {loading ? (
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <main>
          <div className="flex flex-col max-w-3xl py-6 mx-auto sm:px-6 lg:px-8 gap-y-4">
            <CartAddressCard address={address} />
            <PaymentTypes />
            <OrderText />
            <CompleteOrder
              address={address}
              totalAmount={totalAmount}
              items={items}
              getCart={getCart}
            />
          </div>
        </main>
      )}
      {/* </div> */}
      {openCart === true && <Cart />}
    </div>
  );
};

export default SiparisiTamamla;
