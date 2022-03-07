import { robros } from './base'
import AuthToken from './auth'

class Admin {
  constructor () {
    const base = robros

    base.interceptors.response.use(this.handleSuccess, this.handleError)
    this.admin = base
  }

  handleSuccess (response) {
    // commented out because this controls all robros calls (base calls)
    // return response.data // uncomment to only pass data as the response, not the response signature
    return response
  }

  handleError (err) {
    return err
  }

  /***
   * Add Game Results
   * Add game results to database
   * @param {string} gameId - Game Unique Id
   * @param {object} results - JSON Payload of Game Results
   * @return - JSON Object of players by team
  ***/
  async addGameResults (gameId, results) {
    AuthToken.setAuth()

    let addedParams = ''
    if (gameId !== undefined) {
      addedParams = '/' + gameId
    } else {
      return 'Error'
    }

    return robros({
      url: '/addGameResults' + addedParams,
      method: 'POST',
      data: results
    })
  }

  /***
   * Adds New Player to Roster
   * @param {object} body - Player JSON Body
   * @return - JSON Object of players by team
  ***/
  async addPlayer (body) {
    return robros({
      url: '/addPlayer',
      method: 'POST',
      data: body
    })
  }

  /***
   * Update Player Information
   * @param {string} id - Player Unique Id
   * @param {object} body - Player JSON Body
   * @return - JSON Object of players by team
  ***/
  async updatePlayer (id, body) {
    return robros({
      url: '/updatePlayer/' + id,
      method: 'POST',
      data: body
    })
  }

  /***
   * Add Game
   * @param {object} body - Game JSON Body
   * @return - JSON Object of players by team
  ***/
  async addGame (body) {
    return robros({
      url: '/addGame',
      method: 'POST',
      data: body
    })
  }

  /***
   * Remove Game
   * @param {object} body - Game JSON Body
   * @return - JSON Object of players by team
  ***/
  async removeGame (body) {
    return robros({
      url: '/deleteGame',
      method: 'POST',
      data: body
    })
  }

  /***
   * Update Game
   * @param {object} body - Game JSON Body
   * @return - JSON Object of players by team
  ***/
  async updateGame (body) {
    return robros({
      url: '/updateGame',
      method: 'POST',
      data: body
    })
  }

  /***
   * Get a List of Players
   * @param {object} team - Team UUID
   * @return - JSON Object of players by team
  ***/
  async getAdminPlayers (team) {
    return robros({
      url: '/getAdminPlayers/' + team,
      method: 'GET'
    })
  }
}

export default new Admin()
