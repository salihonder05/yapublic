"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "@/components/cart/Cart";
import { getUserOrders } from "@/components/data/query/query";
import OrderCard from "./components/OrderCard";

const orderss = [
  {
    number: "WU88191111",
    href: "#",
    invoiceHref: "#",
    createdDate: "Jul 6, 2021",
    createdDatetime: "2021-07-06",
    deliveredDate: "July 12, 2021",
    deliveredDatetime: "2021-07-12",
    total: "₺120.00",
    products: [
      {
        id: 1,
        name: "Çikolata Füzyonu",
        description:
          "Leziz çikolata füzyonu, zengin ve kremsi çikolata tabanına farklı lezzetlerin harmanlandığı bir üründür. Tatlı ve hafif ekşi meyveler, çıtır fındık parçaları veya aromatik baharatlar ile birleşerek çikolatanın eşsiz tadını ve keyfini yaşatır. Bu lezzetli füzyon, tatlı tutkunları için mükemmel bir tercihtir.",
        href: "#",
        price: "₺60.00",
        imageSrc:
          "https://www.kikkoman.com.tr/fileadmin/_processed_/e/f/csm_WEB_Chocolate_soy_sauce_candy_1a77f2f5e2.jpg",
        imageAlt:
          "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
      },
      // More products...
    ],
  },
  {
    number: "WU88191111",
    href: "#",
    invoiceHref: "#",
    createdDate: "Jul 6, 2021",
    createdDatetime: "2021-07-06",
    deliveredDate: "July 12, 2021",
    deliveredDatetime: "2021-07-12",
    total: "₺110.00",
    products: [
      {
        id: 1,
        name: "Taze Deniz Ürünleri Salatası",
        description:
          "Taze deniz ürünleri salatası, birbirinden lezzetli deniz ürünlerinin taze sebzelerle bir araya geldiği sağlıklı bir atıştırmalıktır. Çıtır karidesler, marine edilmiş kalamar dilimleri, taze somon dilimleri ve taze sebzelerin özenle harmanlandığı bu salata, zengin besin değerleriyle besleyici ve doyurucu bir seçenektir.",
        href: "#",
        price: "₺55.00",
        imageSrc:
          "https://balikdunyasi.com.tr/wp-content/uploads/2021/06/deniz-urunleri-salatasi-2.jpg",
        imageAlt:
          "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
      },
      // More products...
    ],
  },
  {
    number: "WU88191111",
    href: "#",
    invoiceHref: "#",
    createdDate: "Jul 6, 2021",
    createdDatetime: "2021-07-06",
    deliveredDate: "July 12, 2021",
    deliveredDatetime: "2021-07-12",
    total: "₺47.00",
    products: [
      {
        id: 1,
        name: "Organik Yeşil Smoothie",
        description:
          "Organik yeşil smoothie, sağlıklı yaşamı destekleyen taze ve doğal içeriklerle hazırlanan bir içecektir. Ispanak, marul, avokado, yeşil elma ve limon gibi vitamin ve mineral açısından zengin yeşil sebzelerin harmanlandığı bu smoothie, enerji verici ve sindirimi kolay bir içecektir. İçeriğindeki doğal lifler, vücudu temizlerken sağlıklı bir bağırsak fonksiyonu sağlar.",
        href: "#",
        price: "₺47.00",
        imageSrc:
          "https://abspace.yves-rocher.com/tr/wp-content/uploads/sites/17/2017/10/1801_smoothie_Image1_750x552.jpg",
        imageAlt:
          "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
      },
      // More products...
    ],
  },
  // More orders...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllActiveOrders() {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const user = useSelector(({ auth }) => auth.user);
  const activeOrders = useSelector(({ orders }) => orders.activeOrders);

  useEffect(() => {
    if (user?.user?.customer?.id) {
      getUserOrders(user?.user?.customer?.id);
    }
  }, [user]); 

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="max-w-2xl px-4 mx-auto lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Aktif Siparişlerim
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Tüm aktif siparişleriniz burada listelenmektedir
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {activeOrders?.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {openCart === true && <Cart />}
    </div>
  );
}
