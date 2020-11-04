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
    // console.log("payload",payload)
    state.user.team_id = payload.team_id
    state.user.slug = payload.slug
  },
  set_teamAssocLvl (state, payload) {
    state.teamAssocLvl = payload
  },
  set_userGroups (state, payload) {
    state.userGroups = payload
  },
  set_userAttributes (state, payload) {
    console.log("userAttributes", state)
    console.log("userAttributes", payload)
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
    // console.log("set_teams", payload)
    state.teams = payload
  },
  set_levels (state, payload) {
    state.levels = payload
  },
  set_configOptions (state, payload) {
    console.log("configOptions", state)
    console.log("configOptions", payload)
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

  async setSeasons (context, payload) {
    await api.getCurrentSeasons().then(response => {
      context.commit('set_seasons', response.data)
    })
  },

  async setTeams (context) {
    await api.getTeams().then(response => {
      context.commit('set_teams', response.data)
    })
  },

  async setTeam (context, payload) {
    await context.dispatch('setTeams')
    const groups = store.getters.userGroups
    const teams = store.getters.teams

    let userTeam = []

    if (payload) {
      userTeam = teams.filter(team => payload === team.slug)
      console.log(userTeam)
    } else if (groups) {
      userTeam = teams.filter(team => {
        if (!groups.includes('Admin')) {
          return team.slug === groups[0]
        } else {
          return team
        }
      })
      console.log(userTeam)
    }
    if (userTeam.length === 1) {
      context.commit('set_user', userTeam[0])
    }
  },

  async setLevels (context, payload) {
    await api.getLevels().then(response => {
      context.commit('set_levels', response.data)
    })
  },

  async setFullSchedule (context, payload) {
    await api.getSchedule().then(response => {
      const fixedData = []
      response.data.forEach(game => {
        if (game.game_time === '12:00 AM ') {
          game.game_time = 'TBD'
        }
        fixedData.push(game)
      })
      context.commit('set_fullSchedule', fixedData)
    })
  },

  load (context) {
    // ---- These events are emitted once the listed module is loaded ----- //
    // Loads the vuex "es" module (Elastic Search) [MUST BE AFTER AUTH]
    // EventBus.$on('auth/loaded', () => context.dispatch('es/load'))
  }
}

const getters = {
  // make.getters(state)
  user () {
    return state.user
  },
  team () {
    // console.log("team", state.user)
    return state.user.slug
  },
  teams (state) {
    return state.teams
  },
  levels () {
    return state.levels
  },
  schedule () {
    return state.fullSchedule
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
