import axios from 'axios';
export default {
  namespaced: true,
  state: {
    user: {}
  },
  getter: {

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
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return state.user = user
    }
  }
}