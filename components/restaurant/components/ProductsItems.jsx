"use client";
import { authActions } from "@/app/Redux/features/auth-slice";
import { cartActions } from "@/app/Redux/features/cart-slice";
import store from "@/app/Redux/store";
import ButtonPrimary from "@/components/parts/buttons/ButtonPrimary";
import Notification from "@/components/parts/Notification";
import ProductModal from "@/components/parts/order/ProductModal/ProductModal";
import OrderSelectionsModal from "@/components/parts/orderOperations/OrderSelectionsModal";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductsItems = ({ product }) => {
  const openNotification = useSelector(({ auth }) => auth.openNotification);
  const [openProductOrder, setOpenProductOrder] = useState(false);
  const productDetailHandler = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "selectedProductId",
        JSON.stringify(product?.id)
      );
    }
    location.href = "urunDetayi";
  };

  const addToCart = () => {
    if (typeof window !== "undefined") {
      var cartProductsList =
        JSON.parse(window.localStorage.getItem("cartProducts"))?.length > 0
          ? JSON.parse(window.localStorage.getItem("cartProducts"))
          : [];
      var cartProducts = JSON.parse(
        window.localStorage.getItem("cartProducts")
      );
      var lAccountId = JSON.parse(window.localStorage.getItem("accountId"));
    }
    let newCart = [];
    const sameCartProduct = cartProducts?.filter(
      (p) => p?.productId === product?.id
    );
    const diffCartProduct = cartProducts?.filter(
      (p) => p?.productId !== product?.id
    );

    if (sameCartProduct?.length > 0) {
      newCart.push({
        productId: sameCartProduct[0]?.productId,
        accountId: sameCartProduct[0]?.accountId,
        productName: sameCartProduct[0]?.productName,
        adet: parseInt(sameCartProduct[0]?.adet) + 1,
        img: sameCartProduct[0]?.img,
        price:
          product?.product_price?.price_value * (sameCartProduct[0]?.adet + 1),
        singlePrice: product?.product_price?.price_value,
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
      if (typeof window !== "undefined") {
        window.localStorage.setItem("cartProducts", JSON.stringify(newCart));
      }
    } else {
      cartProductsList?.push({
        productId: product?.id,
        accountId: lAccountId,
        productName: product?.product_name,
        adet: 1,
        img: product?.img_url,
        price: product?.product_price?.price_value,
        singlePrice: product?.product_price?.price_value,
      });
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "cartProducts",
          JSON.stringify(cartProductsList)
        );
      }
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
  };

  // console.log("product", product);
  return (
    <div
      key={product?.id}
      className="relative p-4 border border-gray-200 sm:p-2 rounded-xl"
    >
      <div className="overflow-hidden bg-gray-200 rounded-lg aspect-h-1 aspect-w-1">
        <Image
          width={100}
          height={100}
          src={product?.img_url}
          alt={product?.product_name}
          priority
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="pt-10 pb-4 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <span>{product?.product_name.slice(0, 20)}</span>
        </h3>
        <div className="flex flex-col items-center mt-3">
          {/* <p className="sr-only">{product?.rating} out of 5 stars</p> */}
          {/* <div className="flex items-center"> */}
          {/* {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product?.rating > rating
                    ? "text-yellow-400"
                    : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {product?.reviewCount} değerlendirme
          </p> */}
          <button
            onClick={productDetailHandler}
            className="mt-1 text-sm text-ya-red hover:text-ya-dark-red"
          >
            {product?.reviewCount} ürün detayı
          </button>
        </div>
        <p className="mt-4 text-base font-medium text-gray-900">
          {product?.product_price?.price_value} ₺
        </p>
      </div>
      <div className="flex flex-col items-center mt-3">
        <ButtonPrimary handleOnClick={() => setOpenProductOrder(true)}>
          Sepete Ekle
        </ButtonPrimary>
      </div>

      {openNotification === true && <Notification />}
      {openProductOrder === true && (
        <ProductModal
          product={product}
          open={openProductOrder}
          setOpen={setOpenProductOrder}
        />
      )}
    </div>
  );
};

export default ProductsItems;
