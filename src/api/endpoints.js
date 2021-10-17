/***
 * This creates the api class that is called to create out http requests
 * TODO: Update Pattern Used to be Class Based By Category
 * TODO: Create a function for chaining params
 * TODO: Better Parameter Chaining
***/

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
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }'
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
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }'
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
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }'
    // console.log('GetGameResults',gameId, teamId)
    let addedParams = ''
    if (gameId !== undefined && teamId === undefined) {
      addedParams = '/' + gameId
    } else if (gameId !== undefined && teamId !== undefined) {
      addedParams = '/' + gameId + '/' + teamId
      // console.log(addedParams)
    } else {
      addedParams = ''
    }

    return robros({
      url: '/getGameResults' + addedParams,
      method: 'GET'
    })
  }

  /***
     * Get Game Results
     * This call returns the game stats, it takes optional parameters of game_id and team_id
     * @param {string} method - GET
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async addGameResults (gameId, stats) {
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
    if (gameId !== undefined) {
      addedParams = '/' + gameId
    } else {
      return 'Error'
    }

    return robros({
      url: '/addGameResults' + addedParams,
      method: 'POST',
      data: stats
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
      url: '/getTeams' + addedParams,
      method: 'GET'
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
      url: '/getPlayers/' + team,
      method: 'GET'
    })
  }

  /***
     * Get a List of Players by Team Level ID
     * @param {object} team - Team UUID
     * @return - JSON Object of players by team
    ***/
  static async getRoster (level) {
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
      url: '/getRoster/' + level,
      method: 'GET'
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
      url: '/addPlayer',
      method: 'POST',
      data: body
    })
  }

  /***
     * Get a List of Players
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async updatePlayer (id, body) {
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
      url: '/updatePlayer/' + id,
      method: 'POST',
      data: body
    })
  }

  /***
     * Get Schedule
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getSchedule (season, team, year) {
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }

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
    // if (store.state.user.signInUserSession.idToken.jwtToken) {
    //   promo.defaults.headers.common['Authorization'] = store.state.user.signInUserSession.idToken.jwtToken
    // } else {
    //   await Auth.currentAuthenticatedUser().then(response => {
    //     // console.log('current:', response)
    //     promo.defaults.headers.common['Authorization'] = response.signInUserSession.idToken.jwtToken
    //     // console.log(user)
    //   })
    // }
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
      url: '/addGame',
      method: 'POST',
      data: body
    })
  }

  /***
     * Add Game
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async updateGame (body) {
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
      url: '/updateGame',
      method: 'POST',
      data: body
    })
  }

  /***
     * Get Tournament Info
     * @param {string} method - Put or Post. Method sent to the api
     * @param {object} body - Player JSON Body
     * @return - JSON Object of players by team
    ***/
  static async getTournamentInformation (body) {
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
      url: '/getTournamentInformation/',
      method: 'GET'
    })
  }

  static async getActiveTournaments (body) {
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
      url: '/getActiveTournaments',
      method: 'GET'
    })
  }

  static async removeGame (body) {
    return robros({
      url: '/deleteGame',
      method: 'POST',
      data: body
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
      url: '/getActiveYear',
      method: 'GET'
    })
  }

  static async getTeamByStandings (seasonId, rank) {
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
      url: '/lookupTeamByStandings/' + seasonId + '/' + rank,
      method: 'GET'
    })
  }

  /***
     * Get a List of Players
     * @param {object} team - Team UUID
     * @return - JSON Object of players by team
    ***/
  static async getAdminPlayers (team) {
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
      url: '/getAdminPlayers/' + team,
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
      url: '/updateTournamentGame/',
      method: 'POST',
      data: body
    })
  }

  static async getYear (active) {
    let returnUrl = ''
    if (active === true) {
      returnUrl = '/getActiveYear'
    } else {
      returnUrl = '/getYears/'
    }
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
}
