import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/components/Home-Page.vue";
import FacultiesInitial from "@/components/Faculties-Initial.vue";
import AdminNavigation from "@/components/admin-Page/admin-navigation.vue";
import CreateGroup from "@/components/admin-Page/Create-Group.vue";
import CreateRoom from "@/components/admin-Page/Create-Room.vue";
import CreateSubject from "@/components/admin-Page/Create-Subject.vue";
import RegistrationTeacher from "@/components/admin-Page/Register-Teacher.vue";
import GroupPage from "@/components/Groups-Page.vue";
import PlanPage from "@/components/admin-Page/Create-Plan.vue";
import GroupTimetablePage from "@/components/GroupTimetable-Page.vue";
import TimeTableExample from "@/components/TimeTable-Example.vue";
import NotFoundPage from "@/components/Not-Found-Page.vue";
import ConstraintPage from "@/components/admin-Page/Create-Constraint.vue";
import ConstraintRemovePage from "@/components/admin-Page/Remove-Constraint.vue";
import RemoveBase from "@/components/admin-Page/Remove-group-subject-room-Page.vue"

const routes = [
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
        meta: {
            requiresAuth: false
        }
    },
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
        path: '/newPlan',
        name: 'newPlan',
        component: PlanPage
    },
    {
        path: '/faculties/:facultyId/:group/table',
        component: GroupTimetablePage
    },
    {
        path: '/time-table-example',
        component: TimeTableExample
    },
    {
        path: '/newConstraint',
        component: ConstraintPage
    },
    {
        path: '/removeConstraint',
        component: ConstraintRemovePage
    },
    {
        path: '/removeBase',
        component: RemoveBase
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
        return {top: 0};
    }
})

export default router
