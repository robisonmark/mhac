/**
  TODO: signout reset slug, team, usergroups, users, userattributes, auth, teamLevels
*/
<template>
  <div class="flex-con">
    <amplify-authenticator v-if="authState !== 'signedin'" :styles="styles"></amplify-authenticator>
    <div v-if="authState === 'signedin' && user">
      <amplify-sign-out></amplify-sign-out>
      <div>Hello, {{user.username}}</div>
    </div>
  </div>
</template>

<script lang="js">
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

import { mapGetters } from 'vuex'

export default {
  name: 'AuthStateApp',
  data () {
    return {
      user: undefined,
      authState: undefined,
      styles: {
        border: '1px solid #121212;'
      }
    }
  },
  computed: {
    ...mapGetters(['userGroups', 'team'])
  },
  watch: {
    authState: {
      handler (newValue) {
        if (newValue === 'signedin') {
          this.$store.commit('set_valid', true)
          this.$store.dispatch('load', this.user)
          this.goToTeamManagement()
        }
      }
    }
  },
  created () {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState
      this.user = authData
    })
  },
  methods: {
    goToTeamManagement () {
      if (this.userGroups[0] === 'Admin') {
        this.$router.push({ name: 'admin' })
      } else {
        const team = this.team
        this.$router.push({ name: 'teamDashboard', params: { slug: team } })
      }
    }
  },
  beforeDestroy () {
    return onAuthUIStateChange
  }
}
</script>

<style lang="less" scoped>
.flex-con {
  display: flex;
  height: calc(100vh - 7rem);
  align-items: center;
  justify-content: center;
}
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  --container-height: auto;
  --border: 1px solid #121212;
}
</style>
