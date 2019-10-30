/***
 * This creates the api class that is called to create out http requests
***/
// import axios from 'axios'
import { robros } from './base'
// import { Auth } from 'aws-amplify'
// import { store } from '@/store/index'

export class api {
  /***
     * Get Current Seasons
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getCurrentSeasons () {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
    return robros({
      'url': '/getCurrentSeasons',
      'method': 'GET'
    })
  }

  /***
     * Get Standings
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getStandings (seasonId) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }'
    let queryParms = seasonId ? '/' + seasonId : ''
    return robros({
      'url': '/getStandings' + queryParms,
      'method': 'GET'
    })
  }

  /***
     * Get a List of Teams
     * @param {object} id - ID
     * @return - JSON Object of players by team
    ***/
  static async getTeams (id) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
    return robros({
      'url': '/getTeams',
      'method': 'GET'
    })
  }

  /***
     * Get a List of Players
     * @param {object} team - Team UUID
     * @return - JSON Object of players by team
    ***/
  static async getPlayers (team) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
    return robros({
      'url': '/getPlayers/' + team,
      'method': 'GET'
    })
  }

  /***
     * Adds New Player to Roster
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async addPlayer (body) {
    // let id = ''
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
    // if (body.id) {
    //   id = body.id

    //   delete body.id
    // }
    return robros({
      'url': '/addPlayer',
      'method': 'POST',
      'data': body
    })
  }
  /***
     * Get a List of Players
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async updatePlayer (method, body) {
    let id = ''
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
    method = method.toUpperCase()
    if (body.id) {
      id = body.id

      delete body.id
    }
    return robros({
      'url': '/updatePlayer/' + id,
      'method': method,
      'data': body
    })
  }

  /***
     * Get Schedule
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getSchedule (season) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
    return robros({
      'url': '/getSchedule/' + season,
      'method': 'GET'
    })
  }

  /***
     * Add Game
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async addGame (body) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
    return robros({
      'url': '/addGame/',
      'method': 'POST',
      'data': body
    })
  }
}
