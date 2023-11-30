import {ref} from "vue";
import axios from "axios";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const serverURL = 'http://localhost:7070'

export const customInstance = axios.create({
    baseURL: serverURL,
});
customInstance.defaults.useToken = false
customInstance.defaults.requestName = "Неизвестный запрос"
customInstance.defaults.showToast = "all"//
customInstance.defaults.toastWaitResponseText = "Запрос выполняется..."
customInstance.defaults.toastSuccessText = "Успешно!"
customInstance.defaults.toastErrorDataText = ""
customInstance.interceptors.request.use(
    config => {
        if (config.useToken) {
            const token = localStorage.getItem("AccessToken");
            if (token != null) {
                config.headers['Authorization'] = `Bearer ${token}`;
            } else {
                console.log("Ошибка прикрепления токена")
            }
        }
        if (config.showToast) {
            config.toastText = ref(config.toastWaitResponseText)
            config.toastId = ref(toast(
                    config.toastText,
                    {
                        toastId: config.toastId || config.requestName,
                        autoClose: false,
                        type: "loading",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    },
                )
            );
        }
        return config;
    })
customInstance.interceptors.response.use(
    response => {
        console.log(response.config.requestName + " успешно выполнен!")
        if (response.config.showToast) {
            response.config.toastText.value = response.config.toastSuccessText
            toast.update(response.config.toastId.value,
                {
                    autoClose: 1000,
                    type: toast.TYPE.SUCCESS,
                });
            return response;
        }
    },
    error => {
        let consoleMessage
        if (error.response) {
            consoleMessage = error.config.requestName + error.response.status + error.response.data + error.message;
            error.config.toastText.value = error.message
        } else if (error.request) {
            consoleMessage = error.config.requestName + error.request
            error.config.toastText.value = "Нет соеденения с сервером!"
        } else {
            consoleMessage = 'Error '  + error.config.requestName + error.message
            error.config.toastText.value = "Ошибка при разработке!"
        }
        if (error.config.showToast) {
            toast.update(error.config.toastId.value, {
                autoClose: 10000,
                type: toast.TYPE.ERROR,
            });
        }
        return Promise.reject(consoleMessage);
    }
);