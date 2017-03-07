import Vue from 'vue'
import App from './App.vue'

// use bootstrap3
import 'bootstrap/dist/css/bootstrap.css'

// use eliment ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

new Vue(App).$mount('#app')
