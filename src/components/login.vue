/**
  TODO: signout reset slug, team, usergroups, users, userattributes, auth, teamLevels
  https://medium.com/simform-engineering/vue-js-and-aws-amplify-unleashing-the-full-potential-8ccdb6c87b2d
*/
<template>
  <div class="flex-con">
    <authenticator :hide-sign-up="true" :services="services" :login-mechanisms="['email']">
      <!--  <template v-slot:header>
        <div style="padding: var(--amplify-space-large); text-align: center">
          <img
            class="amplify-image"
            alt="MHAC logo"
            src="/static/color-team-logos/mhaclogo.png"
          />
        </div>
      </template> -->
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
          <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
    <template v-if="auth.route === 'authenticated'">
      <button @click="auth.signOut">Sign out</button>
    </template>
  </div>
</template>

<script lang="js" setup>
  import { toRefs } from 'vue';
  import { useRouter } from 'vue-router'
  
  import "@aws-amplify/ui-vue/styles.css";
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
  import { signIn, fetchAuthSession } from 'aws-amplify/auth';

  const auth = useAuthenticator();
  const router = useRouter()

  const goToTeamManagement = (userGroups) => {
    if (userGroups[0] === 'Admin') {
      router.push({ name: 'admin' })
    } else {
      const team = this.team
      router.push({ name: 'teamDashboard', params: { slug: team } })
    }
  }

  
  
  async function handleSignIn(user_creds) {
    const { nextStep } = await signIn({
      username: user_creds.username,
      password: user_creds.password
    });
    if (nextStep.signInStep === 'DONE') {
      // console.log(await user())
      const { user, idToken } = (await fetchAuthSession()).tokens ?? {};
      console.log('you in')
      console.log(user)
      // this.$store.commit('set_valid', true)
      // this.$store.dispatch('load', user)
      // this.goToTeamManagement()
        // router.push('/');
    } else {
      return nextStep.signInStep
    }
    
    
  }

  const services = {
    handleSignIn: handleSignIn,
  }

// import { onAuthUIStateChange } from '@aws-amplify/ui-vue'

// import { mapGetters } from 'vuex'


// export default {
//   name: 'AuthStateApp',
//   data () {
//     return {
//       user: undefined,
//       authState: undefined,
//       styles: {
//         border: '1px solid #121212;'
//       }
//     }
//   },
//   computed: {
//     ...mapGetters(['userGroups', 'team'])
//   },
//   watch: {
//     authState: {
//       handler (newValue) {
//         if (newValue === 'signedin') {
//           this.$store.commit('set_valid', true)
//           this.$store.dispatch('load', this.user)
//           this.goToTeamManagement()
//         }
//       }
//     }
//   },
//   created () {
//     onAuthUIStateChange((authState, authData) => {
//       this.authState = authState
//       this.user = authData
//     })
//   },
//   methods: {
//     
//   beforeDestroy () {
//     return onAuthUIStateChange
//   }
// }
</script>

<style lang="less" scoped>
.flex-con {
  display: flex;
  height: calc(100vh - 7rem);
  align-items: center;
  justify-content: center;
}
</style>

<style>
[data-amplify-authenticator] {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  --amplify-components-authenticator-router-border-color: 1px solid #121212;
}
</style>