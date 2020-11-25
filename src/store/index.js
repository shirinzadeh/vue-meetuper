import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  //in state we are keepong our data we are sharing with our components
  state: {
    meetups: [],
    categories: [],
    meetup: {},
    threads: [],
  },
  //getters are like computed properties.Simple functions to get state
  getters: {
    //getters expose state
  },
  //Actions are like methods in vue components. They should not mutate the state
  //Very good spot to fetch the data. Action call usually resolve into data
  actions: {
    //Actions expose context object and on context we have couple of useful functions 
    /**her defe context.commit, context.state yazmamaq ucun contextin yerine {state, commit} giririk */
    fetchMeetups({ state, commit }) {
      axios.get("/api/v1/meetups").then((res) => {
        const meetups = res.data;
        //calling mutation functions
        commit('setMeetups', meetups)
        return state.meetups
      });
    },
    fetchCategories({ state, commit }) {
      axios.get("/api/v1/categories").then((res) => {
        const categories = res.data;
        commit('setCategories', categories)
        return state.categories
      });
    },
    //second argument is data which we sent from dispatch()
    fetchMeetupById({ state, commit }, meetupId) {
      axios.get(`/api/v1/meetups/${meetupId}`).then((res) => {
        const meetup = res.data;
        commit('setMeetup', meetup)
        return state.meetup = meetup
      });
    },
    fetchThreads({ state, commit }, meetupId) {
      axios.get(`/api/v1/threads?meetupId=${meetupId}`).then((res) => {
        const threads = res.data;
        commit('setThreads', threads)
        return state.threads
      });
    }
  },
  //Simple functions to mutate a state
  mutations: {
    //Mutation expose state and second argument is value
    setMeetups(state, meetups) {
      state.meetups = meetups
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setMeetup(state, meetup) {
      state.meetup = meetup
    },
    setThreads(state, threads) {
      state.threads = threads
    }
  }
})