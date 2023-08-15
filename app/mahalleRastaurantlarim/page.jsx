"use client";
import Cart from "@/components/cart/Cart";
import Restaurants from "@/components/mahalleRastaurantlarim/Restaurants";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import animationData from "../../components/lotties/catal-bicak-loading";
import { useEffect, useState } from "react";
const MahalleRastaurantlarim = () => {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2 saniye sonra yükleniyor durumunu kapat
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {!loading ? (
        <Restaurants />
      ) : (
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </>
  );
};

export default MahalleRastaurantlarim;
