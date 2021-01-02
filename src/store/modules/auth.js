import Vue from 'vue'
import axios from 'axios';
import jwt from 'jsonwebtoken'
import axiosInstance from '@/services/axios'
import { rejectError } from '@/helpers'

function checkTokenValidity(token) {
  if (token) {
    const decodedToken = jwt.decode(token)
    //exp is expiration time of token. 
    /**exp token saxlanilan objectde yerlesir */
    return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
  }

  return false
}
import { auth } from 'firebase-admin';
export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
  },
  getters: {
    authUser(state) {
      return state.user || null
    },
    isAuthenticated(state) {
      //!! this return true or false depending on state of a user
      /** if uesr is null this will return false, if user has value yeni authenticatedç this üill return true */
      return !!state.user
    },
    //this means getter returns meetupCreatorId function - ES6 syntax
    /*isMeetupOwner: function(state) {
      return function(meetupCreatorId) {}
    }*/
    isMeetupOwner: (state) => (meetupCreatorId) => {
      //if user is not present in state, return false
      //this function means i am not meetup owner if don't have user in state
      if (!state.user) return false
      return state.user._id === meetupCreatorId
    },
    isMember: (state) => (meetupId) => {
      /** deyek ki user.joinedMeetups = [1, 2. 3]. biz de meetupId functionda 2ni aliriq. 
          evvel baxir ki user var ya yox, sonra joinedmeetup olub olmamagina baxir, sonra da joinedmeetupda da 2 varsa true return edir
          bu da demekdi ki, member-em ve meetup-a join ede bilerem*/

      /** app-de login ol, basqasinin yaratdigi ve ya oz meetup-ina gir, vue instance PageMeetupDetail klikle, 
          computed propertylerde true falselara bax, basa dusersen*/
      return state.user &&
        state.user['joinedMeetups'] &&
        state.user['joinedMeetups'].includes(meetupId)
    }
  },
  actions: {
    loginWithEmailAndPassword(context, userData) {
      return axios.post('/api/v1/users/login', userData).then(res => {
        //authenticated user
        const user = res.data
        //get token
        localStorage.setItem('meetuper-jwt', user.token)
        context.commit('setAuthUser', user)
      })
        .catch(err => rejectError(err))
    },
    registerUser(context, userData) {
      return axios.post('/api/v1/users/register', userData)
        .catch(err => rejectError(err))
    },
    logout({ commit }) {
      // For Session Authnetication !
      //deleted  bacuse we now dont need to send request to a server to remove our session
      // return axios.post('/api/v1/users/logout')
      //   .then((res) => {
      //     commit('setAuthUser', null)
      //     return true
      //   })
      //   .catch((err) => {
      //     return err
      //   })
      return new Promise((resolve) => {
        localStorage.removeItem('meetuper-jwt')
        commit('setAuthUser', null)
        resolve(true)
      })
    },
    /**app.vue-da request gonderirik */
    /** her defe ferqli sehifelere kecende /api/v1/users/me-den login olan userin melumatini gonderir(network tabdan bax)
     * ona gore de getAuthUsere gettersi elave edirik ki eger authuser varsa, bir de axiosla get etmesin
     */
    // getAuthUser({ commit }) {
    getAuthUser({ commit, getters }) {
      const authUser = getters['authUser']
      /* authUser promise olaraq qaytarmaliyiq. cunki  router/index-de authUser is expecting to get promise*/
      // if (authUser) { return Promise.resolve(authUser) }
      const token = localStorage.getItem('meetuper-jwt')
      const isTokenValid = checkTokenValidity(token)

      if (authUser && isTokenValid) { return Promise.resolve(authUser) }
      /**logout edib yeniden evvelki sehifeye qayidanda yene login olur.cunki user melumati cachde qalir
       * bunun olmamasi ucun bu kod yazilir
       */
      const config = {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
      // return axios.get('/api/v1/users/me', config)
      return axiosInstance.get('/api/v1/users/me', config)
        .then((res) => {
          const user = res.data
          localStorage.setItem('meetuper-jwt', user.token)
          commit('setAuthUser', user)
          commit('setAuthState', true)
          return user
        })
        .catch(err => {
          commit('setAuthUser', null)
          commit('setAuthState', true)
          return err
        })
    },
    addMeetupToAuthUser({ commit, state }, meetupId) {
      //getting user joinedmeetups. this will be array of meetups. for ex: ['1','2','3']
      /** joinedMeetups-a meetupin id-sini elave edir ve userMeetupsa beraber edir. user meetups ancaq join olan meetuplarin idlerinden ibaretdir */
      const userMeetups = [...state.user['joinedMeetups'], meetupId]
      //now we have new userMeetups collection updated with meetupid we just joined, we add it to authuser
      commit('setMeetupsToAuthUser', userMeetups)
    },
    removeMeetupFromAuthUser({ commit, state }, meetupId) {
      const userMeetupsIds = [...state.user['joinedMeetups']]
      //looking for index of meetup we want remove
      /**userMeetupIds-in her birinin, yeni iserMeetupId-nin indexine baxir. meetupId-ye beraberdise true qaytarir ve indexe beraber edir */
      const index = userMeetupsIds.findIndex(userMeetupId => userMeetupId === meetupId)

      //now we have index and can remove it
      //starting from index and 1 element
      userMeetupsIds.splice(index, 1)
      commit('setMeetupsToAuthUser', userMeetupsIds)
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return state.user = user
    },
    setAuthState(state, authState) {
      return state.isAuthResolved = authState
    },
    setMeetupsToAuthUser(state, meetups) {
      //we add meetups to state.user under key joinedMeetups
      return Vue.set(state.user, 'joinedMeetups', meetups)
    }
  }
}