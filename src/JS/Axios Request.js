import axios from "axios";
import {closeModalAuth} from "@/JS/ModalLogic";
import router from "@/router";

const serverURL = 'http://localhost:9090'

const instanceNoLogin = axios.create({
    baseURL: serverURL,
});

const instanceLogin = axios.create({
    baseURL: serverURL,
});

export async function auth(login, password, ans, error) {
    try {
        const response = await instanceNoLogin.post('/api/auth', {login, password});
        ans.value = response.data
        console.log('Успешный вход:', response.data);
        await router.push({path: "/user_profile"})
        closeModalAuth()
        sessionStorage.setItem("AccessToken", response.data.access_token)
        sessionStorage.setItem("RefreshToken", response.data.refresh_token)
        sessionStorage.setItem("TypeToken", response.data.token_type)
        sessionStorage.setItem("ExpiresIn", response.data.expires_in)
    } catch (err) {
        if (err.response) {
            console.log(err.response.status, err.response.data, err.message);
            error.value = err.response.data.message;
        } else if (err.request) {
            console.log(err.request);
            error.value = 'Ошибка сервера';
        } else {
            console.log('Error', err.message);
            error.value = err.message;
        }
    }
}