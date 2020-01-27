import { store } from '../../store/index'
// import { Auth } from 'aws-amplify'

// Initial "state"
const state = {
  loaded: false,
  valid: false
}

const getters = {
  valid (state) {
    return state.valid
  }
}

const mutations = {
  set_valid (state, payload) {
    state.valid = payload
  }
}

const actions = {
  setAuth (context) {
    context.commit('set_authenticated', context, { root: true })
  },

  async valid (context) {
    // let user = store.state.user
    // if (Object.entries(user).length === 0 && user.constructor === Object) {
    //   let valid = await Auth.currentAuthenticatedUser({ bypassCache: false })
    //     .then(response => {
    //       context.dispatch('load', response, { root: true })
    //       context.commit('set_valid', true)
    //       return true
    //     })
    //     .catch(() => {
    //       context.commit('set_valid', false)
    //       return false
    //     })
    //   return valid
    // } else {
    //   context.dispatch('load', user, { root: true })
    //   context.commit('set_valid', true)
    //   return true
    // }
    if (store.getters.authenticated !== '') {
      return true
    }
  },

  // Bootstrap the module and toggle the readiness assertion
  load (context, user) {
    context.commit('set_user', user, { root: true })
    // Check because new user won't have [cognito:groups] in the token
    if (user.signInUserSession.accessToken.payload.hasOwnProperty('cognito:groups')) {
      context.commit('set_userGroups', user.signInUserSession.accessToken.payload['cognito:groups'], { root: true })
    }
    if (user.signInUserSession.accessToken.payload.hasOwnProperty('cognito:wholesaler')) {
      context.commit('set_userAttribues', user.signInUserSession.accessToken.payload['cognito:wholesaler'], { root: true })
    }
    context.dispatch('setLoaded', true, {root: true})
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
