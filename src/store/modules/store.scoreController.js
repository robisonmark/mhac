/* eslint-disable no-return-assign */
import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'
// TODO: Create a Persistent Source

// api
import { api } from '@/api/endpoints.js'

Vue.use(Vuex)

const namespaced = false
// const modules = { auth }
const strict = false

const gameConfig = {
  '12U': {
    fouls_bonus: 7,
    fouls_double_bonus: 10,
    overtime: {
      minutes: 3,
      seconds: 0,
      tenth_seconds: 0
    },
    time: {
      minutes: 6,
      seconds: 0,
      tenth_seconds: 0
    },
    timeouts: 5
  },
  '14U': {
    fouls_bonus: 7,
    fouls_double_bonus: 10,
    overtime: {
      minutes: 3,
      seconds: 0,
      tenth_seconds: 0
    },
    time: {
      minutes: 6,
      seconds: 0,
      tenth_seconds: 0
    },
    timeouts: 5
  },
  '16U': {
    fouls_bonus: 7,
    fouls_double_bonus: 10,
    overtime: {
      minutes: 3,
      seconds: 0,
      tenth_seconds: 0
    },
    time: {
      minutes: 7,
      seconds: 0,
      tenth_seconds: 0
    },
    timeouts: 5
  },
  '18U': {
    fouls_bonus: 7,
    fouls_double_bonus: 10,
    overtime: {
      minutes: 4,
      seconds: 0,
      tenth_seconds: 0
    },
    time: {
      minutes: 8,
      seconds: 0,
      tenth_seconds: 0
    },
    timeouts: 5
  }
}

// TODO ablity to configure time & max fouls
const state = {
  score: {
    home: 0,
    away: 0
  },
  fouls: {
    home: 0,
    away: 0
  },
  timeouts: {
    home: 5,
    away: 5
  },
  away_team_slug: 'life_christian',
  home_team_slug: 'covenant_christian',
  period: 1,
  possession: '',
  period_time: 6,
  clock: {
    time: 8 * 60,
    running: false
  },
  editable: false,
  websocket: '',

  half: false,
  final: false,

  time_remaining: {
    minutes: 8,
    seconds: 0,
    tenth_seconds: 0
  },

  gameConfig: {
    fouls_bonus: 7,
    fouls_double_bonus: 10,
    overtime: {
      minutes: 3,
      seconds: 0,
      tenth_seconds: 0
    },
    time: {
      minutes: 6,
      seconds: 0,
      tenth_seconds: 0
    },
    timeouts: 5
  }
}

let intervalID

const mutations = {
  // away team
  setAwayTeam: (state, payload) => state.away_team_slug = payload,
  setAway: (state, payload) => state.score.away = payload,
  setAwayFouls: (state, payload) => state.fouls.away = payload,
  incrementAway: (state, payload) => state.score.away += payload,
  decrementAway: (state) => state.score.away && state.score.away--,
  incrementAwayFouls: (state) => state.fouls.away++,
  decrementAwayFouls: (state) => state.fouls.away && state.fouls.away--,
  decrementAwayTimeouts: (state) => state.timeouts.away && state.timeouts.away--,

  // home team
  setHomeTeam: (state, payload) => state.home_team_slug = payload,
  setHome: (state, payload) => state.score.home = payload,
  setHomeFouls: (state, payload) => state.fouls.home = payload,
  incrementHome: (state, payload) => state.score.home += payload,
  decrementHome: (state) => state.score.home && state.score.home--,
  incrementHomeFouls: (state) => state.fouls.home++,
  decrementHomeFouls: (state) => state.fouls.home && state.fouls.home--,
  decrementHomeTimeouts: (state) => state.timeouts.home && state.timeouts.home--,

  // game config
  setPeriod: (state, payload) => state.period = payload,
  setClock: (state, running) => state.clock.running = running,
  setHalf: (state) => state.half = !state.half,
  setFinal: (state) => state.final = !state.final,
  setTime: (state, time) => {
    console.log('Muttations', time)
    state.time_remaining.minutes = time.minutes
    state.time_remaining.seconds = time.seconds
    state.time_remaining.tenth_seconds = time.tenth_seconds
  },
  setPossession: (state, value) => state.possession = value,
  toggleClock: (state, payload) => state.clock.running = payload,
  incrementPeriod: (state) => state.period++,
  decrementPeriod: (state) => {
    if (state.period > 1) {
      state.period && state.period--
    }
  },

  resetFouls: (state, payload) => {
    state.fouls.home = payload
    state.fouls.away = payload
  },

  toggleEditable: (state) => state.editable = !state.editable,

  // Stream Config
  setWebSocket: (state, payload) => state.websocket = payload,
  setGameConfig: (state, payload) => {
    state.gameConfig = payload
  }
}

