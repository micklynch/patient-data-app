import Vue from 'vue'
import VueRouter from 'vue-router'
import { MdButton, MdIcon, MdCard, MdDialog, MdField } from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import './registerServiceWorker'

import App from './App.vue'
import ConnectPage from './components/ConnectPage'
import PatientView from './components/PatientView'

Vue.config.productionTip = false
Vue.use(MdButton)
Vue.use(MdIcon)
Vue.use(MdCard)
Vue.use(MdDialog)
Vue.use(MdField)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'patientview',
    component: PatientView
  },
  { 
    path: '/connectpage',
    name: 'connectpage',
    component: ConnectPage,
    props: true
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
