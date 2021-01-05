import Vue from 'vue'
import App from './App.vue'
import router from './router'/**faylin adi index.js olduguna gore, ./router/index.js yazmaga ehtiyac yoxdur. cunki avtomatik import edir */
import store from './store'
import vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'
import io from 'socket.io-client'

import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import AppSpinner from './components/shared/AppSpinner'

import moment from 'moment'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner', AppSpinner)

Vue.use(vuelidate)
Vue.use(Toasted)

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// For formatting date in meetup
/**filterde ikinci verdiyimiz deyeri manual olaraq componentde filteri yazdigimiz yerde girirk
 * formatType="LL" formatypein default deyeridir. eger componentde formattype-a hansisa deyer girmesek, deyer LL olacaq.
 * burda meetup.startDate filterin value-su olur.
 */
Vue.filter('formatDate', function (value, formatType = "LL") {
  if (!value) return ''
  return moment(value).format(formatType)
})

// io('http://localhost:3001')
const socket = io('http://localhost:3001')

new Vue({
  data() {
    return {
      socket
    }
  },
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')
