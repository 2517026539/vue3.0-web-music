import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/flexible.js'
import '@/assets/css/index.scss'
import '@/theme/index.scss'

createApp(App).use(store).use(router).mount('#app')
