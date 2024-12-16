import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import './main.css'
import "element-plus/dist/index.css";
import { NMessageProvider } from 'naive-ui';
import { createPinia } from 'pinia';

const app = createApp(App)

const pinia = createPinia()

app.component('n-message-provider', NMessageProvider)

app.use(pinia)
app.use(router)

app.mount('#app')
