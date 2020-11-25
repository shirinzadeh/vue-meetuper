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
    meetups(state) {
      return state.meetups
    },
    categories(state) {
      return state.categories
    }
  },
  //Actions are like methods in vue components. They should not mutate the state
  //Very good spot to fetch the data. Action call usually resolve into data
  actions: {
    //Actions expose context object and on context we have couple of useful functions 
    fetchMeetups(context) {
      axios.get("/api/v1/meetups").then((res) => {
        const meetup = res.data;
        //calling mutation functions
        context.commit('setMeetup', meetup)
      });
    },
    fetchCategories(context) {
      axios.get("/api/v1/categories").then((res) => {
        const categories = res.data;
        context.commit('setCategories', categories)
      });
    }
  },
  //Simple functions to mutate a state
  mutations: {
    //Mutation expose state and second argument is value
    setMeetup(state, meetup) {
      state.meetups = meetup
    },
    setCategories(state, categories) {
      state.categories = categories
    },
  }
})