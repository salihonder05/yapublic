"use client"
import { authActions } from "@/app/Redux/features/auth-slice";
import store from "@/app/Redux/store";




const fetchUser = async (token) => {
    //console.log("objectsssss: " , token);
    const response = await fetch("http://localhost:3000/api/auth/tokencontrol", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userToken: token }),
    })
    const responses = await response.json();
    store.dispatch(authActions.updateState({ user: responses }));
    return responses;
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


