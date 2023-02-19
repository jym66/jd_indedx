import {createApp} from 'vue'
import App from './App.vue'
// import ElementPlus from 'element-plus'
import router from "./router/index";
// import 'element-plus/dist/index.css'
import http from './util/httpRequest.js'
import './assets/css/reset.css'
import './assets/css/base.css'
import './assets/font/iconfont.css'
import cookie from "@/util/cookie";
import store from "@/store";

const app = createApp(App)
app.use(router)
// app.use(ElementPlus)
app.config.globalProperties.$cookie = cookie
app.config.globalProperties.$http = http
app.config.globalProperties.$store = store
app.mount('#app')
