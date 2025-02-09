import { store } from '@/store/index'
// https://docs.amplify.aws/vue/build-a-backend/auth/manage-user-session/
import { useAuthenticator } from '@aws-amplify/ui-vue';
const Auth = useAuthenticator();

import { fetchAuthSession } from 'aws-amplify/auth';

// Initial "state"
const state = {
  loaded: false,
  loggedIn: false,
  valid: false
}

const getters = {
  valid(getterState) {
    return getterState.valid
  },
  loggedIn(getterState) {
    return getterState.loggedIn
  }
}

const mutations = {
  set_valid(mutationState, payload) {
    mutationState.valid = payload
  },
  set_loggedIn(mutationState, payload) {
    mutationState.loggedIn = payload
  }
}

const actions = {
  async valid(context) {
    const user = store.state.userData
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      async function currentAuthenticatedUser() {
        try {

          const { user, idToken } = (await fetchAuthSession()).tokens ?? {};

          context.dispatch('load', idToken, { root: true })
          context.commit('set_valid', true)
          context.commit('set_loggedIn', true)
          return true
        } catch (err) {
          console.log(err)
          context.commit('set_valid', false)
          context.commit('set_loggedIn', false)
          return false
        }
      }

      return await currentAuthenticatedUser()

    } else {
      context.dispatch('load', user, { root: true })
      context.commit('set_valid', true)
      context.commit('set_loggedIn', true)
      return true
    }
  },

  load(context, user) {
    // console.log(user.payload)
    const groups = user.payload['cognito:groups']
    // console.log(groups)
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
