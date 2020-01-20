/***
 * This creates the api class that is called to create out http requests
***/
// import axios from 'axios'
import { robros } from './base'
// import { Auth } from 'aws-amplify'
// import { store } from '@/store/index'

export class api {
  /***
     * Login
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async login (username, password) {
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
      'url': '/login/',
      'method': 'POST',
      'data': {
        'email': username,
        'password': password
      }
    })
  }

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
     * Get Season Standings
     * @param {string} method - GET
     * @param {object} data - Stat JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getSeasonStats (data) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }'
    let queryParms = '?'
    Object.keys(data).forEach(string => {
      queryParms += string[0] + '=' + string[1]
    })
    return robros({
      'url': '/getSeasonStats' + queryParms,
      'method': 'GET',
      'params': data
    })
  }

  /***
     * Get Game Results
     * This call returns the game stats, it takes optional parameters of game_id and team_id
     * @param {string} method - GET
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getGameResults (gameId, teamId) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }'

    let addedParams = ''
    if (gameId !== undefined && teamId === undefined) {
      addedParams = '/' + gameId
    } else if (gameId !== undefined && teamId !== undefined) {
      addedParams = '/' + gameId + '/' + teamId
    } else {
      addedParams = ''
    }

    return robros({
      'url': '/getGameResults' + addedParams,
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
    let addedParams = ''
    if (id !== undefined) {
      addedParams = '/' + id
    } else {
      addedParams = ''
    }

    return robros({
      'url': '/getTeams' + addedParams,
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
  static async getSchedule (season, team) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }

    let addedParams = ''
    if (season !== undefined && team === undefined) {
      addedParams = '/' + season
    } else if (season !== undefined && team !== undefined) {
      addedParams = '/' + season + '/' + team
    } else {
      addedParams = ''
    }

    return robros({
      'url': '/getSchedule' + addedParams,
      'method': 'GET'
    })
  }

  /***
     * Get Level
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getLevels (season, team) {
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
      'url': '/getLevels',
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
      'url': '/addGame',
      'method': 'POST',
      'data': body
    })
  }
}
