"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "@/components/cart/Cart";
import { getUserOrders } from "@/components/data/query/query";
import OrderCard from "./components/OrderCard";
import Lottie from "react-lottie";
import animationData from "../../components/lotties/productlist-loading";
 
export default function AllOrders() {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const user = useSelector(({ auth }) => auth.user);
  const orders = useSelector(({ orders }) => orders.orders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.user?.customer?.id) {
      getUserOrders(user?.user?.customer?.id);
    }
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      setLoading(false);
    }
  }, [orders]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="max-w-2xl px-4 mx-auto lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Geçmiş Siparişlerim
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Tüm geçmiş siparişleriniz burada listelenmektedir
            </p>
          </div>
        </div>

        {!loading ? (
          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>
            <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
              <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {orders?.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="-mt-32">
            <Lottie options={defaultOptions} height={1000} width={1000} />
          </div>
        )}
      </div>
      {openCart === true && <Cart />}
    </div>
  );
}
