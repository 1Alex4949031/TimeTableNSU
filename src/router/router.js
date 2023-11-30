import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/components/Home-Page.vue";
import FacultiesInitial from "@/components/Faculties-Initial.vue";
import AdminNavigation from "@/components/admin-Page/admin-navigation.vue";
import CreateGroup from "@/components/admin-Page/Create-Group.vue";
import CreateRoom from "@/components/admin-Page/Create-Room.vue";
import CreateSubject from "@/components/admin-Page/Create-Subject.vue";
import RegistrationTeacher from "@/components/admin-Page/Register-Teacher.vue";
import GroupPage from "@/components/Group-Page.vue";
import PlanePage from "@/components/admin-Page/Create-Plane.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/faculties',
        name: 'faculties',
        component: FacultiesInitial
    },
    {
        path: '/admNav',
        name: 'admNav',
        component: AdminNavigation
    },
    {
        path: '/newGroup',
        name: 'newGroup',
        component: CreateGroup
    },
    {
        path: '/newRoom',
        name: 'newRoom',
        component: CreateRoom
    },
    {
        path: '/newTeacher',
        name: 'newTeacher',
        component: RegistrationTeacher
    },
    {
        path: '/newSubj',
        name: 'newSubj',
        component: CreateSubject
    },
    {
        path: '/faculties/:facultyId/groups',
        component: GroupPage
    },
    {
        path: '/newPlane',
        name: 'newPlane',
        component: PlanePage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
        return {top: 0};
    }
})

export default router
