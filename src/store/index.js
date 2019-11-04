import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  state: {
    host: 'http://127.0.0.1:8000',
    categories: null,
    jewelTypes: null,
    items: null
  },
  mutations: {
    setCategories: (state, payload) => {
      state.categories = payload
    },
    setJewelTypes: (state, payload) => {
      state.jewelTypes = payload
    },
    addCategory: (state, payload) => {
      state.categories.push(payload)
    },
    addJewelType: (state, payload) => {
      state.jewelTypes.push(payload)
    },
    setItems: (state, payload) => {
      state.items = payload
    },
    addItem: (state, payload) => {
      state.items.push(payload)
    }
  },
  actions: {
    setCategories: (context, payload) => {
      context.commit('setCategories', payload);
    },
    setJewelTypes: (context, payload) => {
      context.commit('setJewelTypes', payload)
    },
    addCategory: (context, payload) => {
      context.commit('addCategory', payload)
    },
    addJewelType: (context, payload) => {
      context.commit('addJewelType', payload)
    },
    setItems: (context, payload) => {
      context.commit('setItems', payload)
    },
    addItem: (context, payload) => {
      context.commit('addItem', payload)
    }
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})



