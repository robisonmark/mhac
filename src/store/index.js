import Vue from 'vue'
import Vuex from 'vuex'
// import EventBus from '../eventbus'
// import { make, call } from 'vuex-pathify'
// import { make } from 'vuex-pathify'
// import pathify from '../config/store.pathify'

// Modules
// import es from './modules/store.es'
// import auth from './modules/store.auth'
// import form from './modules/store.form'

Vue.use(Vuex)

const namespaced = true
// const modules = { auth }
// const plugins = [ pathify.plugin ]
// const strict = process.env.NODE_ENV !== 'production'
const strict = false

const state = {
  user: {},
  userGroups: [],
  userAttributes: Object,
  loaded: false,
  authenticated: false,
  seasons: [],
  configOptions: [],
  readWriteAccess: String
}

const mutations = {
  // make.mutations(state)
  set_user (state, payload) {
    state.user = payload
  },
  set_userGroups (state, payload) {
    state.userGroups = payload
  },
  set_userAttributes (state, payload) {
    console.log(state)
    console.log(payload)
  },
  set_loaded (state, payload) {
    state.loaded = payload
  },
  set_authenticated (state, payload) {
    console.log(state)
    console.log(payload)
  },
  set_seasons (state, payload) {
    state.seasons = payload
  },
  set_configOptions (state, payload) {
    console.log(state)
    console.log(payload)
  },
  set_readWriteAccess (state, payload) {
    state.readWriteAccess = payload
  }
}

const actions = {
  // ...make.actions(state),

  setLoaded (context, payload) {
    context.commit('set_loaded', payload)
  },

  readWriteAccess (context, payload) {
    context.commit('set_readWriteAccess', payload)
  },

  setSeasons (context, payload) {
    context.commit('set_seasons', payload)
  },

  load (context) {
    // ---- These events are emitted once the listed module is loaded ----- //
    // Loads the vuex "es" module (Elastic Search) [MUST BE AFTER AUTH]
    // EventBus.$on('auth/loaded', () => context.dispatch('es/load'))
  }
}

const getters = {
  // make.getters(state)
  user (state) {
    return state.user
  },
  userGroups (state) {
    return state.userGroups
  },
  userAttributes (state) {
    return state.userAttributes
  },
  loaded (state) {
    return state.loaded
  },
  authenticated (state) {
    return state.authenticated
  },
  seasons (state) {
    return state.seasons
  },
  configOptions (state) {
    return state.groups
  }
}

export const store = new Vuex.Store({
  state,
  strict,
  actions,
  // modules,
  getters,
  mutations,
  namespaced
})
