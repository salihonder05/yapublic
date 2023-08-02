"use client"

const { cartActions } = require("@/app/Redux/features/cart-slice");
const { default: store } = require("@/app/Redux/store");

const addRowShopCart = async (row, shopCart) => {
    // await window.localStorage.removeItem('shop_cart');
    let shop_cart = window.localStorage.getItem('shop_cart');
    let current_account = window.localStorage.getItem('current_account');

    let active_shop_card_account = 0;
    let new_card = [];

    if (!shop_cart) {
        shop_cart = [];
    } else {
        new_card = JSON.parse(shop_cart);
    }
    console.log("new_card:  ", new_card);
    console.log("shop_cart:  ", shop_cart);
    if (new_card.length === 0) {
        console.log("new_card.length === 0:  ", new_card.length === 0);
        let ChoseeType = await window.localStorage.getItem("ChoseeType")
        await window.localStorage.setItem("ShopType", ChoseeType)
        await window.localStorage.setItem('active_shop_card_account', current_account);
        active_shop_card_account = current_account;
        new_card.push(row);
        await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
        // runInAction(() => {
        store.dispatch(cartActions.updateState({ shopCart: new_card }));
        // })
    }
    else {
        let shopType = await window.localStorage.getItem("ShopType");
        let ChoseeType = await window.localStorage.getItem("ChoseeType")

        console.log("shopTypeChoseeType: ", shopType, ChoseeType);

        if (!shopType) {
            await window.localStorage.setItem("ShopType", ChoseeType)
            console.log("yanlış: ", shopType, ChoseeType);

        } else {
            console.log("doğru: ", shopType, ChoseeType);
            if (shopType != ChoseeType) {
                console.log("doğruyanlış: ", shopType, ChoseeType);
                alert("YEMEKARENA", `Sepetinde farklı bir Spiariş türüne (${sipTypes(shopType)}) ait ürün(ler) var. Devam edebilmek için önce sepetinizi silmelisiniz.`);
                return false;
            }
        }

        active_shop_card_account = await window.localStorage.getItem(
            'active_shop_card_account',
        );

        if (active_shop_card_account === current_account) {
            new_card.push(row);
            await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
            // runInAction(() => {
            await store.dispatch(cartActions.updateState({ shopCart: new_card }));
            // })
        } else {
            // alert("YEMEKARENA", "Sepetinde farklı bir restorana ait ürün var. Sepeti sil butonu ile bu ürünleri silip yeni ürünleri ekleyebilirsiniz.", [
            //     {
            //         text: "SEPETİ SİL",
            //         onclick: async () => {
            //             await window.localStorage.removeItem('shop_cart');

            //             await window.localStorage.setItem('active_shop_card_account', current_account);
            //             active_shop_card_account = current_account;
            //             new_card = [];
            //             new_card.push(row);
            //             await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
            //             store.dispatch(cartActions.updateState({ shopCart: new_card }));
            //         }
            //     },
            //     {
            //         text: "VAZGEÇ"
            //     }
            // ]
            // );
        }
    }
    // await updateBadge(shopCart);
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
    getShopCart(shopCart);
    updateRowShopCart(shopCart);
    let shop_cart = shopCart
    store.dispatch(cartActions.updateState({ badge: shop_cart.length }));
}
const updateRowShopCart = async (shopCart) => {
    try {
        // runInActionstore.ac () => {
        return shopCart;
        // });
    } catch (e) { }
}

const deleteRowShopCart = async (id, shopCart) => {
    let shop_cart = await window.localStorage.getItem('shop_cart');
    let new_card = [];
    if (!shop_cart) {
        shop_cart = [];
    } else {
        new_card = JSON.parse(shop_cart);
    }

    new_card.splice(id, 1);
    await window.localStorage.setItem('shop_cart', JSON.stringify(new_card));
    // runInAction(() => {
    // this.shopCart = new_card;
    // })
    await updateBadge(shopCart);
    return shopCart
}

const getShopCart = async (shopCart) => {
    //await window.localStorage.removeItem('shop_cart');
    let shop_cart = await window.localStorage.getItem('shop_cart');
    let new_card = [];
    if (!shop_cart) {
        shop_cart = [];
    } else {
        new_card = JSON.parse(shop_cart);
    }
    //console.log(JSON.stringify(new_card))
    let sca = await window.localStorage.getItem('active_shop_card_account');

    // runInAction(() => {
    store.dispatch(cartActions.updateState({ shopCart: new_card }));
    store.dispatch(cartActions.updateState({ shopCardAccountID: sca }));

    // this.shopCardAccountID = sca;
    // this.shopCart = new_card;
    updateBadge(shopCart);
    // });
    //return this.shopCart;
}


export {
    addRowShopCart,
    updateBadge,
    updateRowShopCart,
    deleteRowShopCart,
    getShopCart
}