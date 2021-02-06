import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import clickOutside from '@/direntives/click-outside'
import '@/utils/flexible.js'
import '@/assets/css/index.scss'
import '@/theme/index.scss'

const app = createApp(App)
app.directive('outside', clickOutside)

app.use(store).use(router).mount('#app')
