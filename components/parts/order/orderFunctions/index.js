"use client"
import axios from "axios";
import Swal from "sweetalert2";

const { cartActions } = require("@/app/Redux/features/cart-slice");
const { default: store } = require("@/app/Redux/store");
const API_BASE = process.env.API_URL;
if (typeof window !== 'undefined') {
    var shopCardAccountID = window.localStorage.getItem('accountId');
}
const addRowShopCart = async (row) => {
    // await window.localStorage.removeItem('shop_cart');
    if (typeof window !== 'undefined') {
        var shop_cart = window.localStorage.getItem('shop_cart');
        var accountId = window.localStorage.getItem('accountId');
    }
    console.log("shop_cartshop_cartshop_cart: ", accountId);

    let active_shop_card_account = 0;
    let new_card = [];

    if (!shop_cart) {
        shop_cart = [];
    } else {
        new_card = JSON.parse(shop_cart);
    }
    if (typeof window !== 'undefined') {
        if (new_card.length === 0) {
            console.log("new_card.length === 0:  ", new_card.length === 0);
            let ChoseeType = await window.localStorage.getItem("ChoseeType")
            await window.localStorage.setItem("ShopType", ChoseeType)
            await window.localStorage.setItem('active_shop_card_account', accountId);
            active_shop_card_account = accountId;
            new_card.push(row);
            await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
            // runInAction(() => {
            store.dispatch(cartActions.updateState({ shopCart: new_card }));
            // })
        }
        else {
            let shopType = await window.localStorage.getItem("ShopType");
            let ChoseeType = await window.localStorage.getItem("ChoseeType")

            if (!shopType) {
                await window.localStorage.setItem("ShopType", ChoseeType)

            } else {
                console.log("doğru: ", shopType, ChoseeType);
                if (shopType != ChoseeType) {
                    Swal.fire({
                        title: "Emin misiniz?",
                        text: "Sepetinizde farklı bir Spiariş türüne ait ürün(ler) var. Devam edebilmek için önce sepetinizi silmelisiniz",
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Okay"
                    }).then(function () {
                        // Redirect the user
                        window.localStorage.removeItem("shop_cart")
                    });
                    // alert("YEMEKARENA", `Sepetinde farklı bir Spiariş türüne (${sipTypes(shopType)}) ait ürün(ler) var. Devam edebilmek için önce sepetinizi silmelisiniz.`);
                    return false;
                }
            }

            active_shop_card_account = await window.localStorage.getItem(
                'active_shop_card_account',
            );

            if (active_shop_card_account === accountId) {
                new_card.push(row);
                await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
                // runInAction(() => {
                await store.dispatch(cartActions.updateState({ shopCart: new_card }));
                shop_cart = JSON.stringify(new_card);

                console.log("active_shop_card_account: ", active_shop_card_account);
                // })
            } else {
                Swal.fire({
                    title: "Emin misiniz?",
                    text: "Sepetinizde farklı bir Spiariş türüne ait ürün(ler) var. Devam edebilmek için önce sepetinizi silmelisiniz",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Okay"
                }).then(async (result) => {
                    // Redirect the user
                    if (result.isConfirmed) {
                        // Onay işlemini gerçekleştir
                        window.localStorage.removeItem("shop_cart")
                        await window.localStorage.setItem('shop_cart', JSON.stringify([row]));
                        Swal.fire(
                            `Onaylandı!`,
                            "Seçtiğiniz işlem başarıyla onaylandı.",
                            "success"
                        );
                    }
                });
                // alert("YEMEKARENA", "Sepetinde farklı bir restorana ait ürün var. Sepeti sil butonu ile bu ürünleri silip yeni ürünleri ekleyebilirsiniz.", [
                //     {
                //         text: "SEPETİ SİL",
                //         onclick: async () => {
                //             await window.localStorage.removeItem('shop_cart');

                //             await window.localStorage.setItem('active_shop_card_account', accountId);
                //             active_shop_card_account = accountId;
                //             new_card = [];
                //             new_card.push(row);
                //             await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
                //             await store.dispatch(cartActions.updateState({ shopCart: new_card }));
                //             shop_cart = JSON.stringify(new_card);
                //         }
                //     },
                //     {
                //         text: "VAZGEÇ"
                //     }
                // ]
                // );
            }
        }
    }
    // await updateBadge(shop_cart);
}
const removeShopCard = async () => {
    if (typeof window !== 'undefined') {
        await window.localStorage.removeItem('shop_cart');
        await window.localStorage.removeItem('active_shop_card_account');
    }
    // runInAction(() => {
    store.dispatch(cartActions.updateState({ shopCart: [] }));
    // this.shopCart = [];
    // this.shopCardAccountID = 0;
    // this.shopCardAccount = {
    //     id:0,
    //     account_title:'',
    //     brand:{
    //         brand_banner:''
    //     }
    // }
    // });
}
const checkShopCardStore = async () => {
    // await AsyncStorage.removeItem('shop_cart');
    if (typeof window !== 'undefined') {
        var shop_cart = await window.localStorage.getItem('shop_cart');
        var current_account = await window.localStorage.getItem('current_account');
    }

    let active_shop_card_account = 0;
    let new_card = [];

    if (!shop_cart) {
        shop_cart = [];
    } else {
        new_card = JSON.parse(shop_cart);
    }

    if (new_card.length === 0) {
        return true;
    }
    else {
        if (typeof window !== 'undefined') {
            active_shop_card_account = await window.localStorage.getItem(
                'active_shop_card_account',
            );
        }
        if (active_shop_card_account === current_account) {
            return true;
        } else {
            return false;
        }
    }
}
const sipTypes = (id) => {
    id = parseInt(id + "")
    switch (id) {
        case 1:
            return "Paket Servis"
        case 2:
            return "Gelip Alacağım"
        case 3:
            return "Restoranda Yiyeceğim"
        default:
            return "Belirsiz"
    }
}

