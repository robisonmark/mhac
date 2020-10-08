<template>
  <div class="flex-con">
    <amplify-authenticator v-if="authState !== 'signedin'"></amplify-authenticator>
    <div v-if="authState === 'signedin' && user">
      <amplify-sign-out></amplify-sign-out>
      <div>Hello, {{user.username}}</div>
    </div>
  </div>
</template>

<script lang="js">
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'AuthStateApp',
  data () {
    return {
      user: undefined,
      authState: undefined
    }
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
      const team = this.$store.getters.team
      this.$router.push({ name: 'teamDashboard', params: { slug: team } })
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
</style>
