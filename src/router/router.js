import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/components/Home-Page.vue";
import FacultiesInitial from "@/components/Faculties-Initial.vue";

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
