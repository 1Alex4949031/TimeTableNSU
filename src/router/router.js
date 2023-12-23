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
import TimeTableExample from "@/components/TimeTable-Example.vue";
import NotFoundPage from "@/components/Not-Found-Page.vue";
import ConstraintPage from "@/components/admin-Page/Create-Constraint.vue";
import ConstraintRemovePage from "@/components/admin-Page/Remove-Constraint.vue";
import RemoveBase from "@/components/admin-Page/Remove-group-subject-room-Page.vue"
import TeacherTimetablePage from "@/components/Teacher-Timetable-Page.vue";
import {isUserLogin} from "@/js/axios-auth-request";
import GroupTimetablePage from "@/components/Group-Timetable-Page.vue";
import TeachersListPage from "@/components/Teachers-List-Page.vue";
import AllGroupsPage from "@/components/All-Groups-Page.vue";
import CreatingTimetable from "@/components/admin-Page/Creating-Timetable.vue";

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
        component: AdminNavigation,
        meta: {requiresAuth: true}
    },
    {
        path: '/newGroup',
        name: 'newGroup',
        component: CreateGroup,
        meta: {requiresAuth: true}
    },
    {
        path: '/newRoom',
        name: 'newRoom',
        component: CreateRoom,
        meta: {requiresAuth: true}
    },
    {
        path: '/newTeacher',
        name: 'newTeacher',
        component: RegistrationTeacher,
        meta: {requiresAuth: true}
    },
    {
        path: '/newSubj',
        name: 'newSubj',
        component: CreateSubject,
        meta: {requiresAuth: true}
    },
    {
        path: '/faculties/:facultyId/groups',
        component: GroupPage,
    },
    {
        path: '/newPlan',
        name: 'newPlan',
        component: PlanPage,
        meta: {requiresAuth: true}
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
        component: ConstraintPage,
        meta: {requiresAuth: true}
    },
    {
        path: '/removeConstraint',
        component: ConstraintRemovePage,
        meta: {requiresAuth: true}
    },
    {
        path: '/removeBase',
        component: RemoveBase,
        meta: {requiresAuth: true}
    },
    {
        path: '/teachers',
        component: TeachersListPage
    },
    {
        path: '/teachers/:teacherName/table',
        component: TeacherTimetablePage
    },
    {
        path: '/all_groups',
        component: AllGroupsPage
    },
    {
        path: '/all_groups/:group/table',
        component: GroupTimetablePage
    },
    {
        path: '/createTimetable',
        component: CreatingTimetable,
        meta: {requiresAuth: true}
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
        return {top: 0};
    }
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = isUserLogin.value !== "User"; // Функция для проверки авторизации пользователя

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        // Если маршрут требует авторизации и пользователь не аутентифицирован, перенаправляем на страницу входа
        next('/');
    } else {
        next();
    }
});

export default router
