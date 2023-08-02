"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { orderSelectionActions } from "@/app/Redux/features/orderSelection-slice";
import store from "@/app/Redux/store";
import ButtonBlockPrimary from "../../buttons/ButtonBlockPrimary";
import OrderCardHader from "../components/OrderCardHader";
import CustomPicker from "../components/CustomPicker";
import {
  getProductMenus,
  getSingleProduct,
} from "@/components/data/query/query";
import { useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MinusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ProductCountAndPrice from "../components/ProductCountAndPrice";
import CheckBoxButton from "../components/CheckBoxButton";
import ProductType3Modal from "../ProductType3Modal/ProductType3Modal";
import CheckBoxLineButton from "../components/CheckBoxLineButton";
import Image from "next/image";
import CloseHeader from "../components/CloseHeader";
import { addRowShopCart, updateBadge } from "../orderFunctions";

export default function ProductModal({ open, setOpen, product }) {
  const [productCount, setProductCount] = useState(1);
  const [piece, setPiece] = useState(1);
  const [picker, setPicker] = useState([]);
  const [productStatesMenus, setProductStatesMenus] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [openType3Modal, setOpenType3Modal] = useState(false);
  const [checkBox, setCheckBox] = useState([]);
  const [menu_in_menu, setMenu_in_menu] = useState([]);
  const [last_products, setLast_products] = useState([]);
  const [type3ModalStates, setType3ModalStates] = useState();
  const shopCart = useSelector(({ cart }) => cart.shopCart);
  const [productState, setProductState] = useState({
    id: 0,
    product_name: "",
    product_number: 0,
    product_type: { id: 1, type_name: "Tekil Ürün" },
    product_is_menu: false,
    img_url: null,
    detail: "",
    product_price: 0,
    total_price: product?.product_price?.price_value,
    product_menus: [],
    selected: [],
  });

  const getProductStateValues = async () => {
    // this.item = this.props.navigation.getParam('item');
    // this.item = this.props.navigation.getParam('item');
    let pr = productState;
    pr.product_menus = product?.product_menu;
    let selected = [];
    for (let i = 0; i < pr?.product_menus?.length; i++) {
      let item = pr.product_menus[i];
      let selected_content = item?.menu_type === 1 ? null : [];
      let new_item = {
        id: item?.id,
        menu_type: item?.menu_type,
        menu_name: item?.menu_name,
        selected: selected_content,
      };
      selected?.push(new_item);
    }

    pr.id = product?.id;
    pr.selected = selected;
    pr.product_name = product?.product_name;
    pr.img_url = product?.img_url;
    pr.product_type = product?.product_type
      ? product?.product_type
      : { id: 1, type_name: "Tekil Ürün" };
    pr.product_number = product?.product_number;
    pr.product_is_menu = product?.product_is_menu;
    pr.product_price = product?.product_price
      ? product?.product_price?.price_value
      : 0; //?.toFixed(2);
    pr.total_price = product?.product_price
      ? product?.product_price?.price_value
      : 0; //?.toFixed(2);
    product?.product_detail != null
      ? (pr.detail = product?.product_detail?.detail_text)
      : " ";

    setProductState(pr);
  };

  // totalPrice fonksiyonunu çağıralım
  useEffect(() => {
    totalPrice();
  }, [productState, productCount]);
  useEffect(() => {
    // getProductMenus ile productStatesMenus verilerini çek ve güncelle
    getProductMenus(product?.id, setProductStatesMenus);
  }, []);

  useEffect(() => {
    // orderedProduct'ı Redux store'a göndererek güncelle
    store.dispatch(
      orderSelectionActions.updateState({ orderedProduct: product })
    );
  }, [product]);

  useEffect(() => {
    setPicker(picker);
  }, [picker]);

  useEffect(() => {
    // Her iki bağımlılık da değiştiğinde getProductStateValues'i çalıştır
    getProductStateValues();
  }, [product, productStatesMenus]);
  const totalPrice = () => {
    // Menu_type 1 ve 3 Select box seçimi, menu_type 2 radio
    // menu_type 1 ve 3 de selected.item_price diye kontrol edilecek
    // menu_type 2 de selected' i döngüye sokup her item price ı toplayıp alacağız.
    let prod = productState;
    let total_price = 0.0;

    prod?.selected?.map((item, index) => {
      if (
        item.menu_type === 1 ||
        item.menu_type === 3 ||
        item.menu_type === 5
      ) {
        if (item.selected)
          if (item.selected.item_price)
            total_price += parseFloat(item.selected.item_price);
      } else {
        item.selected.map((item2, index2) => {
          if (item2.item_price) total_price += parseFloat(item2.item_price);
        });
      }
    });
    total_price += parseFloat(prod.product_price);
    prod.total_price = total_price * piece; //.toFixed(2);

    setProductState(prod);
  };
  const onValueChange1 = async (index, value) => {
    let product = productState;
    for (
      let i = 0;
      i < product.product_menus[index].product_items.length;
      i++
    ) {
      if (product.product_menus[index].product_items[i].product.id === value) {
        product.selected[index].selected =
          product.product_menus[index].product_items[i];
      }
    }
    let pickerState = picker;
    pickerState[index] = product.selected[index].selected.product.id;
    setPicker(pickerState);
    setProductState(product);
    // this.setState({
    //   picker,
    //   productState,
    // });
    await totalPrice();
  };

  const updatePiece = async (way) => {
    let pieceS = piece;
    if (way === "up") {
      pieceS++;
    } else if (way === "down") {
      if (pieceS > 1) {
        pieceS--;
      }
    }
    await setPiece(pieceS);
    totalPrice();
  };

  const onValueChange2 = async (i, index) => {
    let dt = checkBox;
    dt[i.id + "-" + i.product.id] = !dt[i.id + "-" + i.product.id];
    let product = productState;
    let is_set = -1;
    let val = i.product.id;
    productState.selected[index].selected.map((item, ind) => {
      if (item.product.id === val) {
        is_set = ind;
        return ind;
      }
    });

    is_set > -1
      ? product.selected[index].selected.splice(is_set, 1)
      : product.selected[index].selected.push(i);
    //is_set > -1 ?  product.total_price= (parseFloat(product.total_price) - parseFloat(i.item_price)).toFixed(2) : product.total_price= (parseFloat(product.total_price) + parseFloat(i.item_price)).toFixed(2);
    setProductState(product);

    setCheckBox(dt);
    await totalPrice();
  };

  const onValueChange3 = async (index, value, price = 0, type = 3) => {
    try {
      const productx = await getSingleProduct(
        value,
        JSON.parse(window.localStorage.getItem("accountId"))
        // Burada cartProducts parametresini de ekleyebilirsiniz, gerekirse.
      );

      let productS = productState;

      // Artık "getSingleProduct" fonksiyonu tamamlandı ve productx güncel verileri içeriyor.
      for (
        let i = 0;
        i < productS?.product_menus[index]?.product_items?.length;
        i++
      ) {
        if (
          productS?.product_menus[index]?.product_items[i]?.product?.id ===
          value
        ) {
          productS.selected[index].selected =
            productS?.product_menus[index]?.product_items[i];
        }
      }

      let pick = picker;
      pick[index] = productS?.selected[index].selected.product.id;
      setPicker(pick);
      setProductState(productS);
      setOpenType3Modal(true);
      setType3ModalStates({
        p_type_3: productx,
        price,
        type,
        onGoBack: (item, type) => setLastProduct(index, item, type),
      });
    } catch (error) {
      console.error("Error in onValueChange3:", error);
    }
  };

  const setLastProduct = async (i, item, type = 3) => {
    let lp = last_products;
    lp[i] = item;
    let prod = productState;
    prod.selected[i].product_price = item.item_price;
    prod.selected[i].item_price = item.total_price;
    prod.selected[i].product.product_type = item.product_type;
    if (type == 3) {
      prod.selected[i].selected.selected = item.selected;
    } else if (type == 5) {
      prod.selected[i] = {
        id: item.id,
        item_price: item.total_price,
        product_price: item.item_price,
        product: {
          id: item.selected[0].product.id,
          product_name: item.selected[0].product.product_name,
          product_number: item.selected[0].product.product_number,
          product_type: item.selected[0].product.product_type,
        },
      };
    }

    setLast_products(lp);
    setProductState(prod);
    totalPrice();
  };
  // menu type = 5 ama tek ürün
  const setLastProduct2 = async (i, item, id) => {
    let selected_item = {};
    for (let i = 0; i < item.length; i++) {
      if (item[i].product.id == id) {
        selected_item = item[i];
      }
    }
    let lp = last_products;
    lp[i] = selected_item;
    let prod = productState;
    prod.selected[i].selected = {
      id: selected_item.id,
      item_price: selected_item.item_price,
      product_price: selected_item.item_price,
      product: {
        id: selected_item.product.id,
        product_name: selected_item.product.product_name,
        product_number: selected_item.product.product_number,
        product_type: selected_item.product.product_type,
      },
    };
    let pickerx = picker;
    pickerx[i] = selected_item.product.id;
    setLast_products(lp);
    setProductState(prod);
    setPicker(pickerx);
    await totalPrice();
  };

  const pType3LastProduct = (item, index) => {
    let items = last_products[index].selected.map((i) => {
      let b = "";
      if (i.menu_type == 1) {
        b = i.selected != null ? i.selected.product.product_name + " " : " ";
      }
      if (i.menu_type == 2 && i.selected.length > 0) {
        b = i.selected.map((s) => {
          return s.product.product_name + " ";
        });
      }
      if (i.menu_type == 4 && i.selected.length > 0) {
        // Sepette görünmüyor!!

        b = i.selected.map((s) => {
          return s.product.product_name + " Olmasın. ";
        });
      }
      return b;
    });

    return (
      <div className="p-2 text-sm font-semibold text-white bg-ya-yellow">
        {items}
        {last_products[index].total_price > 0 && (
          <div
            className="pt-3 ml-5 text-white"
            style={{ fontFamily: "Gilroy-Bold" }}
          >
            {last_products[index].total_price.toFixed(2) + "TL EKLENDİ"}
          </div>
        )}
      </div>
    );
  };

  const pType1 = (item, index) => {
    return (
      <CustomPicker
        style={{ padding: "15px" }}
        menu_name={item.menu_name}
        text={
          !picker[index]
            ? item.menu_name
            : productState.selected[index].selected.product.product_name
        }
        onChange={(id, value) => {
          onValueChange1(index, id);
        }}
        data={item?.product_items.map((i, index) => {
          return {
            key: index,
            id: i.product.id,
            name: i.product.product_name,
            textInfo:
              i.item_price > 0 ? i.item_price.toFixed(2) + " TL " : null,
          };
        })}
        value={"id"}
        label={"name"}
      />
    );
  };

  const pType2 = (item, index1) => {
    return (
      <CheckBoxButton
        setAnswer={(i, index) => {
          onValueChange2(i, index1);
        }}
        items={item.product_items.map((i, index) => {
          return {
            id: i.product.id,
            text: i.product.product_name,
            textInfo:
              i.item_price > 0 ? i.item_price.toFixed(2) + " TL " : null,
            backData: i, //{id:i.id,item_price:i.item_price,product:{id:i.product.id,product_number:i.product.product_number,product_name:i.product.product_name}}
          };
        })}
      />
    );
  };

  const pType3 = (item, index) => {
    return (
      <>
        <CustomPicker
          style={{ padding: 15 }}
          // color={picker[index] ? mainColors.third : mainColors.main}
          /*text={!picker[index]? item.menu_name : product.selected[index].selected.product.product_name}*/
          menu_name={item.menu_name}
          text={
            !picker[index]
              ? item.menu_name
              : productState.selected[index].selected.product.product_name
          }
          onChange={(id, value, price) => {
            onValueChange3(index, id, price);
          }}
          hint={last_products[index] ? pType3LastProduct(item, index) : null}
          data={item.product_items.map((i, index) => {
            return {
              id: i.product.id,
              name: i.product.product_name,
              textInfo:
                i.item_price > 0 ? i.item_price.toFixed(2) + " TL " : null,
              price: i.item_price,
            };
          })}
          value={"id"}
          label={"name"}
        />
        {openType3Modal === true && (
          <ProductType3Modal
            productStatesMenus={productStatesMenus}
            type3ModalStates={type3ModalStates}
            open={openType3Modal}
            setOpen={setOpenType3Modal}
          />
        )}
      </>
    );
  };

  const pType4 = (item, index1) => {
    return (
      <CheckBoxLineButton
        setAnswer={(i, index) => {
          onValueChange2(i, index1);
        }}
        items={item.product_items.map((i, index) => {
          return {
            index: index,
            id: i.product.id,
            text: i.product.product_name,
            textInfo:
              i.item_price > 0 ? i.item_price.toFixed(2) + " TL " : null,
            backData: i, //{id:i.id,item_price:i.item_price,product:{id:i.product.id,product_number:i.product.product_number,product_name:i.product.product_name}}
          };
        })}
      />
    );
  };

  const pType5 = (item, index) => {
    return (
      <CustomPicker
        menu_name={item.menu_name}
        text={
          !picker[index]
            ? item.menu_name
            : productState.selected[index].selected.product.product_name
        }
        onChange={(id, value, price, type) => {
          if (type == 2) {
            onValueChange3(index, id, price, 5);
          } else {
            setLastProduct2(index, item.product_items, id);
          }
        }}
        data={item.product_items.map((i, index) => {
          return {
            id: i.product.id,
            name: i.product.product_name,
            textInfo:
              i.item_price > 0 ? i.item_price.toFixed(2) + " TL " : null,
            price: i.item_price,
            type: i.product.product_type.id,
          };
        })}
        value={"id"}
        label={"name"}
      />
    );
  };

  const productList = () => {
    const ListOfProduct = product?.product_menu?.map((item, index) => {
      return (
        // <GrayView headText={item.menu_name}>
        <div key={item?.id}>
          {
            // Tekli ürün seçimi
            item.menu_type == 1 && pType1(item, index)
            //   <>{item.menu_type}</>
          }

          {
            // çoklu ürün seçimi
            item.menu_type == 2 && pType2(item, index)
            // <>{item.menu_type}</>
          }

          {
            // Menü seçimi
            item.menu_type == 3 && pType3(item, index)
            // <>{item.menu_type}</>
          }

          {
            //İstenmeyen ürün seçimi
            item.menu_type == 4 && pType4(item, index)
          }

          {
            //Menü seçimi tekli seçime çevir
            item.menu_type == 5 && pType5(item, index)
          }
        </div>
        // </GrayView>
      );
    });

    return ListOfProduct;
  };

  const addCart = async () => {
    let selectedControl = 0;
    let selectEmptyText = "";
    productState.selected.forEach((value) => {
      if (value.selected) {
      } else {
        selectedControl += 1;
        selectEmptyText = value.menu_name;
      }
      return selectedControl > 0;
    });

    let add_product = {
      id: product.id,
      piece: piece,
      product_type: productState.product_type,
      product_is_menu: productState.product_is_menu,
      product_name: productState.product_name,
      product_number: productState.product_number,
      product_price: productState.product_price,
      total: productState.total_price,
      total_price: productState.total_price / piece,
      selected: productState.selected,
      img_url: productState.img_url,
    };

    if (selectedControl === 0) {
      // await addRowShopCart(add_product, shopCart);
      // this.props.navigation.goBack();
      setOpen(false);
    } else {
      // Toast.show({
      //     text: selectEmptyText+' boş olamaz',
      //     buttonText: 'Okay',
      //     duration:1000
      // })
      // alert("YEMEKARENA", selectEmptyText + " boş olamaz");
    }
    // await updateBadge(shopCart);

    // if (selectedControl === 0) {
    //   // this.props.navigation.goBack();
    // } else {
    //   // Toast.show({
    //   //     text: selectEmptyText+' boş olamaz',
    //   //     buttonText: 'Okay',
    //   //     duration:1000
    //   // })
    //   alert("YEMEKARENA", selectEmptyText + " boş olamaz");
    // }
    // await this.props.ShopCartStore.updateBadge();
  };

  const productHeader = () => {
    return (
      <div>
        <div className="flex-row flex-1 p-10 bg-ya-dark-white-1">
          <div className="flex-3">
            <div className="pr-10">
              <span className="font-gilroy-bold">
                {productState.product_name}
              </span>
              {
                <span className="pt-4 font-gilroy-light">
                  {productState.detail}
                </span>
              }
            </div>
          </div>

          <div className="flex-1 bg-ya-dark-white-1">
            {(!productState.img_url ||
              !productState.img_url.startsWith("http")) && (
              <PlusIcon className="w-5 h-5 text-ya-red" name="ya-image" />
            )}
            {productState.img_url !== null &&
              productState.img_url.startsWith("http") && (
                <Image
                  source={{
                    uri: productState?.img_url ? productState?.img_url : "",
                  }}
                  className="bg-white rounded-md"
                  width={"100"}
                  height={"100"}
                  priority
                  alt="Image"
                  resizeMode="cover"
                />
              )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between p-2 mt-5 rounded-md sm:mt-4 sm:flex bg-ya-yellow">
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => updatePiece("down")}
                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-white rounded-md shadow-sm hover:bg-ya-red/20 sm:w-auto"
              >
                <MinusIcon className="w-5 h-5 text-ya-red" />
              </button>
              <button
                type="button"
                className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                {piece}
              </button>
              <button
                type="button"
                onClick={() => updatePiece("up")}
                className="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm hover:bg-ya-green/20 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                <PlusIcon className="w-5 h-5 text-ya-red" />
              </button>
            </div>
            <div>
              <span className="text-ya-white">
                {parseFloat(productState.total_price).toFixed(2)} ₺
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-4 sm:w-full sm:max-w-xl sm:p-2">
                {/* <>header buraya</> */}
                <CloseHeader setOpen={setOpen} text="ÜRÜN DETAYLARI" />
                <OrderCardHader product={product} />

                <div className="mb-2">
                  <div className="flex items-center justify-between p-2 sm:flex bg-ya-yellow">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => updatePiece("down")}
                        className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-white rounded-md shadow-sm hover:bg-ya-red/20 sm:w-auto"
                      >
                        <MinusIcon className="w-5 h-5 text-ya-red" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                      >
                        {piece}
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePiece("up")}
                        className="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm hover:bg-ya-green/20 sm:ml-3 sm:mt-0 sm:w-auto"
                      >
                        <PlusIcon className="w-5 h-5 text-ya-red" />
                      </button>
                    </div>
                    <div>
                      <span className="text-ya-white">
                        {parseFloat(productState.total_price).toFixed(2)} ₺
                      </span>
                    </div>
                  </div>
                </div>
                {productList()}
                {
                  <div>
                    <ButtonBlockPrimary
                      className={
                        "py-4 !bg-ya-green !rounded-tl-none !rounded-tr-none"
                      }
                      handleOnClick={() => {
                        addCart();
                      }}
                    >
                      SEPETE EKLE
                    </ButtonBlockPrimary>
                  </div>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
