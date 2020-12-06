import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchThreads({ state, commit }, meetupId) {
      /**setItems-leri burda cagiririq amma setItem index.js-in mutationdadir. 
       * root: true yazaraq, index.js-deki mutation-i cagiririq */
      commit('setItems', { resource: 'threads', items: {} }, { root: true })
      /**return yazmayanda promise return elemir deye PageHome-da fetchcategories-e then() elave edende data qaytarmir */
      return axios.get(`/api/v1/threads?meetupId=${meetupId}`).then((res) => {
        const threads = res.data;
        // commit('setThreads', threads)
        commit('setItems', { resource: 'threads', items: threads }, { root: true })
        // return state.threads
        return state.items
      });
    }
  },
  mutations: {

  }
}