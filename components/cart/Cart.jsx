"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import store from "@/app/Redux/store";
import { cartActions } from "@/app/Redux/features/cart-slice";
import { useSelector } from "react-redux";
import { getAccountDetail, getSingleProduct } from "../data/query/query";
import CartItem from "./components/CartItem";
import Link from "next/link";
import {
  deleteRowShopCart,
  getShopCart,
  getShopCartAccountInfo,
  updateBadge,
  updateRowPiece,
  uploadShopCart,
} from "../parts/order/orderFunctions";
import Image from "next/image";
import OrderCardHader from "../parts/order/components/OrderCardHader";
import CartHeader from "./components/CartHeader";

const products = [
  {
    id: 1,
    name: "Çikolata Füzyonu",
    href: "#",
    color: "Salmon",
    price: "₺120.00",
    quantity: 1,
    imageSrc:
      "https://www.kikkoman.com.tr/fileadmin/_processed_/e/f/csm_WEB_Chocolate_soy_sauce_candy_1a77f2f5e2.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Taze Deniz Ürünleri Salatası",
    href: "#",
    color: "Blue",
    price: "₺110.00",
    quantity: 1,
    imageSrc:
      "https://balikdunyasi.com.tr/wp-content/uploads/2021/06/deniz-urunleri-salatasi-2.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
if (typeof window !== "undefined") {
  var cartProductsList = JSON.parse(
    window.localStorage.getItem("cartProducts")
  );
  var shopCartL = JSON.parse(window.localStorage.getItem("shop_cart"));
  var accountId = JSON.parse(window.localStorage.getItem("accountId"));
  var active_shop_account_id = JSON.parse(
    window.localStorage.getItem("active_shop_card_account")
  );
}
export default function Cart() {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const cartProducts = useSelector(({ cart }) => cart.cartProducts);
  const cartTotalPrice = useSelector(({ cart }) => cart.cartTotalPrice);
  const shopCart = useSelector(({ cart }) => cart.shopCart);
  const addressess = useSelector(({ cart }) => cart.addressess);
  const activeCardAccount = useSelector(
    ({ restaurants }) => restaurants.activeCardAccount
  );
  const [accountDetail, setAccountDetail] = useState();
  const badge = useSelector(({ cart }) => cart.badge);
  const user = useSelector(({ auth }) => auth.user);
  let swipeRef = [];

  const [addressPicker, setAddressPicker] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [index, setIndex] = useState(0);
  const [choseeType, setChoseeType] = useState("Paket Servis");

  const closeCartHandler = () => {
    store.dispatch(cartActions.updateState({ openCart: false }));
  };

  const fetchSingleAccount = async () => {
    const accountD = await getAccountDetail(active_shop_account_id);
    setAccountDetail(accountD?.message);
  };

  useEffect(() => {
    fetchSingleAccount();
    // await getCart();
    // await getMyAddress( user?.user?.customer?.id);
    setAddresses(addressess);
  }, [active_shop_account_id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      cartProductsList = JSON.parse(
        window.localStorage.getItem("cartProducts")
      );
    }
    changeTotalPrice();
  }, [cartProducts]);

  const changeTotalPrice = () => {
    let cartTotalPrice = 0;
    if (typeof window !== "undefined") {
      var cartProductsList = JSON.parse(
        window.localStorage.getItem("shop_cart")
      );
    }
    for (let index = 0; index < cartProductsList?.length; index++) {
      const element = cartProductsList[index];
      cartTotalPrice += element?.total_price * element.piece;
    }
    store.dispatch(cartActions.updateState({ cartTotalPrice: cartTotalPrice }));
  };

  const onAddressChange1 = (value) => {
    let picker = value;
    setAddressPicker(picker);
  };

  const getCart = async () => {
    //await AsyncStorage.removeItem('shop_cart');
    //await AsyncStorage.getItem('shop_cart');
    let shop_cart = shopCart;

    await setItems(shop_cart);

    let totalAmount = 0;
    for (let i = 0; i < shop_cart.length; i++) {
      totalAmount += parseFloat(shop_cart[i].total);
    }
    setTotalAmount(parseFloat(totalAmount));
    // ShopCartStore.badge = this.state.items.length
    updateBadge();
    if (shopCart.length > 0) {
      // await getShopCartAccountInfo();
    }
  };

  const updatePiece = async (id, piece) => {
    await updateRowPiece(id, piece);
    await getCart();
  };

  const uploadCart = async () => {
    //alert(JSON.stringify(this.state.items).replace(/\"([^(\")"]+)\":/g,"$1:"));
    await uploadShopCart(items, totalAmount, addressPicker, 1, 1);
  };

  const deleteRow = async () => {
    await deleteRowShopCart(index);
    await getCart();
    // console.log("Badge : " + (await badge));
  };

  const header = () => {
    return (
      <div
      // activeOpacity={1}
      // onPress={async () => {
      //   await this.props.AccountDetailStore.getDetails(
      //     this.props.ShopCartStore.shopCardAccountID
      //   );
      //   await AsyncStorage.setItem(
      //     "current_account",
      //     this.props.ShopCartStore.shopCardAccountID.toString()
      //   );
      //   NavigationService.navigate("Detail", {
      //     item: this.props.ShopCartStore.shopCardAccount,
      //   });
      // }}
      // style={{ flexDirection: "row", backgroundColor: mainColors.fourth }}
      >
        <div style={{ flex: "1", padding: "10" }}>
          {/* {this.props.ShopCartStore.shopCardAccount.point_account &&
            this.props.ShopCartStore.shopCardAccount.point_account.brand.brand_banner?.startsWith(
              "http"
            ) && (
              <Image
                source={{
                  uri: this.props.ShopCartStore.shopCardAccount.point_account
                    .brand.brand_banner
                    ? this.props.ShopCartStore.shopCardAccount.point_account
                        .brand.brand_banner
                    : "",
                }}
                style={{
                  height: SCREEN_WIDTH / 4 - 20,
                  width: SCREEN_WIDTH / 4 - 20,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            )} */}
        </div>
        <div style={{ flex: "4", flexDirection: "row" }}>
          <div
          // style={{
          //   ...mainStyles.center_view_column,
          //   alignItems: "flex-start",
          //   flex: 8,
          // }}
          >
            <span
            // style={[mainStyles.textBold, { color: "#fff", fontSize: 16 }]}
            >
              {/* {
                this.props.ShopCartStore.shopCardAccount.point_account
                  .account_title
              }
              ,
              {
                this.props.ShopCartStore.shopCardAccount.point_account.address
                  .town.name
              } */}
            </span>
            <span
              style={[mainStyles.textNormal, { color: "#fff", fontSize: 16 }]}
            >
              {/* {`(${this.props.ShopCartStore.shopCardAccount.point_account.address.neighborhood.name})`} */}
            </span>
          </div>
          <div style={{ ...mainStyles.center_view_column, marginRight: 10 }}>
            {/* <YaIcon color={mainColors.fourth_sec} name={"ya-rigth"} size={20} /> */}
          </div>
        </div>
      </div>
    );
  };
  // const cardRow = () => {
  //   return (
  //     <li>
  //       {items?.map((item, index) => {
  //         return (
  //           <div
  //             key={"chart_key_1_" + index.toString()}
  //             ref={(row) => {
  //               this.swipeRef[index] = row;
  //             }}
  //             style={{ marginTop: 10 }}
  //             useNativeDriver={true}
  //             disableLeftSwipe={false}
  //             rightOpenValue={-75}
  //           >
  //             <View style={styles.rowBack}>
  //               <TouchableOpacity
  //                 style={[styles.backRightBtn, styles.backRightBtnRight]}
  //                 onPress={async () => {
  //                   this.swipeRef[index].closeRow();
  //                   this.setState({
  //                     index: index,
  //                   });
  //                   Alert.alert(
  //                     "Emin misiniz?",
  //                     "Sepetinizden ürün silmek üzeresiniz. Emin misiniz?",
  //                     [
  //                       {
  //                         text: "İptal",
  //                         onPress: () => console.log("Cancel Pressed"),
  //                         style: "cancel",
  //                       },
  //                       { text: "SİL", onPress: () => this.deleteRow() },
  //                     ],
  //                     { cancelable: false }
  //                   );
  //                 }}
  //               >
  //                 <Text style={[styles.headText, { color: "#fff" }]}>SİL</Text>
  //               </TouchableOpacity>
  //             </View>
  //             <View style={{ width: SCREEN_WIDTH, backgroundColor: "white" }}>
  //               <View>
  //                 <Text style={styles.headText}> {item?.product_name}</Text>
  //               </View>
  //               <View style={styles.noPaddingBottomTop}>
  //                 {item?.selected.length > 0 && (
  //                   <View>
  //                     {item.selected.map((i, index) => {
  //                       let b;
  //                       //console.log(i.menu_type,i.menu_name)
  //                       if (i.menu_type === 1) {
  //                         b = (
  //                           <View style={styles.textBordered}>
  //                             <Text style={styles.infoText}>
  //                               -{" "}
  //                               {i.selected == null
  //                                 ? " "
  //                                 : Array.isArray(i.selected)
  //                                 ? i.selected[0]?.product?.product_name + " "
  //                                 : i.selected?.product?.product_name + " "}
  //                             </Text>
  //                           </View>
  //                         );
  //                       }

  //                       if (i.menu_type === 2 && i.selected.length > 0) {
  //                         let yb = i.selected.map((s) => {
  //                           return s?.product?.product_name + " ";
  //                         });
  //                         b = (
  //                           <View style={styles.textBordered}>
  //                             <Text style={styles.infoText}>- {yb}</Text>
  //                           </View>
  //                         );
  //                       }

  //                       if (i.menu_type === 3) {
  //                         let isl = Array.isArray(i.selected)
  //                           ? i.selected[0]
  //                           : i.selected;
  //                         if (isl.id > 0) {
  //                           let xb =
  //                             i.selected == null
  //                               ? " "
  //                               : Array.isArray(i.selected)
  //                               ? i.selected[0]?.product?.product_name + " "
  //                               : i.selected?.product?.product_name + " ";
  //                           //console.log(JSON.stringify(isl.selected));
  //                           let m = isl.selected.map((ss) => {
  //                             let mm = "";
  //                             if (ss.menu_type === 1) {
  //                               mm =
  //                                 ss.selected != null
  //                                   ? ss.selected?.product?.product_name + " "
  //                                   : " ";
  //                             }
  //                             if (ss.menu_type === 2) {
  //                               mm = ss.selected.map((mms) => {
  //                                 return mms.product?.product_name + " ";
  //                               });
  //                             }
  //                             if (ss.menu_type === 4) {
  //                               mm = ss.selected.map((mms) => {
  //                                 return (
  //                                   <Text
  //                                     style={[
  //                                       styles.infoText,
  //                                       { textDecorationLine: "line-through" },
  //                                     ]}
  //                                   >
  //                                     {mms.product?.product_name + " Olmasın. "}
  //                                   </Text>
  //                                 );
  //                               });
  //                             }
  //                             return mm;
  //                           });
  //                           b = (
  //                             <View style={styles.textBordered}>
  //                               <Text style={styles.infoText}>- {xb}</Text>
  //                               <Text style={styles.infoText}>{m}</Text>
  //                             </View>
  //                           );
  //                         }
  //                       }

  //                       if (i.menu_type === 4 && i.selected.length > 0) {
  //                         let ob = i.selected.map((s) => {
  //                           return s.product?.product_name + " Olmasın.";
  //                         });
  //                         b = (
  //                           <View style={styles.textBordered}>
  //                             <Text
  //                               style={[
  //                                 styles.infoText,
  //                                 { textDecorationLine: "line-through" },
  //                               ]}
  //                             >
  //                               - {ob}
  //                             </Text>
  //                           </View>
  //                         );
  //                       }

  //                       if (i.menu_type === 5) {
  //                         b = (
  //                           <View style={styles.textBordered}>
  //                             <Text style={styles.infoText}>
  //                               -{" "}
  //                               {i.selected == null
  //                                 ? " "
  //                                 : Array.isArray(i.selected)
  //                                 ? i.selected[0]?.product?.product_name + " "
  //                                 : i.selected?.product?.product_name + " "}
  //                             </Text>
  //                           </View>
  //                         );
  //                       }

  //                       return <View key={index + "sepet"}>{b}</View>;
  //                     })}
  //                   </View>
  //                 )}

  //                 <View style={{ flex: 1, alignItems: "flex-end" }}>
  //                   <Image
  //                     style={{
  //                       width: 100,
  //                       height: 100,
  //                       resizeMode: "contain",
  //                       marginRight: 5,
  //                     }}
  //                     source={{
  //                       uri:
  //                         item?.img_url !== null &&
  //                         item.img_url.startsWith("http://cdn")
  //                           ? item.img_url
  //                           : "https://www.askyerim.net/wp-content/themes/redlineasktema/img/gorsel-yok.png",
  //                     }}
  //                   />
  //                 </View>
  //               </View>

  //               <View
  //                 style={{
  //                   backgroundColor: mainColors.second,
  //                   flexDirection: "row",
  //                   padding: 5,
  //                 }}
  //               >
  //                 <View style={{ flex: 1 }}>
  //                   <Text style={[styles.headText, { color: "#fff" }]}>
  //                     {parseFloat(item?.total).toFixed(2)} TL
  //                   </Text>
  //                 </View>
  //                 <View style={{ flexDirection: "row", flex: 1 }}>
  //                   <TouchableOpacity
  //                     onPress={async () => {
  //                       await this._updatePiece(index, "down");
  //                     }}
  //                     style={styles.countButton}
  //                   >
  //                     <YaIcon
  //                       size={15}
  //                       color={mainColors.main}
  //                       name={"ya-negative"}
  //                     />
  //                   </TouchableOpacity>
  //                   <View style={styles.countButton}>
  //                     <Text style={styles.count}>{item?.piece}</Text>
  //                   </View>
  //                   <TouchableOpacity
  //                     onPress={async () => {
  //                       await this._updatePiece(index, "up");
  //                     }}
  //                     style={styles.countButton}
  //                   >
  //                     <YaIcon
  //                       size={15}
  //                       color={mainColors.main}
  //                       name={"ya-plus"}
  //                     />
  //                   </TouchableOpacity>
  //                 </View>
  //               </View>
  //             </View>
  //           </div>
  //         );
  //       })}
  //     </List>
  //   );
  // };
  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCartHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                      <CartHeader account={accountDetail} />
                      <div>
                        <div className="flow-root">
                          <ul role="list" className="divide-y divide-gray-200 ">
                            {cartProducts?.map((product, index) => (
                              <CartItem
                                key={index}
                                product={product}
                                index={index}
                                changeTotalPrice={changeTotalPrice}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-between p-2 text-base font-medium rounded-md text-ya-yellow bg-ya-soft-black">
                        <p>Toplam Tutar</p>
                        <p>{cartTotalPrice ? cartTotalPrice.toFixed(2) : 0}₺</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        kargo ücreti ödeme sırasında dahil edilecektir
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/siparisiTamamla"
                          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-ya-green hover:bg-ya-dark-green"
                        >
                          Siparişi tamamla
                        </Link>
                      </div>
                      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                        <p>
                          ya da
                          <button
                            type="button"
                            className="ml-1 font-medium text-ya-yellow hover:text-ya-dark-yellow"
                            onClick={closeCartHandler}
                          >
                            alışverişe devam et
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
