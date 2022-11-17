/***
 * This creates the api class that is called to create out http requests
 * TODO: Update Pattern Used to be Class Based By Category
 * TODO: Create a function for chaining params
 * TODO: Better Parameter Chaining
***/

import { robros } from './base'

export class api {
  /***
     * Login
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async login (username, password) {
    return robros({
      url: '/login/',
      method: 'POST',
      data: {
        email: username,
        password: password
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
    return robros({
      url: '/getCurrentSeasons',
      method: 'GET'
    })
  }

  /***
     * Get Team Count (For Tournament Games)
     * @param {string} method - Get
     * @param {string} seasonId - Season Level ID
     * @return - JSON Object of players by team
    ***/
  static async getTeamCount (seasonId) {
    return robros({
      url: '/getTeamCount/' + seasonId,
      method: 'GET'
    })
  }

  /***
     * Get Standings
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getStandings (seasonId) {
    const queryParms = seasonId ? '/' + seasonId : ''
    return robros({
      url: '/getStandings' + queryParms,
      method: 'GET'
    })
  }

  /***
     * Get Season Standings
     * @param {string} method - GET
     * @param {object} data - Stat JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getSeasonStats (data) {
    // let queryParms = '?'
    // Object.keys(data).forEach(string => {
    //   // console.log(string)
    //   // queryParms += string[0] + '=' + string[1]
    // })
    return robros({
      url: '/getSeasonStats',
      method: 'GET',
      params: data
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
    // gameId = gameId ? gameId + '/' : ''
    // teamId = teamId ? teamId + '/' : ''
    let path = ''
    if (gameId && teamId) {
      path = gameId + '/' + teamId
    } else if (gameId && !teamId) {
      path = gameId
    } else {
      path = teamId
    }

    return robros({
      url: `/getGameResults/${path}`,
      method: 'GET'
    })
  }

  /***
     * Get a List of Teams
     * @param {object} id - ID
     * @return - JSON Object of players by team
    ***/
  static async getTeams (id) {
    id = id ? '/' + id : ''

    return robros({
      url: `/getTeams${id}`,
      method: 'GET'
    })
  }

  /***
     * Get a List of Players
     * @param {object} team - Team UUID
     * @return - JSON Object of players by team
    ***/
  static async getPlayers (team) {
    return robros({
      url: `/getPlayers/${team}`,
      method: 'GET'
    })
  }

  /***
     * Get a List of Players by Team Level ID
     * @param {object} team - Team UUID
     * @return - JSON Object of players by team
    ***/
  static async getRoster (level) {
    return robros({
      url: `/getRoster/${level}`,
      method: 'GET'
    })
  }

  /***
     * Get Schedule
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getSchedule (season, team, year) {
    let urlString = '/getSchedule'
    let addedParams = ''

    if (season !== undefined && team === undefined) {
      addedParams = '/' + season
    } else if (year !== undefined) {
      addedParams = '/' + year
    } else if (season !== undefined && team !== undefined) {
      addedParams = '/' + season + '/' + team
    } else if (season === undefined && team !== undefined) {
      addedParams = '/' + team
      urlString = '/getProgramSchedule'
    } else {
      /*
       * @todo: Remove this call
      **/
      addedParams = ''
    }

    return robros({
      url: urlString + addedParams,
      method: 'GET'
    })
  }

  /***
     * Get Level
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getLevels (season, team) {
    return robros({
      url: '/getLevels',
      method: 'GET'
    })
  }

  /***
     * Get Season Teams - This call returns the levels associated with each program,
     * returning their unique id
     * @param {string} method - Get
     * @param {string} slug - Team Slug
     * @return - JSON Object of players by team
    ***/
  static async getSeasonTeams (slug = '', seasonid = null) {
    if (slug !== '' && seasonid !== null) {
      slug = slug + '/' + seasonid
    } else if (slug === '' && seasonid !== null) {
      slug = seasonid
    }

    return robros({
      url: '/getSeasonTeams/' + slug,
      method: 'GET'
    })
  }

  /***
     * Get Tournament Info
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getTournamentInformation (body) {
    return robros({
      url: '/getTournamentInformation/',
      method: 'GET'
    })
  }

  static async getActiveTournaments (body) {
    return robros({
      url: '/getActiveTournaments',
      method: 'GET'
    })
  }

  static async sendStats (body, gameId, teamId) {
    return robros({
      url: '/addFileGameStats/' + gameId + '/' + teamId,
      method: 'POST',
      data: body
    })
  }

  static async getActiveYear () {
    return robros({
      url: '/getActiveYear',
      method: 'GET'
    })
  }

  static async getTeamByStandings (seasonId, rank) {
    return robros({
      url: '/lookupTeamByStandings/' + seasonId + '/' + rank,
      method: 'GET'
    })
  }

  /***
   * Get a List of Players
   * @param {string} method - Put or Post. Method sent to the api
   * @param {object} body - Player JSON Body
   * @return - JSON Object of players by team
  ***/
  static async updateTournamentGame (body) {
    return robros({
      url: '/updateTournamentGame/',
      method: 'POST',
      data: body
    })
  }

  /***
     *
     *
     *
     *
    ***/
  static async addTournamentGame (body) {
    return robros({
      url: '/addTournamentGame/',
      method: 'POST',
      data: body
    })
  }

  static async getYear (active) {
    const returnUrl = active ? '/getActiveYear' : '/getYears/'

    return robros({
      url: returnUrl,
      method: 'GET'
    })
  }

  static async getAdminSeasons () {
    return robros({
      url: '/getAdminSeasons',
      method: 'GET'
    })
  }

  static async updateSeason (body) {
    return robros({
      url: '/updateSeason',
      method: 'PUT',
      data: body
    })
  }

  static async addSeason (body) {
    return robros({
      url: '/addSeason',
      method: 'POST',
      data: body
    })
  }

  static async getWebSocketUrl () {
    return robros({
      url: '/websocketUrl',
      method: 'GET'
    })
  }

  static async updateWebSocketUrl (body) {
    return robros({
      url: '/websocketUrl',
      method: 'POST',
      data: body
    })
  }

  static async addTeam (body) {
    return robros({
      url: '/createTeam',
      method: 'POST',
      data: body
    })
  }
}
