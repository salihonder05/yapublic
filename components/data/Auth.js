"use client"
import { authActions } from "@/app/Redux/features/auth-slice";
import store from "@/app/Redux/store";


const PROJECT_API_URL = process.env.PROJECT_API_URL;

const fetchUser = async (token) => {
    //console.log("objectsssss: " , token);
    const response = await fetch(PROJECT_API_URL + "auth/tokencontrol", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userToken: token }),
    })
    try {
        const responses = await response.json();
        store.dispatch(authActions.updateState({ user: responses }));
        return responses;
    } catch (error) {
        console.error("JSON Dönüşüm Hatası:", error);
        // Hata durumuyla nasıl başa çıkmanız gerektiğine karar verin
    }
}



export default function Auth() {
    //const userToken = useSelector(({ auth }) => auth.userToken);
    let tokenStatus = false;
    let TempToken = "";
    if (typeof window !== 'undefined') {
        if (!window.localStorage.getItem("userToken")) {
            // console.log("Misafir oturumu açıldı.");
            tokenStatus = false;
        } else {
            const LocalStorageUserToken = window.localStorage.getItem("userToken");
            store.dispatch(authActions.updateState({ userToken: LocalStorageUserToken }));
            store.dispatch(authActions.updateState({ isLoggedIn: true }));
            tokenStatus = true;
            TempToken = LocalStorageUserToken;
            // console.log("Token bulundu." + LocalStorageUserToken);
        }
    }
    if (tokenStatus) {
        // console.log("En son gönderdiğimiz temp token:  " + TempToken);
        fetchUser(TempToken);
    }

}


