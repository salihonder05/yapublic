"use client";
import {
  getProductMenus,
  getSingleProduct,
} from "@/components/data/query/query";
import YAModal from "@/components/Modal/YAModal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ButtonBlockPrimary from "../../buttons/ButtonBlockPrimary";
import GrayView from "../../GrayView/GrayView";
import CheckBoxButton from "../components/CheckBoxButton";
import CheckBoxLineButton from "../components/CheckBoxLineButton";
import CloseHeader from "../components/CloseHeader";
import CustomPicker from "../components/CustomPicker";
import OrderCardHader from "../components/OrderCardHader";

const ProductType3Modal = ({
  open,
  setOpen,
  type3ModalStates,
  productStatesMenus,
}) => {
  const [productCount, setProductCount] = useState(1);
  const [piece, setPiece] = useState(1);
  const [picker, setPicker] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [openType3Modal, setOpenType3Modal] = useState(false);
  const [checkBox, setCheckBox] = useState([]);
  const [menu_in_menu, setMenu_in_menu] = useState([]);
  const [pType3PId, setPType3PId] = useState();
  const [last_products, setLast_products] = useState([]);
  //   const [type3ModalStates, setType3ModalStates] = useState();
  const product = useSelector((product) => product.product);
  const [productState, setProductState] = useState({
    id: 0,
    product_name: "",
    product_number: 0,
    product_type: { id: 1, type_name: "Tekil Ürün" },
    product_is_menu: false,
    img_url: null,
    detail: "",
    product_price: 0,
    total_price: 0,
    product_menus: [],
    selected: [],
  });

  useEffect(() => {
    let item = type3ModalStates.p_type_3;
    let price = type3ModalStates.price;
    let type = type3ModalStates.type;
    if (!item) {
      type3ModalStates.onGoBack();
    } else {
      let pr = productState;
      pr.product_menus = item.product_menu;
      //alert(JSON.stringify(pr.product_menus));
      let selected = [];
      for (let i = 0; i < pr.product_menus.length; i++) {
        let item = pr.product_menus[i];
        let selected_content = item.menu_type === 1 ? null : [];
        let new_item = {
          id: item.id,
          menu_type: item.menu_type,
          menu_name: item.menu_name,
          selected: selected_content,
        };
        selected.push(new_item);
      }
      pr.id = item.id;
      pr.selected = selected;
      pr.name = item?.product_name;
      pr.product_number = item.product_number;
      pr.product_type = item.product_type
        ? item.product_type
        : { id: 1, type_name: "Tekil Ürün" };
      pr.img_url = item.img_url;
      pr.detail = item.detail ? item.detail.detail_text : "";
      if (item.product_detail != null)
        pr.detail = item.product_detail.detail_text;
      if (price) pr.item_price = price;
      else pr.item_price = 0;
      if (price) pr.total_price = price;
      else pr.total_price = 0;
      //alert(JSON.stringify(pr.selected));
      setProductState(pr);
    }
  }, [product, productStatesMenus]);

  const pType3LastProduct = (item, index) => {
    return menu_in_menu[index];
  };

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

  const onValueChange1 = (index, value) => {
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
    totalPrice();
  };

  const updatePiece = async (way) => {
    let piece = piece;
    if (way === "up") {
      piece++;
    } else if (way === "down") {
      if (piece > 1) {
        piece--;
      }
    }
    await setPiece(piece);
    totalPrice();
  };

  const onValueChange2 = (i, index) => {
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

    totalPrice();
  };

  const onValueChange3 = async (index, value) => {
    let productSt = productState;
    for (
      let i = 0;
      i < productSt.product_menus[index].product_items.length;
      i++
    ) {
      if (
        productSt.product_menus[index].product_items[i].product.id === value
      ) {
        productSt.selected[index].selected =
          productSt.product_menus[index].product_items[i];
      }
    }
    let pickerx = picker;
    pickerx[index] = productSt.selected[index].selected.product.id;
    setPicker(pickerx);
    setProductState(productSt);
  };

  const pType1 = (item, index) => {
    return (
      <CustomPicker
        menu_name={item.menu_name}
        // color={this.state.picker[index]? mainColors.third: mainColors.main}
        /*text={!this.state.picker[index]? item.menu_name : this.state.product.selected[index].selected.product.product_name}*/
        text={
          !picker[index]
            ? item.menu_name
            : productState?.selected[index]?.product?.product_name
        }
        onChange={(id, value) => {
          onValueChange1(index, id);
        }}
        data={item.product_items.map((i, index) => {
          return {
            id: i.product.id,
            name: i?.product?.product_name,
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
        menu_name={item?.menu_name}
        items={item.product_items.map((i, index) => {
          return {
            id: i.product.id,
            text: i?.product?.product_name,
            textInfo:
              i.item_price > 0 ? i.item_price.toFixed(2) + " TL " : null,
            backData: i,
          };
        })}
      />
    );
  };

  const pType3 = (item, index) => {
    return (
      <CustomPicker
        menu_name={item.menu_name}
        // color={this.state.picker[index] ? mainColors.third : mainColors.main}
        /*text={!this.state.picker[index]? item.menu_name : this.state.product.selected[index].selected.product.product_name}*/
        text={
          !picker[index]
            ? item.menu_name
            : productState?.selected[index]?.selected?.product?.product_name
        }
        onChange={async (id, value) => {
          await setPType3PId(id);
          onValueChange3(index, id);
        }}
        data={item.product_items.map((i, index) => {
          return { id: i?.product?.id, name: i?.product?.product_name };
        })}
        value={"id"}
        label={"name"}
      />
    );
  };

  const pType4 = (item, index1) => {
    return (
      <CheckBoxLineButton
        setAnswer={(i, index) => {
          onValueChange2(i, index1);
        }}
        menu_name={item?.menu_name}
        items={item.product_items.map((i, index) => {
          return {
            id: i.product.id,
            text: i?.product?.product_name,
            textInfo:
              i.item_price > 0 ? i.item_price.toFixed(2) + " TL " : null,
            backData: i,
          };
        })}
      />
    );
  };

  const productList = () => {
    const ListOfProduct = type3ModalStates.p_type_3.product_menu.map(
      (item, index) => {
        return (
          <React.Fragment key={index}>
            {
              // Tekli ürün seçimi
              item.menu_type === 1 && pType1(item, index)
            }
            {
              // çoklu ürün seçimi
              item.menu_type === 2 && pType2(item, index)
            }
            {
              // Menü seçimi
              item.menu_type === 3 && pType3(item, index)
            }
            {
              //İstenmeyen ürün seçimi
              item.menu_type === 4 && pType4(item, index)
            }
          </React.Fragment>
        );
      }
    );

    return ListOfProduct;
  };

  const type3ModalHandler = () => {
    setOpen(false);
  };

  const addCart = () => {
    //ProductStore.setLastProduct(this.item.id,this.state.product.selected);

    let selectedControl = 0;
    let selectEmptyText = "";
    productState.selected.forEach((value) => {
      if (value.selected) {
      } else {
        //console.log(value.selected);
        selectedControl += 1;
        selectEmptyText = value.menu_name;
      }
      return selectedControl > 0;
    });
    let prod = productState;
    setProductState(prod);

    if (selectedControl === 0) {
      type3ModalStates.onGoBack(productState, type3ModalStates.type);
      // this.props.navigation.goBack();
      setOpen(false);
    } else {
      // Toast.show({
      //     text: selectEmptyText+' boş olamaz',
      //     buttonText: 'Okay',
      //     duration:1000
      // })
      Swal.fire({
        title: selectEmptyText + " boş olamaz.",
        text: "Lütfen seçim yapınız",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#AD3A41",
        confirmButtonColor: "#13B15C",
        confirmButtonText: "Tamam",
      });
    }
  };

  return (
    <div className="my-4">
      <ButtonBlockPrimary handleOnClick={() => setOpen(true)}>
        {"text"}
      </ButtonBlockPrimary>
      <YAModal open={open} setOpen={setOpen}>
        {/* <>header buraya</> */}
        <CloseHeader
          setOpen={setOpen}
          text={type3ModalStates?.p_type_3?.product_name}
        />
        <OrderCardHader product={type3ModalStates?.p_type_3} />
        {productList()}
        {
          <div>
            <ButtonBlockPrimary
              className={"py-4 !bg-ya-green !rounded-tl-none !rounded-tr-none"}
              handleOnClick={() => addCart()}
              //   onPress={() => {
              //     this._addCart();
              //   }}
            >
              TAMAM
            </ButtonBlockPrimary>
          </div>
        }
      </YAModal>
    </div>
  );
};

export default ProductType3Modal;
