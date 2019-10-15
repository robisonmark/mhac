/***
 * This creates the api class that is called to create out http requests
***/
// import axios from 'axios'
import { robros } from './base'
// import { Auth } from 'aws-amplify'
// import { store } from '@/store/index'

export class api {
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
}
