<template>
  <div class="con-admin">
    <nav class="sidebar">
      <ul>
        <router-link :to="{
          name: 'teamDashboard',
          params: {
            slug: 'tennessee_heat'
          }
        }" tag="li" class="nav-item">
          Team Dashboard
        </router-link>
        <router-link :to="{
          path: '/admin/team-manager'
        }" tag="li" class="nav-item">
          Add/Create Team
        </router-link>
        <router-link :to="{
          path: '/admin/tournament'
        }" tag="li" class="nav-item">
          Manage Tournament
        </router-link>
        <router-link :to="{
          path: '/admin/seasons'
        }" tag="li" class="nav-item">
          Manage Seasons
        </router-link>
        <router-link :to="{
          path: '/admin/admin_obs'
        }" tag="li" class="nav-item">
          Update OBS Url
        </router-link>
        <router-link :to="{
          path: '/obs/scoreapp'
        }" tag="li" class="nav-item">
          Run Clock
        </router-link>
      </ul>
    </nav>
    <router-view class="admin" />
    <img class="bottom-logo" :src="greyLogo" />

  </div>
</template>

<script>
// api
import api from '@/api/endpoints'

import { mapGetters } from 'vuex'

export default {
  name: 'teamManager',
  data() {
    return {
      collapse: true,
      login: true,
      greyLogo: '',
      teamLogo: '',
      fontSecondary: '#fff'
    }
  },
  computed: {

    // ...mapGetters(['teams', 'slug'])
  },
  watch: {
    // selectedTeam (newValue, oldValue) {
    //   this.teamLogo = '/static/color-team-logos/' + newValue.logo_color
    //   this.greyLogo = '/static/washedout-team-logo/' + newValue.logo_grey
    // }
  },
  created() {
    // this.getSeasonTeams(this.$route.params.slug)
  },
  methods: {
    // getSeasonTeams (slug) {
    //   api.getSeasonTeams(slug)
    //     .then(response => {
    //       this.$store.dispatch('setTeamAssocLvl', response.data)
    //     })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/less/utils/variables.less';

main {
  display: flex;
  flex-direction: row;
}

.round {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  list-style: none;
  padding: 0;
}

.round .spacer {
  flex-grow: 1;
}

.round .spacer:first-child,
.round .spacer:last-child {
  flex-grow: .5;
}

.round .game-spacer {
  flex-grow: 1;
}

/*
 *  General Styles
*/
body {
  font-family: sans-serif;
  font-size: small;
  padding: 10px;
  line-height: 1.4em;
}

li.game {
  padding-left: 20px;
}

li.game.winner {
  font-weight: bold;
}

li.game span {
  float: right;
  margin-right: 5px;
}

li.game-top {
  border-bottom: 1px solid #aaa;
}

li.game-spacer {
  border-right: 1px solid #aaa;
  min-height: 40px;
}

li.game-bottom {
  border-top: 1px solid #aaa;
}

.con-admin {
  // min-height: calc(100vh - 7rem);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 15rem auto;

  // grid-auto-rows: minmax(35px, auto);
  .sidebar {
    background-color: #0C4B75;
    color: #fff;

    .team-logo {
      width: 100%;
      min-height: 10rem;
      display: flex;

      img {
        width: 75%;
        display: block;
        margin: auto;
      }
    }

    // Override Chrome Browser Defaults
    ul {
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0px;
    }

    a[tag="li"] {
      text-decoration: none;
      list-style: none;
      text-align: left;
      padding-left: 2rem;
      height: 3rem;
      display: flex;
      align-items: center;
      color: #fff;
    }
  }

  //     &:nth-child(even) {
  //       background-color: grey;
  //       color: #fff;
  //     }
  //     &:hover {
  //       background-color: black;
  //       // filter: brightness(90%);
  //       color: #fff;
  //     }
  //   }
  //   .router-link-active {
  //     // background-color: @activeColor;
  //   }
  // }
  .bottom-logo {
    // position: absolute;
    position: fixed;
    right: 0;
    bottom: 0;
    max-height: 15rem;
    z-index: 0;
  }

  .team-management {
    overflow: auto;
    z-index: 1;
    height: calc(100vh - 7rem);
    padding-bottom: 5rem;
  }
}

.nav-item {
  cursor: pointer;
}
</style>
