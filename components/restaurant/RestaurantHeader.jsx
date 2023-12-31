"use client";
import { restaurantsActions } from "@/app/Redux/features/restaurants-slice";
import store from "@/app/Redux/store";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAccountDetail } from "../data/query/query";
import Lottie from "react-lottie";
import animationData from "../../components/lotties/plate-animate";
const falseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 p-1 text-white rounded-full bg-ya-dark-red"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const trueIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 p-1 text-white rounded-full bg-ya-dark-green"
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
      clipRule="evenodd"
    />
  </svg>
);

export default function RestaurantHeader() {
  const singleAccount = useSelector(
    ({ restaurants }) => restaurants.singleAccount
  );
  const [banner, setBanner] = useState();
  const [accountDetail, setAccountDetail] = useState();

  useEffect(() => {
    setBanner(singleAccount?.brand?.brand_banner);
  }, [singleAccount?.brand?.brand_banner]);

  const fetchAccountDetail = async (accountId) => {
    const accountD = await getAccountDetail(accountId);
    await store.dispatch(
      restaurantsActions.updateState({
        singleAccount: accountD?.message,
      })
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      var accountId = window.localStorage.getItem("accountId");
    }
    fetchAccountDetail(accountId);
  }, []);
  const stats = [
    {
      name: "Paket Servis",
      status: singleAccount?.account_delivery === true ? trueIcon : falseIcon,
    },
    {
      name: "Gel Al",
      status: singleAccount?.account_takeaway === true ? trueIcon : falseIcon,
    },
    {
      name: "Restorandayım",
      status: singleAccount?.account_eatin === true ? trueIcon : falseIcon,
    },
  ];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return  (
    <div>
      <div className="mt-10 md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              {banner ? (
                <Image
                  width={1000}
                  height={1000}
                  className="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={banner}
                  alt="brand_banner"
                  priority
                />
              ) : (
                <div>
                  <Lottie options={defaultOptions} height={100} width={100} />
                </div>
              )}
              <span
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              />
            </div>
          </div>
          {/*
        Use vertical padding to simulate center alignment when both lines of text are one line,
        but preserve the same layout if the text wraps without making the image jump around.
      */}
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div>
              <div className="flex flex-col items-center mt-6 space-y-3 justify-stretch sm:flex-row sm:space-x-4 sm:space-y-0">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {singleAccount?.account_title}
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-500">
                  {singleAccount?.account_opening} {" - "}
                  <span className="text-gray-900">
                    {singleAccount?.account_closing}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href={`${
              singleAccount?.account_e_mail
                ? `mailto:${singleAccount?.account_e_mail}`
                : "/"
            }`}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-red"
          >
            <EnvelopeIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
              aria-hidden="true"
            />
            <span>Mail</span>
          </Link>
          <Link
            href={`${
              singleAccount?.account_gsm_no
                ? `tel:${singleAccount?.account_gsm_no}`
                : "/"
            }`}
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-red"
          >
            <PhoneIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-ya-dark-white-1"
              aria-hidden="true"
            />
            <span>Ara</span>
          </Link>
        </div>
      </div>
      <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
        {stats?.map((item) => (
          <div key={item.name} className="px-4 overflow-hidden bg-white ">
            <dt className="flex justify-center text-sm font-medium text-black truncate">
              {item.name}
            </dt>
            <dd className="flex justify-center mt-1 text-3xl font-semibold tracking-tight ">
              {item.status}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
//  <div className="my-5">
//       <div>
//         <Image
//           className="object-cover w-full h-32 rounded-md lg:h-48"
//           src={
//             "https://play-lh.googleusercontent.com/cCzyZXd2L0lxfZCmdP3p4j4xEjhisEsqScSZKK5QsHOBAAFtVhwox7MXZw3PX1HRXEw"
//           }
//           alt=""
//         />
//       </div>
//       <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
//         <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
//           <div className="flex">
//             <Image
//               className="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
//               src={singleAccount?.brand?.brand_banner}
//               alt=""
//             />
//           </div>
//           <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
//             <div className="flex-1 min-w-0 mt-6 sm:hidden md:block">
//               <h1 className="text-2xl font-bold text-gray-900 truncate">
//                 {singleAccount?.account_title}
//               </h1>
//             </div>
//             <div className="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-x-4 sm:space-y-0">
//               <Link
//                 href={`mailto:${singleAccount?.account_e_mail}`}
//                 type="button"
//                 className="inline-flex items-center gap-x-1.5 rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-red"
//               >
//                 <EnvelopeIcon
//                   className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
//                   aria-hidden="true"
//                 />
//                 <span>Mail</span>
//               </Link>
//               <Link
//                 href={`tel:${singleAccount?.account_gsm_no}`}
//                 type="button"
//                 className="inline-flex items-center gap-x-1.5 rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-red"
//               >
//                 <PhoneIcon
//                   className="-ml-0.5 mr-1.5 h-5 w-5 text-ya-dark-white-1"
//                   aria-hidden="true"
//                 />
//                 <span>Ara</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 hidden min-w-0 mt-6 sm:block md:hidden">
//           <h1 className="text-2xl font-bold text-gray-900 truncate">
//             {singleAccount?.account_title}
//           </h1>
//         </div>
//       </div>
//     </div>