const actions = {
  decrementHomeFouls (context, payload) {
    context.commit('decrementHomeFouls', payload)
  },
  decrementAwayFouls (context, payload) {
    context.commit('decrementAwayFouls', payload)
  },
  decrementHomeTimeouts (context, payload) {
    context.commit('decrementHomeTimeouts', payload)
  },
  decrementAwayTimeouts (context, payload) {
    context.commit('decrementAwayTimeouts', payload)
  },
  setAwayTeam (context, payload) {
    context.commit('setAwayTeam', payload)
  },
  setHomeTeam (context, payload) {
    context.commit('setHomeTeam', payload)
  },

  startClock ({ commit, dispatch }) {
    commit('setClock', true)

    // intervalID = setInterval(() => dispatch('updateClock', -1), 1000)
  },
  stopClock ({ commit }) {
    commit('setClock', false)

    clearInterval(intervalID)
  },
  toggleClock ({ state, dispatch }) {
    if (state.clock.running) {
      dispatch('stopClock')
    } else {
      dispatch('startClock')
    }
  },
  updateClock ({ state, commit, dispatch }, amount) {
    const time = state.clock.time + amount

    if (time < 0) {
      commit('setTime', 0)
      // dispatch('playBuzzer')
      return dispatch('stopClock')
    }

    commit('setTime', time)
  },
  incrementClock ({ getters, commit }) {
    const time = getters.minutes + 1
    commit('setTime', time * 60)
  },
  decrementClock ({ getters, commit }) {
    const time = getters.minutes - 1
    commit('setTime', time * 60)
  },
  incrementAway (context, payload) {
    // console.log("Payload ", payload)
    context.commit('incrementAway', payload)
  },
  setAway (context, payload) {
    context.commit('setAway', payload)
  },
  incrementHome (context, payload) {
    context.commit('incrementHome', payload)
  },
  incrementPeriod (context, payload) {
    context.commit('incrementPeriod', payload)
  },
  decrementPeriod (context, payload) {
    context.commit('decrementPeriod', payload)
  },
  setHome (context, payload) {
    context.commit('setHome', payload)
  },
  incrementHomeFouls (context, payload) {
    context.commit('incrementHomeFouls', payload)
  },
  setHomeFouls (context, payload) {
    context.commit('setHomeFouls', payload)
  },
  incrementAwayFouls (context, payload) {
    context.commit('incrementAwayFouls', payload)
  },
  setAwayFouls (context, payload) {
    context.commit('setAwayFouls', payload)
  },
  setPeriod (context, payload) {
    context.commit('setPeriod', payload)
  },
  setPossession (context, payload) {
    context.commit('setPossession', payload)
  },
  async setWebSocket (context) {
    context.commit('setWebSocket', await api.getWebSocketUrl()
      .then(response => {
        return response.data.webSocketUrl
      }))
  },
  setHalf (context, payload) {
    context.commit('setHalf', payload)
  },
  setFinal (context, payload) {
    context.commit('setFinal', payload)
  },
  resetFouls (context, payload) {
    context.commit('resetFouls', payload)
  },
  setTime (context, payload) {
    console.log(context, payload, 'time')
    context.commit('setTime', payload)
  },
  setGameConfig (context, payload) {
    const ageconfig = gameConfig[payload]
    context.commit('setGameConfig', ageconfig)
  }
}
const getters = {
  minutes (state) { return Math.floor(state.clock.time / 60) },
  seconds (state) { return state.clock.time % 60 },
  getWebsocket (state) { return state.websocket },
  getGameConfig (state) { return state.gameConfig },
  homeFouls (state) { return state.fouls.home },
  awayFouls (state) { return state.fouls.away }
}

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

export default {
  state,
  strict,
  actions,
  // modules,
  getters,
  mutations,
  namespaced
}
