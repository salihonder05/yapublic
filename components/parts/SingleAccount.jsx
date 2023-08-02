"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAccountDetail } from "../data/query/query";

const products = [
  {
    id: 1,
    name: "Fusion",
    category: "UI Kit",
    href: "#",
    price: "$49",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  // More products...
];

export default function SingleAccount() {
  // const [singleAccount, setAccount] = useState();
  const singleAccount = useSelector(
    ({ restaurants }) => restaurants.singleAccount
  );

  // const getAccountDetail = async () => {
  //   try {
  //     const response = await fetch("http://yapublic.vercel.app/api/singleaccount", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ accountId: 14 }),
  //     });
  //     const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
  //     if (response.ok) {
  //       setAccount(data.data.data.account);

  //       // Auth();
  //       // dispatch(authActions.updateState({ authModalOpen: false }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching customer list:", error);
  //   }
  // };

  useEffect(() => {
    getAccountDetail(14);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-1">
          <div className="relative group">
            <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-3 aspect-w-4">
              <h1>Single Account</h1>
              <Image
                width={100}
                height={100}
                priority
                src={singleAccount?.brand?.brand_banner}
                alt={singleAccount?.account_title}
                className="object-cover object-center"
              />
              <div
                className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="w-full px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white bg-opacity-75 rounded-md backdrop-blur backdrop-filter">
                  View Product
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 space-x-8 text-base font-medium text-gray-900">
              <h3>
                <Link href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {singleAccount?.account_title}
                </Link>
              </h3>
              <Link href="#">
                <span aria-hidden="true" className="absolute inset-0" />
                {singleAccount?.account_e_mail}
              </Link>
              <Link href="#">
                <span aria-hidden="true" className="absolute inset-0" />
                {singleAccount?.account_gsm_no}
              </Link>
              {/* <p>{product.price}</p> */}
            </div>
            {/* <p className="mt-1 text-sm text-gray-500">{product.category}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
