import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {MdButton, MdIcon, MdCard, MdDialog, MdField} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import './registerServiceWorker'
 
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdCard)
Vue.use(MdDialog)
Vue.use(MdField)

new Vue({
  render: h => h(App)
}).$mount('#app')
