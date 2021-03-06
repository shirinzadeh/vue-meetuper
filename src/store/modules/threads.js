import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/services/axios'

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
    },
    postThread({ commit, state }, { title, meetupId }) {
      const thread = {}
      thread.title = title
      thread.meetup = meetupId

      return axiosInstance.post('/api/v1/threads', thread)
        .then(res => {
          const createdThread = res.data
          /** items-da 3dene thread varsa indexleri [0,1,2] olur. index-i items.lengthe beraber edende, index 3 olur. 
              belelikle, yeni threadi items arrayin 3cu indexine elave edirik. [0,1,2,3]
          */
          const index = state.items.length

          commit('addItemToArray', { item: createdThread, index, resource: 'threads' }, { root: true })
          return createdThread
        })
    },
    sendPost({ commit, state, dispatch }, { text, threadId }) {
      const post = { text, thread: threadId }

      return axiosInstance.post('/api/v1/posts', post).then(res => {
        const createdPost = res.data
        dispatch('addPostToThread', { post: createdPost, threadId })
        return createdPost
      })
    },
    addPostToThread({ commit, state }, { post, threadId }) {
      const threadIndex = state.items.findIndex(thread => thread._id === threadId)

      if (threadIndex > -1) {
        const posts = state.items[threadIndex].posts
        /**postu arrayin evveline elave edir deye, yazilan postlar sen edende en ustde gorsenir */
        posts.unshift(post)
        commit('savePostToThread', { posts, index: threadIndex })
      }
    },
  },
  mutations: {
    savePostToThread(state, { posts, index }) {
      Vue.set(state.items[index], 'posts', posts)
    }
  }
}