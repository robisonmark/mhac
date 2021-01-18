<template>
  <div class="con-admin">
    <nav class="sidebar">
      <ul :style="cssVars">
        <router-link :to="{ path: '/admin/edit_frontpage'}" tag="li">Edit Front Page</router-link>
        <router-link :to="{ path: '/admin/tournament'}" tag="li">Manage Tournament</router-link>
        <router-link :to="{ path: '/manage/'}" tag="li">Manage Teams</router-link>
      </ul>
    </nav>
    <router-view class="admin" />
    <img class="bottom-logo" :src="greyLogo" />
    

  </div>
</template>

<script>
// api
import { api } from '../api/endpoints.js'

export default {
  name: 'admin',
  data () {
    return {
      login: true,
      greyLogo: '',
      team: this.$route.params.slug,
      // teamColor: '#B42625',
      teamLogo: '',
      fontSecondary: '#fff'
      // selectedTeam: {}
    }
  },
  computed: {
    cssVars () {
      let teamMain = ''
      let teamSecond = ''
      this.$store.state.teams.forEach(team => {
        if (team.id === this.$store.state.user.team_id) {
          teamMain = '#' + team.main_color
          teamSecond = '#' + team.secondary_color
        }
      })
      // const darker = Color(teamMain).darken(0.5).hex()
      // const lighter = Color(teamMain).lighten(0.5).hex()
      return {
        '--bg-color': teamMain,
        '--team-second': teamSecond,
        '--hover-color': this.darken(teamMain, 15),
        '--active-color': this.lighten(teamMain, 10)
      }
    },
    admin () {
      if (this.$store.state.userGroups.includes('Admin')) {
        return true
      } else {
        return false
      }
    },
    teams () {
      return this.$store.state.teams
    },
    selectedTeam: {
      get: function () {
        return this.$store.state.teams.find(team => {
          const user = {
            team_id: team.id,
            slug: team.slug
          }
          this.$store.dispatch('setUser', user)
          return team.slug === this.$route.params.slug
        })
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
      }
    }
  },
  watch: {
    selectedTeam (newValue, oldValue) {
      this.teamLogo = '/static/color-team-logos/' + newValue.logo_color
      this.greyLogo = '/static/washedout-team-logo/' + newValue.logo_grey
    }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

@import '../assets/less/utils/variables.less';
main{
  display:flex;
  flex-direction:row;
}
.round{
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:200px;
  list-style:none;
  padding:0;
}
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }

/*
 *  General Styles
*/
body{
  font-family:sans-serif;
  font-size:small;
  padding:10px;
  line-height:1.4em;
}

li.game{
  padding-left:20px;
}

  li.game.winner{
    font-weight:bold;
  }
  li.game span{
    float:right;
    margin-right:5px;
  }

  li.game-top{ border-bottom:1px solid #aaa; }

  li.game-spacer{
    border-right:1px solid #aaa;
    min-height:40px;
  }

  li.game-bottom{
    border-top:1px solid #aaa;
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
    li {
      text-decoration: none;
      list-style: none;
      text-align: left;
      padding-left: 2rem;
      height: 3rem;
      display: flex;
      align-items: center;

      &:nth-child(even) {
        background-color: grey;
        color: #fff;
      }
      &:hover {
        background-color: black;
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
