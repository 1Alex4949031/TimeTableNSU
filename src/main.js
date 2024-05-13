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
//Montserrat
import './css/font.css'
//Loader 3d
import './css/loaders/loader-3d.css'
//Toast
import Toast, {POSITION} from "vue-toastification";

const options = {position: POSITION.BOTTOM_RIGHT};

createApp(App)
    .use(BootstrapVue3)
    .use(Toast, options)
    .use(store)
    .use(router)
    .mount('#app')

