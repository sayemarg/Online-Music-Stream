import { createApp } from 'vue'
import '@/assets/global.css'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'


const app = createApp(App)
app.use(router)

// Create Event Bus For App
const bus = mitt()
app.config.globalProperties.$bus = bus

app.mount('#app')
