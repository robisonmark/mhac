import { store } from '@/store/index'
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons'
import { Auth } from 'aws-amplify'

// Initial "state"
const state = {
  loaded: false,
  loggedIn: false,
  valid: false
}

const getters = {
  valid (getterState) {
    return getterState.valid
  },
  loggedIn (getterState) {
    return getterState.loggedIn
  }
}

const mutations = {
  set_valid (mutationState, payload) {
    mutationState.valid = payload
  },
  set_loggedIn (mutationState, payload) {
    mutationState.loggedIn = payload
  }
}

const actions = {
  async valid (context) {
    const user = store.state.userData
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      const valid = await Auth.currentAuthenticatedUser({ bypassCache: false })
        .then(response => {
          context.dispatch('load', response, { root: true })
          context.commit('set_valid', true)
          context.commit('set_loggedIn', true)
          return true
        })
        .catch(() => {
          context.commit('set_valid', false)
          context.commit('set_loggedIn', false)
          return false
        })

      return valid
    } else {
      context.dispatch('load', user, { root: true })
      context.commit('set_valid', true)
      context.commit('set_loggedIn', true)
      return true
    }
  },

  load (context, user) {
    const groups = user.signInUserSession?.accessToken?.payload['cognito:groups']
    context.commit('set_userGroups', groups, { root: true })
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
