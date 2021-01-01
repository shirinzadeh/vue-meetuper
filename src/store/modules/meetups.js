import axios from 'axios'
import axiosInstance from '@/services/axios'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
    /**ona gore items[] ve item{} yazildi ki, eger meetups[] ve meetup{} yazilsa, olara erismek ucun
      state.meetups.meetups ve state.meetups.meetup yazmaliyiq. state-den sonraki meetups modulun adidi. 
      bele qeseng gorsenmediyi ucun item yaziriq*/
  },
  getters: {

  },
  actions: {
    fetchMeetups({ state, commit }) {
      /**setItems-leri burda cagiririq amma setItem index.js-in mutationdadir. 
        *root: true yazaraq, index.js-deki mutation-i cagiririq */
      commit('setItems', { resource: 'meetups', items: {} }, { root: true })
      /**return yazmayanda promise return elemir deye PageHome-da fetchcategories-e then() elave edende data qaytarmir */
      return axios.get("/api/v1/meetups").then((res) => {
        const meetups = res.data;
        commit('setItems', { resource: 'meetups', items: meetups }, { root: true })
        // return state.meetups
        return state.items
      });
    },
    fetchMeetupById({ state, commit }, meetupId) {
      /**modulesdan evvel commit-deki resource: meetup idi, cunki store statede meetup objecti yaratmisdiq ve resource-umuz meetup object idi.
       * ancaq modulesdan sonra meetup-i da meetups modulu daxilinde yazdigimiza gore, resource-umuz meetups modules olur ve buna gore
        commit-deki resource-u da meetups etmeliyik*/
      commit('setItem', { resource: 'meetups', item: {} }, { root: true })
      return axios.get(`/api/v1/meetups/${meetupId}`).then((res) => {
        const meetup = res.data;
        commit('setItem', { resource: 'meetups', item: meetup }, { root: true })
        return state.item
      });
    },
    createMeetup({ rootState }, meetupToCreate) {
      /**server/models/meetup-daki meetupCreatordu */
      //meetupCreator is authenticated user
      meetupToCreate.meetupCreator = rootState.auth.user
      /** regex expression yazanda - locationa Lisboan, PT yazilanda bazaya lisboanpt kimi gonderir] */
      meetupToCreate.processedLocation = meetupToCreate.location.toLowerCase().replace(/[\s,]+/g, '').trim()

      return axiosInstance.post('/api/v1/meetups', meetupToCreate)
        .then(res => res.data)
    }
  },
  mutations: {

  }
}