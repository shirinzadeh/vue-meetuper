import axios from 'axios';
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
    }
  },
  actions: {
    loginWithEmailAndPassword(context, userData) {
      return axios.post('/api/v1/users/login', userData).then(res => {
        //authenticated user
        const user = res.data
        context.commit('setAuthUser', user)
      })
    },
    registerUser(context, userData) {
      return axios.post('/api/v1/users/register', userData)
    },
    /**app.vue-da request gonderirik */
    getAuthUser({ commit }) {
      return axios.get('/api/v1/users/me')
        .then((res) => {
          const user = res.data
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
    logout({ commit }) {
      axios.post('/api/v1/users/logout')
        .then((res) => {
          commit('setAuthUser', null)
          return true
        })
        .catch((err) => {
          return err
        })
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return state.user = user
    },
    setAuthState(state, authState) {
      return state.isAuthResolved = authState
    }
  }
}