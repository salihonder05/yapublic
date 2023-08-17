"use client";
import ButtonPrimary from "@/components/parts/buttons/ButtonPrimary";
import Notification from "@/components/parts/Notification";
import ProductModal from "@/components/parts/order/ProductModal/ProductModal";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  return (
    <div
      key={product?.id}
      className="relative p-4 border border-gray-200 sm:p-2 rounded-xl"
    >
      <div className="overflow-hidden bg-gray-200 rounded-lg aspect-h-1 aspect-w-1">
        {product && (
          <Image
            width={100}
            height={100}
            src={product?.img_url || ""}
            alt={product?.product_name || ""}
            priority
            className="object-cover object-center w-full h-full"
          />
          // <Image width={100} height={100} src={product?.img_url} alt={product?.product_name} />
          // <Image
          //   width={100}
          //   height={100}
          //
          //
          //   className="object-cover object-center w-full h-full"
          // />
        )}
      </div>
      <div className="pt-10 pb-4 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <span>{product?.product_name.slice(0, 20)}</span>
        </h3>
        <div className="flex flex-col items-center mt-3">
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
