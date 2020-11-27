import Vue from 'vue'
import Vuex from 'vuex'

import meetups from './modules/meetups'
import categories from './modules/categories'
import threads from './modules/threads'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  /** MODULES ELAVE EDENDEN SONRA SADECE MUTATIONS FUNCTION SAXLAYIB, QALANLARI SILIRIK */
  //in state we are keepong our data we are sharing with our components
  // state: {
  //   meetups: [],
  //   categories: [],
  //   meetup: {},
  //   threads: [],
  // },
  modules: {
    meetups,
    categories,
    threads,
    auth
  },

  //getters are like computed properties.Simple functions to get state
  // getters: {
  //   //getters expose state
  // },

  //Actions are like methods in vue components. They should not mutate the state
  //Very good spot to fetch the data. Action call usually resolve into data
  // actions: {

  //Actions expose context object and on context we have couple of useful functions 
  /**her defe context.commit, context.state yazmamaq ucun contextin yerine {state, commit} giririk */
  // fetchMeetups({ state, commit }) {
  //   /**bir threade girib, cixib o birine girende, datanin yuklenmesi ucun xirda bir zaman kecir. 
  //    * ona gore basqa threade girende evvel onceki girdiyimiz thread gorsenir,xirda zaman sonra girdiyimiz thread gorsenir.
  //    * bunun olmamasi ucun meetups-a, meetup-a ve threadse axiosdan evvel commit() girib, iteme { } vermek lazimdir */
  //   commit('setItems', { resource: 'meetups', items: {} })
  //   axios.get("/api/v1/meetups").then((res) => {
  //     const meetups = res.data;
  //     //calling mutation functions
  //     // commit('setMeetups', meetups)
  //     commit('setItems', { resource: 'meetups', items: meetups })
  //     return state.meetups
  //   });
  // },
  // fetchCategories({ state, commit }) {
  //   axios.get("/api/v1/categories").then((res) => {
  //     const categories = res.data;
  //     // commit('setCategories', categories)
  //     commit('setItems', { resource: 'categories', items: categories })
  //     return state.categories
  //   });
  // },
  // //second argument is data which we sent from dispatch()
  // fetchMeetupById({ state, commit }, meetupId) {
  //   commit('setItem', { resource: 'meetup', item: {} })
  //   axios.get(`/api/v1/meetups/${meetupId}`).then((res) => {
  //     const meetup = res.data;
  //     // commit('setMeetup', meetup)
  //     commit('setItem', { resource: 'meetup', item: meetup })
  //     return state.meetup = meetup
  //   });
  // },
  // fetchThreads({ state, commit }, meetupId) {
  //   commit('setItems', { resource: 'threads', items: {} })
  //   axios.get(`/api/v1/threads?meetupId=${meetupId}`).then((res) => {
  //     const threads = res.data;
  //     // commit('setThreads', threads)
  //     commit('setItems', { resource: 'threads', items: threads })
  //     return state.threads
  //   });
  // }
  // },
  //Simple functions to mutate a state
  mutations: {
    //Mutation expose state and second argument is value
    /** items datadir. tekce (state, items ) yazsaq, itemsi neye beraber edeceyimiz bilinmeyecek. state.items=items sehcdir. 
     * cunki stateden soraki data deyil, data ile doldurmali oldugumuz arraydir, yeni resource-dur. ona gore resource da elave edilmelidir 
     * resource da meetups, threads, categories, meetupdir. */
    // setMeetups(state, meetups) {
    //   state.meetups = meetups
    // },
    // setCategories(state, categories) {
    //   state.categories = categories
    // },
    // setMeetup(state, meetup) {
    //   state.meetup = meetup
    // },
    // setThreads(state, threads) {
    //   state.threads = threads
    // }
    /**adlarda falan deyisiklik etdiyimiz zaman hem mutationda, hem actionda adi axtarib deyisdirmek yerine, setItems() yaradaraq,
    * sadece actionsda deyisiklik etmek kifayetdir.
    */
    setItems(state, { resource, items }) {
      /** artiq datalar store.state-de yox, modullarda items icindedi. ona gore asagidaki kodu da deyismeliyik 
       * artiq [resource] modules{}dur. modules{}-daki categories,meetups,threadsdi. .item ve .items yazaraq da hemin modulesdaki datalari aliriq
      */
      // state[resource] = items
      state[resource].items = items
    },
    setItem(state, { resource, item }) {
      // state[resource] = item
      state[resource].item = item
    },
  }
})