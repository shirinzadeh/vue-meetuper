import Vue from 'vue'
import App from './App.vue'
import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'

import moment from 'moment'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)

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

new Vue({
  render: h => h(App),
}).$mount('#app')
