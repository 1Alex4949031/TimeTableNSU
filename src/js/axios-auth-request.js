import {closeModalAuth} from "@/js/ModalLogic";
import router from "@/router/router";
import {customInstance} from "@/js/axios-instance";
import {ref} from "vue";

export const isUserLogin = ref(localStorage.getItem("isUserLogin") || "User") // "User"/ "Admin"/"Teacher"


export function auth(email, password) {
    customInstance
        .post(
            '/api/auth',
            {email, password},
            {useToken: false, requestName: "Login"}
        )
        .then(response => {
            router.push({path: "/admNav"}).then(x => console.log(x || "Навигация завершена!"))
            const {access_token, refresh_token} = response.data
            closeModalAuth()
            localStorage.setItem("AccessToken", access_token)
            localStorage.setItem("RefreshToken", refresh_token)
            localStorage.setItem("isUserLogin", "Admin")
            isUserLogin.value = "Admin"
        })
        .catch(consoleMessage => {
            console.error(consoleMessage)
        });
}

//Вместо рефреша
export function logOut() {
    localStorage.removeItem("AccessToken")
    localStorage.removeItem("RefreshToken")
    localStorage.removeItem("isUserLogin")
    isUserLogin.value = "User"
    router.push({path: "/"}).then(x => console.log(x))
}


