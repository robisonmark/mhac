/**
 * Tournament API Client
 */

import { robros } from './base'

class Tournament {
  constructor () {
    const base = robros

    base.interceptors.response.use(this.handleSuccess, this.handleError)
    this.tournament = base
  }

  // TODO: Change handleSuccess and Error into file to include
  handleSuccess (response) {
    return response.data
  }

  handleError (err) {
    return err
  }

  /***
     * List All Active Tournaments
     *
     * @method GET
     * @return {AxiosPromise} List of all active Tournaments
    ***/
  async getActiveTournaments () {
    return robros({
      url: '/getActiveTournaments',
      method: 'GET'
    })
  }

  /***
     * Get Team Count (For Tournament Games)
     * @method GET
     * @param {string} seasonId - Season Level ID
     * @return {number} count of teams in tournament
    ***/
  async getTeamCount (seasonId) {
    return robros({
      url: '/getTeamCount/' + seasonId,
      method: 'GET'
    })
  }

  /***
     * Get Tournament Info
     *
     * @method GET
     * @return {AxiosPromise} Tournament Information
    ***/
  async getTournamentInformation () {
    return robros({
      url: '/getTournamentInformation/',
      method: 'GET'
    })
  }

  /***
     * Get a List of Players
     *
     * @method PUT
     * @param {object} game - JSON Object of Game
     * @requires {string} - add in required params
     * @return - Response
    ***/
  static async updateTournamentGame (body) {
    return robros({
      url: '/updateTournamentGame/',
      method: 'POST',
      data: body
    })
  }
}

export default new Tournament()
