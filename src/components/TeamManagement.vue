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
    <router-view class="team-management" :style="cssVars" />
    <img class="bottom-logo" src="@/assets/washedout-team-logo/royals-grayscale.png" />
  </div>
</template>

<script>
export default {
  name: 'TeamManagement',
  data () {
    return {
      team: this.$route.params.slug,
      teamLogo: '',
      // teamColor: '#B42625',
      fontSecondary: '#fff'
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
    }
  },
  methods: {
    // Credit to Jose Reyes @ https://codepen.io/jreyesgs/pens/
    /* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
    addLight (color, amount) {
      let cc = parseInt(color, 16) + amount
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
      let cc = parseInt(color, 16) - amount
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@teamColor: var(--bg-color);
@hoverColor: var(--hover-color);
@activeColor: var(--active-color);
h2 {
  font-size: 1.5rem !important;
}
.con-management {
  // min-height: calc(100vh - 7rem);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 21% auto;
  // grid-auto-rows: minmax(35px, auto);
  .sidebar {
    background-color: #fff;
    .team-logo {
      width: 100%;
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
    max-height: 19rem;
    z-index: 0;
  }
  .team-management {
    padding: 1rem 4rem;
    overflow: auto;
    z-index: 1;
    height: calc(100vh - 7rem);
  }
}
</style>
