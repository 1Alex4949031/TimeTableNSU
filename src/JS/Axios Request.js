import {closeModalAuth} from "@/JS/ModalLogic";
import router from "@/router/router";
import {instance} from "@/JS/axios instance";
import {ref} from "vue";

export const isUserLogin = ref("User") // "User"/ "Admin"/"Teacher"


export function auth(email, password) {
    instance
        .post(
            '/api/auth',
            {email, password},
            {useToken: false, requestName: "Login"}
        )
        .then(response => {
            router.push({path: "/faculties"})
            closeModalAuth()
            sessionStorage.setItem("AccessToken", response.data.access_token)
            sessionStorage.setItem("RefreshToken", response.data.refresh_token)
            isUserLogin.value = "Admin"
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });

}