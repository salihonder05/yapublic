"use client"
import { ordersActions } from "@/app/Redux/features/orders-slice";
import { productActions } from "@/app/Redux/features/product-slice";
import { restaurantsActions } from "@/app/Redux/features/restaurants-slice";
import store from "@/app/Redux/store";



const getCityRestaurants = async (selectedType) => {
    if (typeof window !== 'undefined') {
        var localStorageCity = JSON.parse(window.localStorage.getItem("selectedCity"));
    }
    try {
        const response = await fetch("http://localhost:3000/api/cityrestaurant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cityId: localStorageCity?.id, order_type: selectedType }),
        });
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {
            const notNullCity = await data?.data?.data?.delivery_point_city?.filter(
                (neigh) => neigh.point_account !== null
            );
            // setRestaurants(notNullCity);
            store.dispatch(restaurantsActions.updateState({ restaurants: notNullCity }))

        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
};
const getRestaurantsProducts = async (accountId) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/accountproducts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accountId: accountId }),
            }
        );
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {
            // const notNullCity = await data.data.data.delivery_point_city.filter(
            //   (neigh) => neigh.point_account !== null
            // );
            // setRestaurantsProducts(data?.token?.data?.product_groups);
            store.dispatch(restaurantsActions.updateState({ restaurantsProducts: data?.token?.data?.product_groups }))

            // console.log("notNullCity: ", data?.token?.data?.product_groups);
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
};

// export const getAccountDetail = async (accountId) => {
//     try {
//         const response = await axios.post(`http://localhost:3000/api/singleaccount`, {
//             accountId
//         });
//         return { success: true, message: data?.data?.data?.account };
//     } catch (error) {
//         // Hata durumunda hata mesajını döndür
//         return { success: false, message: error.response.data.message };
//     }
// };

const getAccountDetail = async (accountId) => {
    try {
        const response = await fetch("http://localhost:3000/api/singleaccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountId: accountId }),
        });
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın

        if (response.ok) {
            return { success: true, message: data?.data?.data?.account };
            // Auth();
            // dispatch(authActions.updateState({ authModalOpen: false }));
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
        return { success: false, message: error.response };
    }
};
const getNeighbourhoods = async (districtId) => {

    const PROJECT_API_URL = process.env.PROJECT_API_URL;
    // console.log("districtId");
    try {
        const response = await fetch(PROJECT_API_URL + "neighborhoodsx", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                districtId: districtId,
            }),
        });
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {
            // setNeighbourhoods(data.data.data.neighborhoodsx);
            store.dispatch(restaurantsActions.updateState({ neighbourhoodsx: data.data.data.neighborhoodsx }))
            // console.log("data.data.data.districtx: ", data.data.data.districtsx);
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
};
const getSingleOrder = async (orderId) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId: orderId }),
            }
        );
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {
            // setRestaurants(notNullNeighborhood);
            store.dispatch(productActions.updateState({ product: data.data.data.order }))
            // store.dispatch(ordersActions.updateState({ activeOrders: onlyActiveOrders }))


            // Auth();
            // dispatch(authActions.updateState({ authModalOpen: false }));
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
};
const getProductMenus = async (productId, setProductStatesMenus) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/productmenus",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: productId }),
            }
        );
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {

            // setRestaurants(notNullNeighborhood);
            // console.log("productMenusproductMenus: ", response);
            await setProductStatesMenus(data.data.data)
            // store.dispatch(ordersActions.updateState({ activeOrders: onlyActiveOrders }))


            // Auth();
            // dispatch(authActions.updateState({ authModalOpen: false }));
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
};
const getUserOrders = async (customerId) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ costumerId: customerId }),
            }
        );
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {
            const onlyActiveOrders =
                await data?.data?.data?.all_orders.filter(
                    (neigh) => neigh?.status?.statu_name !== "Sipariş teslim edildi"
                );
            // setRestaurants(notNullNeighborhood);
            store.dispatch(ordersActions.updateState({ orders: data.data.data.all_orders }))
            store.dispatch(ordersActions.updateState({ activeOrders: onlyActiveOrders }))


            // Auth();
            // dispatch(authActions.updateState({ authModalOpen: false }));
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
};
const getNeighborhoodRestaurants = async (selectedNeighbourhood) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/neighborhoodrestaurants",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ neighborhoodId: selectedNeighbourhood }),
            }
        );
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {
            const notNullNeighborhood =
                await data.data.data.delivery_point_neighborhood.filter(
                    (neigh) => neigh.point_account !== null
                );
            // setRestaurants(notNullNeighborhood);
            store.dispatch(restaurantsActions.updateState({ restaurants: notNullNeighborhood }))

            // console.log("notNullNeighborhood: ", notNullNeighborhood);

            // Auth();
            // dispatch(authActions.updateState({ authModalOpen: false }));
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
};
const getSingleProduct = async (productId, accountId, cartProducts) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/singleproduct",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: productId,
                    accountId: accountId
                }),
            }
        );
        const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
        if (response.ok) {
            cartProducts?.push(data?.data?.data?.product);
            // const notNullNeighborhood =
            //     await data.data.data.product.filter(
            //         (neigh) => neigh.point_account !== null
            //     );
            // setRestaurants(notNullNeighborhood);
            store.dispatch(productActions.updateState({ product: data?.data?.data?.product }));

            // console.log("notNullNeighborhood: ", notNullNeighborhood);

            // Auth();
            // dispatch(authActions.updateState({ authModalOpen: false }));

            return data?.data?.data?.product; // Response'u return ediyoruz
        }
    } catch (error) {
        console.error("Error fetching customer list:", error);
        throw error; // Hata oluşursa error'ı yeniden fırlatıyoruz
    }
};

export { getCityRestaurants, getRestaurantsProducts, getAccountDetail, getProductMenus, getNeighbourhoods, getNeighborhoodRestaurants, getUserOrders, getSingleOrder, getSingleProduct };
