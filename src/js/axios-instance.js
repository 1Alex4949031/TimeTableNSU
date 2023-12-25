import {ref} from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const serverURL = 'http://localhost:7070'
const toast = useToast();
export const customInstance = axios.create({
    baseURL: serverURL,
});
customInstance.defaults.useToken = false
customInstance.defaults.requestName = "Неизвестный запрос"
customInstance.defaults.showToast = true//
customInstance.defaults.toastWaitResponseText = "Запрос выполняется..."
customInstance.defaults.toastSuccessText = "Успешно!"
customInstance.defaults.toastErrorDataText = ""
customInstance.defaults.toastId = ""
customInstance.defaults.successErrorOpportunity = false
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
        config.toastText = ref(config.toastWaitResponseText)

        if (config.showToast) {
            if (config.toastId === "") {
                config.toastId = config.requestName
            }
            config.toastId = toast.info(config.toastWaitResponseText, { timeout: 10000 })
        }
        return config;
    })
customInstance.interceptors.response.use(
    response => {
        console.log(response.config.requestName + " успешно выполнен!")
        if (response.config.showToast) {
            response.config.toastText.value = response.config.toastSuccessText
            toast.dismiss(response.config.toastId)
            toast.success(response.config.toastSuccessText, { timeout: 1000 })
        }
        return response;
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
            consoleMessage = 'Error ' + error.config.requestName + error.message
            error.config.toastText.value = "Ошибка при разработке!"
        }
        if (error.config.showToast) {
            toast.dismiss(error.config.toastId)
        }
        if(error.config.successErrorOpportunity && error.response.status === 400){
            toast.warning(error.config.toastErrorDataText, { timeout: 5000 })
            console.log(consoleMessage)
            return Promise.reject(error.response.data)
        }
        toast.error(error.config.toastText.value , { timeout: 5000 })
        return Promise.reject(consoleMessage);
    }
);