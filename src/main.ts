import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'

import './styles/index.less'
import 'ant-design-vue/dist/reset.css'
import { store } from '@/stores'

const app = createApp(App)
app.use(Antd)
app.use(store)
app.use(router)

app.mount('#app')
