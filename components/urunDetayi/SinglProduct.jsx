"use client";
import { useEffect, useState } from "react";
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { getSingleProduct } from "../data/query/query";
import Cart from "../cart/Cart";
import ButtonBlockPrimary from "../parts/buttons/ButtonBlockPrimary";
import store from "@/app/Redux/store";
import { cartActions } from "@/app/Redux/features/cart-slice";
import Notification from "../parts/Notification";
import { authActions } from "@/app/Redux/features/auth-slice";
import Link from "next/link";
import Image from "next/image";

const products = {
  name: "Everyday Ruck Snack",
  href: "#",
  price: "$220",
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
  imageAlt:
    "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  breadcrumbs: [
    { id: 1, name: "Travel", href: "#" },
    { id: 2, name: "Bags", href: "#" },
  ],
  sizes: [
    { name: "18L", description: "Perfect for a reasonable amount of snacks." },
    { name: "20L", description: "Enough room for a serious amount of snacks." },
  ],
};
const reviews = { average: 4, totalCount: 1624 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SinglProduct() {
  const selectedProductId = JSON.parse(
    localStorage.getItem("selectedProductId")
  );
  const accountId = JSON.parse(localStorage.getItem("accountId"));
  const [selectedSize, setSelectedSize] = useState(products?.sizes[0]);
  const product = useSelector(({ product }) => product.product);
  const openCart = useSelector(({ cart }) => cart.openCart);
  const openNotification = useSelector(({ auth }) => auth.openNotification);

  console.log("product: ", product);

  const addToCart = () => {
    let cartProductsList =
      JSON.parse(localStorage.getItem("cartProducts"))?.length > 0
        ? JSON.parse(localStorage.getItem("cartProducts"))
        : [];
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    const lAccountId = JSON.parse(localStorage.getItem("accountId"));
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
        adet: sameCartProduct[0]?.adet + 1,
        img: sameCartProduct[0]?.img,
        price:
          product?.product_price?.price_value * (sameCartProduct[0]?.adet + 1),
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
        });
      }
      store.dispatch(cartActions.updateState({ cartProducts: newCart }));
      localStorage.setItem("cartProducts", JSON.stringify(newCart));
    } else {
      cartProductsList?.push({
        productId: product?.id,
        accountId: lAccountId,
        productName: product?.product_name,
        adet: 1,
        img: product?.img_url,
        price: product?.product_price?.price_value,
      });
      localStorage.setItem("cartProducts", JSON.stringify(cartProductsList));
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
  useEffect(() => {
    getSingleProduct(selectedProductId, accountId);
    // console.log("singleOrders: ", product);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Products details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <span
              role="list"
              className="flex items-center space-x-2 font-semibold text-md"
            >
              {product?.product_group?.product_group_main?.main_group_name}
            </span>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product?.product_name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Ürün Bilgisi
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {product?.price}
              </p>

              <div className="pl-4 ml-4 border-l border-gray-300">
                <h2 className="sr-only">Değerlendirmeler</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">
                      {reviews.average} 5 yıldızın üzerinde
                    </p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {reviews.totalCount} Değerlendirme
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product?.description}</p>
            </div>

            <div className="flex items-center mt-6">
              <CheckIcon
                className="flex-shrink-0 w-5 h-5 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">
                {product?.product_price?.price_value}₺
              </p>
            </div>
          </section>
        </div>

        {/* Products image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="overflow-hidden rounded-lg aspect-h-1 aspect-w-1">
            <Image
              width={100}
              height={100}
              src={product?.img_url}
              alt={product?.img_url}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>

        {/* Products form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Products options
            </h2>

            <form>
              <div className="sm:flex sm:justify-between">
                {/* Size selector */}
                <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                  <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                    {/* Size */}
                  </RadioGroup.Label>
                  <div className="mt-1">
                    {product?.product_detail?.detail_text}
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2">
                    {/* {products?.sizes?.map((size) => (
                      <RadioGroup.Option
                        as="div"
                        key={size.name}
                        value={size}
                        className={({ active }) =>
                          classNames(
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label
                              as="p"
                              className="text-base font-medium text-gray-900"
                            >
                              {size.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="p"
                              className="mt-1 text-sm text-gray-500"
                            >
                              {size.description}
                            </RadioGroup.Description>
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))} */}
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-4">
                <Link
                  href="#"
                  className="inline-flex text-sm text-gray-500 group hover:text-gray-700"
                >
                  <span>What size should I buy?</span>
                  <QuestionMarkCircleIcon
                    className="flex-shrink-0 w-5 h-5 ml-2 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className="mt-10">
                <ButtonBlockPrimary handleOnClick={addToCart}>
                  Sepete Ekle
                </ButtonBlockPrimary>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="#"
                  className="inline-flex text-base font-medium group"
                >
                  <ShieldCheckIcon
                    className="flex-shrink-0 w-6 h-6 mr-2 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Yemekarena Güvencesiyle
                  </span>
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
      {openCart === true && <Cart />}
      {openNotification === true && <Notification />}
    </div>
  );
}
