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
      /**return yazmayanda promise return elemir deye PageHome-da fetchcategories-e then() elave edende data qaytarmir */
      return axios.get("/api/v1/categories").then((res) => {
        const categories = res.data;
        /**setItems-leri burda cagiririq amma setItem index.js-in mutationdadir. 
         * root: true yazaraq, index.js-deki mutation-i cagiririq */
        commit('setItems', { resource: 'categories', items: categories }, { root: true })
        // return state.categories
        return state.items
      });
    },
  },
  mutations: {

  }
}