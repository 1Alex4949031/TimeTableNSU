import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
// Импорт bootstrap-vue-3
import {BootstrapVue3} from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.min.css'
// AOS для
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()

createApp(App)
    .use(BootstrapVue3)
    .use(store)
    .use(router)
    .mount('#app')

