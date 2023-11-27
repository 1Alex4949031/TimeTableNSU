import axios from "axios";
import {closeModalAuth} from "@/JS/ModalLogic";
import router from "@/router/router";
import {ref} from "vue";
import 'vue3-toastify/dist/index.css';
import {toast} from "vue3-toastify";

export const isUserLogin = ref("User") // "User"/ "Admin"/"Teacher"
const serverURL = 'http://localhost:7070'

const instanceNoLogin = axios.create({
    baseURL: serverURL,
});
const instanceLogin = axios.create({
    baseURL: serverURL,
});
instanceLogin.interceptors.request.use(config => {
    const token = sessionStorage.getItem("AccessToken");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export async function auth(email, password) {
    const text = ref("Выполняю")
    const toastId = ref('');
    toastId.value = toast(
        text,
        {
            toastId: 'custom id',
            autoClose: false,
            type: toast.TYPE.DEFAULT,
            position: toast.POSITION.BOTTOM_RIGHT,
        },
    );
    try {
        const response = await instanceNoLogin.post('/api/auth', {email, password});
        text.value = "Успешный вход!"
        toast.update(toastId.value, {
            autoClose: 1000,
            type: toast.TYPE.SUCCESS,
        });

        console.log('Успешный вход:', response.data);
        await router.push({path: "/faculties"})
        closeModalAuth()
        sessionStorage.setItem("AccessToken", response.data.access_token)
        sessionStorage.setItem("RefreshToken", response.data.refresh_token)
        isUserLogin.value = "Admin"
    } catch (err) {
        if (err.response) {
            console.log(err.response.status, err.response.data, err.message);
            text.value = err.message
        } else if (err.request) {
            console.log(err.request);
            text.value = "Нет соеденения с сервером!"
        } else {
            console.log('Error', err.message);
            text.value = "Нет соеденения с сервером!"
        }
        toast.update(toastId.value, {
            autoClose: 10000,
            type: toast.TYPE.ERROR,
        });
    }
}