const updateBadge = async (shopCart) => {
    console.log("updateBadgeshopCart: ", shopCart);
    // getShopCart(shopCart);
    // updateRowShopCart(shopCart);
    // let shop_cart = shopCart
    store.dispatch(cartActions.updateState({ badge: shopCart.length }));
}

const updateRowShopCart = async (shopCart) => {
    try {
        // runInActionstore.ac () => {
        return shopCart;
        // });
    } catch (e) { }
}

const deleteRowShopCart = async (id, shopCart) => {
    if (typeof window !== 'undefined') {
        var shop_cart = await window.localStorage.getItem('shop_cart');
    }
    let new_card = [];
    if (!shop_cart) {
        shop_cart = [];
    } else {
        new_card = JSON.parse(shop_cart);
    }

    new_card.splice(id, 1);
    if (typeof window !== 'undefined') {
        await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
    }
    // runInAction(() => {
    shopCart = new_card;
    store.dispatch(cartActions.updateState({ shopCart: new_card }));

    // })
    await updateBadge(shopCart);
    return shopCart
}

const getShopCart = async (shopCart) => {
    //await window.localStorage.removeItem('shop_cart');
    // if (typeof window !== 'undefined') {
    //     var shop_cart = await window.localStorage.getItem('shop_cart');
    // }
    let new_card = [];
    if (!shopCart) {
        shopCart = [];
    } else {
        new_card = shopCart;
    }
    //console.log(JSON.stringify(new_card))
    if (typeof window !== 'undefined') {
        var sca = await window.localStorage.getItem('active_shop_card_account');
    }

    // runInAction(() => {
    store.dispatch(cartActions.updateState({ shopCart: new_card }));
    store.dispatch(cartActions.updateState({ shopCardAccountID: sca }));

    // this.shopCardAccountID = sca;
    shopCart = new_card;
    updateBadge(shopCart);
    // });
    //return this.shopCart;
}
const uploadShopCart = async (
    cart,
    totalAmount,
    address,
    orderType,
    orderPayRule,
    orderNote,
    receiveTime,
    point
) => {
    // this.loading = true;
    if (typeof window !== 'undefined') {
        var current_account = await window.localStorage.getItem(
            'active_shop_card_account',
            // 'active_shop_card_account',
        );
        var addressId = window.localStorage.getItem("selectedAddressId");

    }

    console.log("uploadShopCart cart: ", cart);
    console.log("uploadShopCart totalAmount: ", totalAmount);
    console.log("uploadShopCart address: ", addressId);
    console.log("uploadShopCart orderType: ", orderType);
    console.log("uploadShopCart orderPayRule: ", orderPayRule);
    console.log("uploadShopCart current_account: ", current_account);

    try {
        //alert(current_account)
        let query = `
                        mutation{
                          postOrder(
                              order:{
                                account:${current_account}
                                address:${addressId}
                                order_price:${totalAmount}
                                ordertype:${orderType}
                                status:${orderPayRule == 3 ? '6' : '1'}
                                orderpayrule:${orderPayRule}
                                order_note:"${orderNote}"
                                ${receiveTime ? 'order_receive_time:"' + receiveTime + '"' : ""}
                                order_json:${JSON.stringify(cart).replace(/\"([^(\")"]+)\":/g, '$1:',)}
                              }
                              point:${false}
                            ){
                            id
                          }
                        }
                    `;
        console.log(query)
        if (typeof window !== 'undefined') {
            var token = await window.localStorage.getItem('userToken');
        }
        const { data } = await axios({
            url: `${API_BASE}`,
            method: 'post',
            headers: {
                Authorization: token,
            },
            data: {
                query,
            },
        });

        console.log("datadatadata: ", data);



        if (data.errors) {
            // this.loading = false; 
            Swal.fire({
                title: `YEMEKARENA`,
                text: data.errors[0].message,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#A4DB86",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Tamam",
                // cancelButtonText: "Vazgeç",
            })
            // .then((result) => {
            //     if (result.isConfirmed) {
            //         // Onay işlemini gerçekleştir
            //         Swal.fire(
            //             `${approveDataLabel} Onaylandı!`,
            //             "Seçtiğiniz öğe başarıyla onaylandı.",
            //             "success"
            //         );
            //     }
            // });
            return false;
        }
        // runInAction(() => {
        // this.loading = false;
        // this.uploadedCard = data.data.postOrder;
        // return true; 
        return { success: true, data: data?.data };
        // });
    } catch (e) {
        console.log(e);
        // this.loading = false;
    }
}
const getShopCartAccountInfo = async () => {
    try {
        const { data } = await axios({
            url: API_BASE,
            method: 'post',
            data: {
                query: `
                        {
                          account(id:${shopCardAccountID}){
                            id
                            account_title
                            brand{
                              brand_name
                              brand_banner
                            }
                            account_opening
                            account_closing
                            address{town{name} neighborhood{name}}
                          }
                        }
                    `,
            },
        });
        if (data.errors) {
            alert("YEMEKARENA", data.errors[0].message);
        }
        //alert(JSON.stringify(data))
        // runInAction(() => {
        // shopCardAccount.point_account = data.data.account;
        // });
    } catch (e) {
        console.log(e);
    }
}
const updateRowPiece = async (id, piece) => {
    if (typeof window !== 'undefined') {
        var shop_cart = await window.localStorage.getItem('shop_cart');
    }
    let new_card = [];
    if (!shop_cart) {
        shop_cart = [];
    } else {
        new_card = JSON.parse(shop_cart);
    }
    let old = new_card[id].piece;
    let price = new_card[id].total_price / old;
    piece == 'up' ? old++ : old--;
    old == 0 ? (old = 1) : (old = old);
    new_card[id].piece = old;
    //alert(JSON.stringify(new_card[id]))
    new_card[id].total = new_card[id].total_price * old; //.toFixed(2);
    if (typeof window !== 'undefined') {
        await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
    }
    // runInAction(() => {
    // this.shopCart = new_card;
    // })
    // console.log(new_card[id]);
    return new_card;
}
export {
    addRowShopCart,
    updateBadge,
    removeShopCard,
    updateRowShopCart,
    deleteRowShopCart,
    getShopCart,
    checkShopCardStore,
    getShopCartAccountInfo,
    updateRowPiece,
    uploadShopCart
}