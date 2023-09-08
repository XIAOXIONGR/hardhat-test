import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'

const vue = createApp(App)

vue.use(router);
vue.mount("#app");
