"use client";

import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../components/lotties/list-loading";
const PROJECT_API_URL = process.env.PROJECT_API_URL;
const PaymentTypes = () => {
  const [selectedPayment, setSelectedPayment] = useState();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // Yeni durum: loading
  async function fetchAccountPayments() {
    if (typeof window !== "undefined") {
      var shopAccountId = window.localStorage.getItem(
        "active_shop_card_account"
      );
    }

    try {
      const response = await fetch(PROJECT_API_URL + "accountpayrules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: shopAccountId,
          payruleTypeId: 2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPayments(data?.data?.data?.account_payrules);
      } else {
        console.error("Error fetching customer list:", response.status);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    } finally {
      setLoading(false); // Yükleme tamamlandığında yüklemeyi durdur
    }
  }

  useEffect(() => {
    fetchAccountPayments();
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (loading) {
    return (
      <div className="p-2 rounded-md bg-ya-dark-white-1">
        <label className="my-2 text-xs font-semibold text-start text-ya-gray">
          ÖDEME TİPİ
        </label>
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    ); // Yüklenme durumu
  }

  return (
    <div className="p-2 rounded-md bg-ya-dark-white-1">
      <label className="my-2 text-xs font-semibold text-start text-ya-gray">
        ÖDEME TİPİ
      </label>
      <div className="flex flex-col gap-ya-4">
        <div>
          {payments?.map((payment, sideIdx) => (
            <div
              key={sideIdx}
              className={`relative flex items-start py-4 mt-2 rounded-md  ${
                selectedPayment === sideIdx ? "bg-ya-green" : "bg-ya-white"
              }`}
            >
              <div className="flex-1 min-w-0 ml-3 text-sm leading-6">
                <label
                  htmlFor={`side-${payment?.id}`}
                  className={`font-medium  select-none ${
                    selectedPayment === sideIdx
                      ? "text-ya-white"
                      : "text-gray-900"
                  }`}
                >
                  {payment?.orderpayrule?.payrule_name}
                </label>
              </div>
              <div className="flex items-center h-6 mr-3">
                <input
                  onChange={() => {
                    setSelectedPayment(sideIdx);
                  }}
                  id={`side-${payment?.id}`}
                  name="plan"
                  type="radio"
                  defaultChecked={payment?.id === null}
                  className="w-4 h-4 rounded-full text-ya-green bg-ya-dark-white-1 border-ya-dark-white-1 focus:ring-ya-green dark:focus:ring-ya-green focus:ring-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentTypes;
