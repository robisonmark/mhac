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
      async function currentAuthenticatedUser() {
        try {

          const { user, idToken } = (await fetchAuthSession()).tokens ?? {};
      
          context.dispatch('load', user, { root: true })
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
    

      // if (aws_user) {
      //   context.dispatch('load', aws_user, { root: true })
      //   context.commit('set_valid', true)
      //   context.commit('set_loggedIn', true)
      //   return true
      // } else {
      //   context.commit('set_valid', false)
      //   context.commit('set_loggedIn', false)
      //   return false
      // }
      // const vaild = await Auth
      //   .then(response => {
      //     console.log(response)
      //     context.dispatch('load', response, { root: true })
      //     context.commit('set_valid', true)
      //     context.commit('set_loggedIn', true)
      //     return true
      //   })
      //   .catch(() => {
      //     context.commit('set_valid', false)
      //     context.commit('set_loggedIn', false)
      //     return false
      //   })

      // return valid
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
