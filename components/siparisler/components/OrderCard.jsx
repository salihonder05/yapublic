"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import ButtonPrimary from "@/components/parts/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/parts/buttons/ButtonSecondary";
import ButtonSoft from "@/components/parts/buttons/ButtonSoft";
import store from "@/app/Redux/store";
import { cartActions } from "@/app/Redux/features/cart-slice";
import { authActions } from "@/app/Redux/features/auth-slice";
import Notification from "@/components/parts/Notification";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
const OrderCard = ({ order }) => {
  const formatDate = (timeStamp) => {
    var date = new Date(parseInt(timeStamp));
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    var formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  };
  const openNotification = useSelector(({ auth }) => auth.openNotification);

  const productDetailHandler = (orderDetail) => {
    window.localStorage.setItem(
      "selectedProductId",
      JSON.stringify(orderDetail?.id)
    );
    location.href = "urunDetayi";
  };

  const addToCart = () => {
    for (let index = 0; index < order?.order_json?.length; index++) {
      let cartProductsList =
        JSON.parse(window.localStorage.getItem("cartProducts"))?.length > 0
          ? JSON.parse(window.localStorage.getItem("cartProducts"))
          : [];
      const cartProducts = JSON.parse(
        window.localStorage.getItem("cartProducts")
      );
      const lAccountId = JSON.parse(window.localStorage.getItem("accountId"));
      let newCart = [];
      const orderElement = order?.order_json[index];
      const sameCartProduct = cartProducts?.filter(
        (p) => p?.productId === orderElement?.id
      );
      const diffCartProduct = cartProducts?.filter(
        (p) => p?.productId !== orderElement?.id
      );
      if (sameCartProduct?.length > 0) {
        newCart.push({
          productId: sameCartProduct[0]?.productId,
          accountId: sameCartProduct[0]?.accountId,
          productName: sameCartProduct[0]?.productName,
          adet: parseInt(sameCartProduct[0]?.adet) + 1,
          img: sameCartProduct[0]?.img,
          price: orderElement?.product_price * (sameCartProduct[0]?.adet + 1),
          singlePrice: orderElement?.product_price,
        });
        for (let index = 0; index < diffCartProduct.length; index++) {
          const element = diffCartProduct[index];
          newCart.push({
            productId: element?.productId,
            accountId: element?.accountId,
            productName: element?.productName,
            adet: element?.adet,
            img: element?.img,
            price: element?.price,
            singlePrice: element?.price,
          });
        }
        store.dispatch(cartActions.updateState({ cartProducts: newCart }));
        window.localStorage.setItem("cartProducts", JSON.stringify(newCart));
      } else {
        cartProductsList?.push({
          productId: orderElement?.id,
          accountId: lAccountId,
          productName: orderElement?.product_name,
          adet: 1,
          img: orderElement?.img_url,
          price: orderElement?.product_price,
          singlePrice: orderElement?.product_price,
        });
        window.localStorage.setItem(
          "cartProducts",
          JSON.stringify(cartProductsList)
        );
        store.dispatch(
          cartActions.updateState({ cartProducts: cartProductsList })
        );
      }
      store.dispatch(authActions.updateState({ openNotification: true }));
      setTimeout(
        () =>
          store.dispatch(authActions.updateState({ openNotification: false })),
        1000
      );
    }
  };

  return (
    <div
      key={order?.id}
      className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
    >
      <h3 className="sr-only">
        Order placed on{" "}
        <time dateTime={order?.created_at}>{order?.created_at}</time>
      </h3>

      <div className="flex items-center p-4 border-b border-gray-200 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
        <dl className="grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt className="font-medium text-gray-900">Ürün Kodu:</dt>
            <dd className="mt-1 text-gray-500">{order?.order_json[0]?.id}</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="font-medium text-gray-900">Sipariş Tarihi:</dt>
            <dd className="mt-1 text-gray-500">
              <time dateTime={order?.created_at}>
                {formatDate(order?.created_at)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Toplam Tutar:</dt>
            <dd className="mt-1 font-medium text-gray-900">
              {order?.order_json[0]?.total}
            </dd>
          </div>
        </dl>

        <Menu as="div" className="relative flex justify-end lg:hidden">
          <div className="flex items-center">
            <Menu.Button className="flex items-center p-2 -m-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Sipariş kodu {order?.id}</span>
              <EllipsisVerticalIcon className="w-6 h-6" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-bottom-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {/* <Menu.Item>
                  {({ active }) => (
                    <Link
                      onClick={productDetailHandler}
                      href={order?.href}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      ÜRÜNÜ GÖR
                    </Link>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={order?.invoiceHref}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      FATURA
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
          {/* <ButtonPrimary>Ürünü Gör</ButtonPrimary> */}
        {/* <ButtonSecondary>Siparişi Sil</ButtonSecondary> */}
        {/* </div> */}
      </div>

      {/* Products */}
      <h4 className="sr-only">Items</h4>
      <ul role="list" className="divide-y divide-gray-200">
        <li className="p-4 sm:p-6">
          {order?.order_json?.map((orderDetail) => (
            <div
              key={orderDetail?.id}
              className="flex items-center mt-2 sm:items-start"
            >
              <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg sm:h-40 sm:w-40">
                <Image
                  width={100}
                  height={100}
                  src={orderDetail?.img_url}
                  alt={orderDetail?.img_url}
                  priority
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className="flex-1 ml-6 text-xs">
                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                  <span className="text-xl">{orderDetail?.product_name}s</span>
                  <div>
                    <p className="mt-2 sm:mt-0">{orderDetail?.product_price}</p>
                    <button
                      className="mt-2 font-semibold sm:mt-0 text-ya-red hover:text-ya-dark-red"
                      onClick={() => productDetailHandler(orderDetail)}
                    >
                      Ürünü Gör
                    </button>
                  </div>
                </div>
                {orderDetail?.selected?.map((select) => (
                  <div key={select.id}>
                    <p className="hidden text-black sm:mt-2 sm:block">
                      {select?.menu_name}
                    </p>
                    {select?.selected?.map((choice) => (
                      <p
                        key={choice.id}
                        className="hidden text-gray-500 sm:mt-2 sm:block"
                      >
                        {choice?.product?.product_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-6 sm:flex sm:justify-between">
            <div className="flex items-center">
              <CheckCircleIcon
                className="w-5 h-5 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm font-medium text-black">
                Sipariş Durumu:{" "}
                <time
                  dateTime={order?.deliveredDatetime}
                  className="text-gray-500"
                >
                  {order?.status?.statu_name}
                </time>
              </p>
            </div>

            <div className="flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
              {/* <div className="flex justify-center flex-1">
                    <Link
                      href={product?.href}
                      className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                    >
                      View product
                    </Link>
                  </div> */}
              <div className="flex justify-center flex-1 pl-4">
                <ButtonSoft handleOnClick={addToCart}>
                  Tekrar satın al
                </ButtonSoft>
              </div>
            </div>
          </div>
        </li>
      </ul>
      {openNotification === true && <Notification />}
    </div>
  );
};

export default OrderCard;
