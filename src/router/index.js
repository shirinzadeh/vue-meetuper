/**Routing appde sehifeni refresh etmeden basqa sehifelere kecmek ucundur 
 * Route-u main.jsde de import edib, Vue instance-a (new Vue-ya) router yazmaq lazimdir.
 *  ardiyca app.vue templatede PageHome silinerek <router-view> yazilmalidir
*/
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageMeetupFind from '@/pages/PageMeetupFind'
import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'
import PageSecret from '@/pages/PageSecret'
import PageNotFound from '@/pages/PageNotFound'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: "PageHome",
      component: PageHome
    },
    {
      path: '/find',
      name: 'PageMeetupFind',
      component: PageMeetupFind
    },
    {
      path: '/meetups/secret',
      name: 'PageSecret',
      component: PageSecret,
      //this function is executed before yoou will enter secret page
      //to object contains page you navigate to
      //from contains page you navigating from
      //next when this function is executed you navigate to page
      meta: { onlyAuthUser: true }

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
      path: '/login',
      name: 'PageLogin',
      component: PageLogin,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/401',
      name: 'PageNotAuthenticated',
      component: PageNotAuthenticated
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

router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser')
    .then(() => {
      const isAuthenticated = store.getters['auth/isAuthenticated']
      if (to.meta.onlyAuthUser) {
        if (isAuthenticated) {
          next()
        } else {
          next({ name: 'PageNotAuthenticated' })
        }
      } else if (to.meta.onlyGuestUser) {
        if (isAuthenticated) {
          next({ name: 'PageHome' })
        }
        else {
          next()
        }
      }
      else {
        next()
      }
    })
})
export default router