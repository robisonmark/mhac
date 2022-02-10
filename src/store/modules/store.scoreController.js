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
  period: 1,
  possession: {},
  period_time: 8,
  clock: {
    time: 8*60,
    running: false
  },
  editable: false,
  websocket: 'ws://localhost:4444'
}

let intervalID;

// const vuexLocal = new VuexPersistence({
//   storage: window.sessionStorage
// })

// load audio so it's ready when needed
// const audio = new Audio('/buzzer.mp3');

const mutations = {
  incrementHome: (state, payload) => state.score.home += payload,
  decrementHome: (state) => state.score.home && state.score.home--,
  setHome: (state, payload) => state.score.home = payload,
  incrementAway: (state, payload) => state.score.away += payload,
  decrementAway: (state) => state.score.away && state.score.away--,
  setAway: (state, payload) => state.score.away = payload,
  incrementHomeFouls: (state) => state.fouls.home++,
  decrementHomeFouls: (state) => state.fouls.home && state.fouls.home--,
  setHomeFouls: (state, payload) => state.fouls.home = payload,
  incrementAwayFouls: (state) => state.fouls.away++,
  decrementAwayFouls: (state) => state.fouls.away && state.fouls.away--,
  setAwayFouls: (state, payload) => state.fouls.away = payload,
  incrementPeriod: (state) => state.period++,
  decrementPeriod: (state) => state.period && state.period--,
  setPeriod: (state, payload) => state.period = payload,
  setClock: (state, running) => state.clock.running = running,
  setTime: (state, time) => state.clock.time = time,
  setPossession: (state, value) => state.possession = value,
  toggleEditable: (state) => state.editable = !state.editable,
  setWebSocket: (state, value) => state.websocket = value
}

const actions = {
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
    const time = state.clock.time + amount;

    if (time < 0) {
      commit('setTime', 0)
      // dispatch('playBuzzer')
      return dispatch('stopClock')
    }

    commit('setTime', time)
  },
  incrementClock ({ getters, commit }) {
    const time = getters.minutes + 1;
    commit('setTime', time * 60)
  },
  decrementClock ({ getters, commit }) {
    const time = getters.minutes - 1;
    commit('setTime', time * 60)
  },
  incrementAway (context, payload) {
    // console.log("Payload ", payload)
    context.commit('incrementAway', payload)
  },
  setAway (context, payload) {
    context.commit('setAway', payload)
  },
  incrementHome (context, payload){
    context.commit('incrementHome', payload)
  },
  setHome (context, payload) {
    context.commit('setHome', payload)
  },
  setHomeFouls (context, payload) {
    context.commit('setHomeFouls', payload)
  },
  setAwayFouls (context, payload) {
    context.commit('setAwayFouls', payload)
  },
  setPeriod (context, payload) {
    context.commit('setPeriod', payload)
  },
  setWebSocket(context, payload) {
    context.commit('setWebSocket', payload)
  }
}
const getters = {
  minutes(state){ return Math.floor(state.clock.time / 60)},
  seconds(state){return state.clock.time % 60},
  websocket(state){return state.websocket}
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
