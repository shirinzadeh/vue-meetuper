/**Routing appde sehifeni refresh etmeden basqa sehifelere kecmek ucundur 
 * Route-u main.jsde de import edib, Vue instance-a (new Vue-ya) router yazmaq lazimdir.
 *  ardiyca app.vue templatede PageHome silinerek <router-view> yazilmalidir
*/
import Vue from 'vue'
import Router from 'vue-router'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageMeetupFind from '@/pages/PageMeetupFind'
import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'
import PageNotFound from '@/pages/PageNotFound'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: "PageHome",
      component: PageHome
    },
    {
      /**urlde localhost:8080/meetups/453538534 yeni hansisa bir id yazanda page meetupdetail sehifesine yonlenir.
       * :id yerine istediyimiz sey yaza bilerik,amma ancaq onu urlde daxil edende  pagemeetupdetaile girecek. 
       * Her meetupin ferqli id-si olduguna gore :id yazilmalidir
       */
      path: '/meetups/:id',
      name: 'PageMeetupDetail',
      component: PageMeetupDetail
    },
    {
      path: '/find',
      name: 'PageMeetupFind',
      component: PageMeetupFind
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister
    },
    {
      path: '*',
      name: "PageNotFound",
      component: PageNotFound
    }
  ],
  //default mode is hash. 
  /**hash modeda url-de # olur. # olmamasi ucun history */
  mode: 'history'
})

export default router