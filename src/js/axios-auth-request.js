import {closeModalAuth} from "@/js/ModalLogic";
import router from "@/router/router";
import {customInstance} from "@/js/axios-instance";
import {ref} from "vue";
import {connect, disconnect} from "@/js/socket";

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
            const {access_token, refresh_token, roles} = response.data
            closeModalAuth()
            localStorage.setItem("AccessToken", access_token)
            localStorage.setItem("RefreshToken", refresh_token)
            if (roles.some(role => role.includes("ROLE_ADMINISTRATOR"))) {
                localStorage.setItem("isUserLogin", "Admin")
                isUserLogin.value = "Admin"
                connect()
            }
            else {
                localStorage.setItem("isUserLogin", "Teacher")
                isUserLogin.value = "Teacher"
            }
            console.log(isUserLogin.value)
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
    disconnect();
    router.push({path: "/"}).then(x => console.log(x))
}


