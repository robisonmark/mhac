import Vue from 'vue'
import Vuex from 'vuex'

// api
import { api } from '@/api/endpoints.js'

// Modules
import auth from './modules/store.auth'

Vue.use(Vuex)

const namespaced = true
const modules = { auth }
const strict = false

const state = {
  user: {
    team_id: String,
    slug: String
  },
  userData: {},
  teamAssocLvl: {},
  userGroups: [],
  userAttributes: Object,
  loaded: false,
  authenticated: '',
  seasons: [],
  teams: [],
  levels: [],
  fullSchedule: [],
  configOptions: [],
  readWriteAccess: String
}

const mutations = {
  // make.mutations(state)
  set_user (state, payload) {
    state.user = payload
  },
  set_teamAssocLvl (state, payload) {
    state.teamAssocLvl = payload
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
    state.authenticated = payload
  },
  set_seasons (state, payload) {
    state.seasons = payload
  },
  set_teams (state, payload) {
    state.teams = payload
  },
  set_levels (state, payload) {
    state.levels = payload
  },
  set_configOptions (state, payload) {
    console.log(state)
    console.log(payload)
  },
  set_readWriteAccess (state, payload) {
    state.readWriteAccess = payload
  },
  set_fullSchedule (state, payload) {
    state.fullSchedule = payload
  }
}

const actions = {
  setUser (context, payload) {
    context.commit('set_user', payload)
  },

  setTeamAssocLvl (context, payload) {
    context.commit('set_teamAssocLvl', payload)
  },

  setAuth (context, payload) {
    context.commit('set_authenticated', payload)
  },

  setLoaded (context, payload) {
    context.commit('set_loaded', payload)
  },

  readWriteAccess (context, payload) {
    context.commit('set_readWriteAccess', payload)
  },

  setSeasons (context, payload) {
    context.commit('set_seasons', payload)
  },

  async setTeams (context) {
    await api.getTeams().then(response => {
      context.commit('set_teams', response.data)
    })
  },

  setLevels (context, payload) {
    context.commit('set_levels', payload)
  },

  setFullSchedule (context, payload) {
    context.commit('set_fullSchedule', payload)
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
  team () {
    return state.teams[0].slug
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
  modules,
  getters,
  mutations,
  namespaced
})
