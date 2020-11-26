import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchCategories({ state, commit }) {
      axios.get("/api/v1/categories").then((res) => {
        const categories = res.data;
        /**setItems-leri burda cagiririq amma setItem index.js-in mutationdadir. 
         * root: true yazaraq, index.js-deki mutation-i cagiririq */
        commit('setItems', { resource: 'categories', items: categories }, { root: true })
        return state.categories
      });
    },
  },
  mutations: {

  }
}