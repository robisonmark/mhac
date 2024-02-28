/**
  TODO: signout reset slug, team, usergroups, users, userattributes, auth, teamLevels
  https://medium.com/simform-engineering/vue-js-and-aws-amplify-unleashing-the-full-potential-8ccdb6c87b2d
*/
<template>
  <div class="flex-con">
    <authenticator :hide-sign-up="true" :services="services" :login-mechanisms="['email']">
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
  import { useStore } from'vuex';
  
  import "@aws-amplify/ui-vue/styles.css";
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
  import { signIn, fetchAuthSession } from 'aws-amplify/auth';

  const auth = useAuthenticator();
  const router = useRouter();
  const store = useStore();

  const goToTeamManagement = (userGroups) => {
    if (userGroups.includes('Admin')) {
      router.push({ name: 'admin' })
    } else {
      const team = this.team
      router.push({ name: 'teamDashboard', params: { slug: team } })
    }
  }

  async function handleSignIn(user_creds) {
    const { isSignedIn, nextStep } = await signIn({
      username: user_creds.username,
      password: user_creds.password
    });
    if (nextStep.signInStep === 'DONE') {
      const { user, idToken } = (await fetchAuthSession()).tokens ?? {};
      const usergroups = idToken?.payload?.['cognito:groups']
      store.commit('set_valid', true)
      store.dispatch('load', idToken)
      store.commit('set_loggedIn', true)
      goToTeamManagement(usergroups)
    } else {
      return nextStep.signInStep
    }
  }

  const services = {
    handleSignIn: handleSignIn,
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

<style>
[data-amplify-authenticator] {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  --amplify-components-authenticator-router-border-color: 1px solid #121212;
}
</style>