import {closeModalAuth} from "@/js/ModalLogic";
import router from "@/router/router";
import {instance} from "@/js/axios-instance";
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
            router.push({path: "/admNav"})
            closeModalAuth()
            localStorage.setItem("AccessToken", response.data.access_token)
            localStorage.setItem("RefreshToken", response.data.refresh_token)
            isUserLogin.value = "Admin"
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });
}

export function addRoom(name, type, capacity) {
    instance
        .post(
            '/api/admin/create_room',
            {name, type, capacity},
            {useToken: true, requestName: "Create room"}
        )
        .then(response => {
            router.push({path: "/admNav"})
            console.log(response.config.requestName, "Done" )
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });
}
export function addGroup(groupNumber, faculty, course, studentsNumber) {
    instance
        .post(
            '/api/admin/create_group',
            {groupNumber, faculty, course, studentsNumber},
            {useToken: true, requestName: "Create group"}
        )
        .then(response => {
            router.push({path: "/admNav"})
            console.log(response.config.requestName, "Done" )
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });
}
export function regTeacher(email, fullName, phone) {
    instance
        .post(
            '/api/admin/register_teacher',
            {email, fullName, phone},
            {useToken: true, requestName: "Registration teacher"}
        )
        .then(response => {
            router.push({path: "/admNav"})
            console.log(response.config.requestName, "Done" )
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });
}