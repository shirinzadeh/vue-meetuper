import axios from 'axios'

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
      axios.get("/api/v1/meetups").then((res) => {
        const meetups = res.data;
        commit('setItems', { resource: 'meetups', items: meetups }, { root: true })
        return state.meetups
      });
    },
    fetchMeetupById({ state, commit }, meetupId) {
      /**modulesdan evvel commit-deki resource: meetup idi, cunki store statede meetup objecti yaratmisdiq ve resource-umuz meetup object idi.
       * ancaq modulesdan sonra meetup-i da meetups modulu daxilinde yazdigimiza gore, resource-umuz meetups modules olur ve buna gore
        commit-deki resource-u da meetups etmeliyik*/
      commit('setItem', { resource: 'meetups', item: {} }, { root: true })
      axios.get(`/api/v1/meetups/${meetupId}`).then((res) => {
        const meetup = res.data;
        commit('setItem', { resource: 'meetups', item: meetup }, { root: true })
        return state.meetup = meetup
      });
    },
  },
  mutations: {

  }
}