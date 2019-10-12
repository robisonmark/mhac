<template>
  <div class="con-management">
    <nav class="sidebar">
      <div class="team-logo">
        <img src="@/assets/color-team-logos/royals.png" />
      </div>
      <ul :style="cssVars">
        <router-link :to="{ path: '/manage/' + team + '/roster'}" tag="li">Roster</router-link>
        <router-link :to="{ path: '/manage/' + team + '/stats'}" tag="li">Stats</router-link>
        <router-link :to="{ path: '/manage/' + team + '/schedule'}" tag="li">Schedule</router-link>
        <router-link :to="{ path: '/manage/' + team + '/profile'}" tag="li">Team Profile</router-link>
      </ul>
    </nav>
    <router-view  class="team-management" />
    <img class="bottom-logo" src="@/assets/washedout-team-logo/royals-grayscale.png" />
  </div>
</template>

<script>
export default {
  name: 'TeamManagement',
  data () {
    return {
      team: this.$route.params.team,
      msg: 'Welcome to Your Vue.js App',
      teamLogo: '',
      teamColor: '#B42625',
      fontSecondary: '#fff'
    }
  },
  computed: {
    cssVars () {
      return {
        '--bg-color': this.teamColor
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.con-management {
  min-height: calc(100vh - 7rem);
  display: grid;
  grid-template-columns: 21% auto;
  // grid-auto-rows: minmax(35px, auto);
  .sidebar {
    background-color: #fff;
    // Override Chrome Browser Defaults
    ul {
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0px;
    }
    li {
      text-decoration: none;
      list-style: none;
      text-align: left;
      padding-left: 2rem;
      height: 3rem;
      display: flex;
      align-items: center;

      &:nth-child(even) {
        background-color: var(--bg-color);
        color: #fff;
      }
      &:hover {
        background-color: darken(#B42625, 10%);
      }
    }
    .router-link-active {
      // background-color: darken(#B42625, 10%);
    }
  }
  .bottom-logo {
    position: absolute;
    right: 0;
    bottom: 0;
    max-height: 19rem;
    z-index: 0;
  }
  .team-management {
    padding: 1rem 3.5rem;
  }
}
</style>
