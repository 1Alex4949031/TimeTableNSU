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
            router.push({path: "/admNav"})
            closeModalAuth()
            localStorage.setItem("AccessToken", response.data.access_token)
            localStorage.setItem("RefreshToken", response.data.refresh_token)
            localStorage.setItem("isUserLogin", "Admin")
            isUserLogin.value = "Admin"
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });
}

//Вместо рефреша
export function logOut() {
    localStorage.removeItem("AccessToken")
    localStorage.removeItem("RefreshToken")
    localStorage.removeItem("isUserLogin")
    isUserLogin.value = "User"
    router.push({path: "/home"})
}


export function addRoom(name, type, capacity) {
    customInstance
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
export function addGroup(groupNumber, faculty, studentsNumber, course) {
    customInstance
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
    customInstance
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

export function getTeachers(teachers) {
    customInstance
        .get(
            '/get/all_teachers',
            {useToken: false, requestName: "Get teacher"}
        )
        .then(response => {
            teachers.value = response.data
            console.log(response.config.requestName, "Done" )
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });
}
export function getGroups(group) {
    customInstance
        .get(
            '/get/all_groups',
            {useToken: false, requestName: "Get group"}
        )
        .then(response => {
            for( let x of response.data ){
                group.value.push(x.groupNumber)
            }
            console.log(response.config.requestName, "Done" )
        })
        .catch(consoleMessage =>{
            console.error(consoleMessage)
        });
}