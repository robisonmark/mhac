<template>
  <div class="con-management">
    <nav class="sidebar">
      <div v-if="admin" class="admin">
        <selectbox id="teams" :options="teams" :trackby="'team_name'" placeholder="" v-model="selectedTeam"></selectbox>
      </div>
      <div class="team-logo">
        <img :src="teamLogo" />
      </div>
      <ul :style="cssVars">
        <router-link :to="{ path: '/manage/' + team + '/roster'}" tag="li">Roster</router-link>
        <router-link :to="{ path: '/manage/' + team + '/stats'}" tag="li">Stats</router-link>
        <router-link :to="{ path: '/manage/' + team + '/schedule'}" tag="li">Schedule</router-link>
        <router-link :to="{ path: '/manage/' + team + '/profile'}" tag="li">Team Profile</router-link>
        <template v-if="admin">
          <router-link :to="{ name: 'admin'}" tag="li">Admin</router-link>
        </template>
      </ul>
    </nav>
    <router-view class="team-management" :style="cssVars" />
    <img class="bottom-logo" :src="greyLogo" />
  </div>
</template>

<script>
// api
import api from '../api/endpoints.js'

// components
import selectbox from './selectbox'

export default {
  name: 'TeamManagement',
  data () {
    return {
      greyLogo: '',
      team: this.$route.params.slug,
      // teamColor: '#B42625',
      teamLogo: '',
      fontSecondary: '#fff'
      // selectedTeam: {}
    }
  },
  components: {
    selectbox: selectbox
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    cssVars () {
      let teamMain = ''
      let teamSecond = ''
      this.$store.getters.teams.filter(team => {
        if (team.slug === this.$store.getters.user?.slug) {
          teamMain = '#' + team.main_color
          teamSecond = '#' + team.secondary_color
        }
      })
      return {
        '--bg-color': teamMain,
        '--team-second': teamSecond,
        '--hover-color': this.darken(teamMain, 15),
        '--active-color': this.lighten(teamMain, 10)
      }
    },
    admin () {
      if (this.$store.getters.userGroups.includes('Admin')) {
        return true
      } else {
        return false
      }
    },
    teams () {
      return this.$store.getters.teams
    },
    selectedTeam: {
      get: function () {
        if (this.$store.getters.userGroups[0] !== 'Admin') {
          return this.$store.getters.teams.find(team => team.slug === this.$store.getters.userGroups[0])
        } else {
          return this.$store.getters.teams.find(team => team.slug === this.$route.params.slug)
        }
      },
      set: function (newValue) {
        const user = {
          team_id: newValue.id,
          slug: newValue.slug
        }
        this.team = newValue.slug
        this.$store.dispatch('setUser', user)
        const routeName = this.$route.name

        this.$router.push({ name: routeName, params: { slug: newValue.slug } })
        this.getSeasonTeams(newValue.slug)

        console.log('here')
        const team = this.getNewTeam(newValue.slug)

        this.teamLogo = '/static/color-team-logos/' + team.logo_color
        this.greyLogo = '/static/washedout-team-logo/' + team.logo_grey
      }
    }
  },
  watch: {
    async selectedTeam (newValue, oldValue) {
      const team = await this.getNewTeam(newValue.slug)

      this.teamLogo = '/static/color-team-logos/' + team.logo_color
      this.greyLogo = '/static/washedout-team-logo/' + team.logo_grey
    }
  },
  beforeCreate () {
    const slug = this.$route.params.slug
    this.$store.dispatch('setTeam', slug)

    this.$store.dispatch('setSeasonTeams')
  },
  created () {
    this.getSeasonTeams(this.$route.params.slug)
  },
  methods: {
    // Credit to Jose Reyes @ https://codepen.io/jreyesgs/pens/
    /* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
    addLight (color, amount) {
      const cc = parseInt(color, 16) + amount
      let c = (cc > 255) ? 255 : (cc)
      c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`
      return c
    },

    /* Aclara un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
    lighten (color, amount) {
      color = (color.indexOf('#') >= 0) ? color.substring(1, color.length) : color
      amount = parseInt((255 * amount) / 100)
      color = `#${this.addLight(color.substring(0, 2), amount)}${this.addLight(color.substring(2, 4), amount)}${this.addLight(color.substring(4, 6), amount)}`
      return color
    },

    /* Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo */
    subtractLight (color, amount) {
      const cc = parseInt(color, 16) - amount
      let c = (cc < 0) ? 0 : (cc)
      c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`
      return c
    },

    /* Oscurece un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
    darken (color, amount) {
      color = (color.indexOf('#') >= 0) ? color.substring(1, color.length) : color
      amount = parseInt((255 * amount) / 100)
      color = `#${this.subtractLight(color.substring(0, 2), amount)}${this.subtractLight(color.substring(2, 4), amount)}${this.subtractLight(color.substring(4, 6), amount)}`
      return color
    },

    getSeasonTeams (slug) {
      api.getSeasonTeams(slug)
        .then(response => {
          this.$store.dispatch('setTeamAssocLvl', response.data)
        })
    },

    async getNewTeam (slug) {
      return await api.getTeams(slug).then(response => {
        return response.data[0]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@teamColor: var(--bg-color);
@hoverColor: var(--hover-color);
@activeColor: var(--active-color);
.admin {
  display: block;
  padding: 1rem;
}
h2 {
  font-size: 1.5rem !important;
}
.con-management {
  // min-height: calc(100vh - 7rem);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 15rem auto;
  // grid-auto-rows: minmax(35px, auto);
  .sidebar {
    background-color: #fff;
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
    li {
      text-decoration: none;
      list-style: none;
      text-align: left;
      padding-left: 2rem;
      height: 3rem;
      display: flex;
      align-items: center;

      &:nth-child(even) {
        background-color: @teamColor;
        color: #fff;
      }
      &:hover {
        background-color: @hoverColor;
        // filter: brightness(90%);
        color: #fff;
      }
    }
    .router-link-active {
      // background-color: @activeColor;
    }
  }
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

</style>
