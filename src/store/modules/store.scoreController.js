/* eslint-disable no-return-assign */
import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

// api
import { api } from '@/api/endpoints.js'

Vue.use(Vuex)

const namespaced = false
// const modules = { auth }
const strict = false

// export enum Possessions {
//   None,
//   Home = 'home',
//   Away = 'away',
// }

// export type State = {
//   score: {
//     home: number;
//     away: number;
//   },
//   fouls: {
//     home: number;
//     away: number;
//   },
//   period: number;
//   possession: Possessions;
//   clock: {
//     time: number;
//     running: boolean;
//   },
//   editable: boolean;
// }

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
    hundreds_seconds: 100
  }
}

let intervalID

// const vuexLocal = new VuexPersistence({
//   storage: window.sessionStorage
// })

// load audio so it's ready when needed
// const audio = new Audio('/buzzer.mp3');

const mutations = {
  setAwayTeam: (state, payload) => state.away_team_slug = payload,
  setHomeTeam: (state, payload) => state.home_team_slug = payload,
  incrementHome: (state, payload) => state.score.home += payload,
  decrementHome: (state) => state.score.home && state.score.home--,
  setHome: (state, payload) => state.score.home = payload,
  incrementAway: (state, payload) => state.score.away += payload,
  decrementAway: (state) => state.score.away && state.score.away--,
  setAway: (state, payload) => state.score.away = payload,
  incrementHomeFouls: (state) => state.fouls.home++,
  decrementHomeFouls: (state) => state.fouls.home && state.fouls.home--,
  setHomeFouls: (state, payload) => state.fouls.home = payload,
  decrementHomeTimeouts: (state) => state.timeouts.home && state.timeouts.home--,
  incrementAwayFouls: (state) => state.fouls.away++,
  decrementAwayFouls: (state) => state.fouls.away && state.fouls.away--,
  setAwayFouls: (state, payload) => state.fouls.away = payload,
  decrementAwayTimeouts: (state) => state.timeouts.away && state.timeouts.away--,
  incrementPeriod: (state) => state.period++,
  decrementPeriod: (state) => {
    if (state.period > 1) {
      state.period && state.period--
    }
  },
  setPeriod: (state, payload) => state.period = payload,
  setClock: (state, running) => state.clock.running = running,
  setTime: (state, time) => {
    state.time_remaining.minutes = time.minutes
    state.time_remaining.seconds = time.seconds
    state.time_remaining.hundreds_seconds = time.hundreds_seconds
  },
  setPossession: (state, value) => state.possession = value,
  toggleEditable: (state) => state.editable = !state.editable,
  toggleClock: (state, payload) => state.clock.running = payload,
  setWebSocket: (state, payload) => state.websocket = payload,
  setHalf: (state) => state.half = !state.half,
  setFinal: (state) => state.final = !state.final,
  resetFouls: (state, payload) => {
    state.fouls.home = payload
    state.fouls.away = payload
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
    context.commit('decrementAwayTimeoutsx', payload)
  },
  setAwayTeam (context, payload) {
    context.commit('setAwayTeam', payload)
  },
  setHomeTeam (context, payload) {
    context.commit('setHomeTeam', payload)
  },

  startClock ({ commit, dispatch }) {
    commit('setClock', true)

    intervalID = setInterval(() => dispatch('updateClock', -1), 1000)
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
  }
}
const getters = {
  minutes (state) { return Math.floor(state.clock.time / 60) },
  seconds (state) { return state.clock.time % 60 },
  getWebsocket (state) { return state.websocket },
  homeFouls (state) {return state.fouls.home},
  awayFouls (state) {return state.fouls.away},
}

export default {
  state,
  strict,
  actions,
  // modules,
  getters,
  mutations,
  namespaced
}
