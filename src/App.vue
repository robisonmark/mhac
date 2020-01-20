<template>
  <div id="app" :class="this.$route.meta.section" @click="clickAway()">
    <headerComponent :styles="cssVars"></headerComponent>
    <router-view class="body" />
    <footer>

    </footer>
  </div>
</template>

<script>
// api
import { api } from './api/endpoints.js'

// components
import headerComponent from '@/components/header'

export default {
  name: 'App',
  data () {
    return {
      teamManagement: Boolean,
      styles: {
        navColor: '#0C4B75'
      }
    }
  },
  components: {
    'headerComponent': headerComponent
  },
  computed: {
    cssVars () {
      let teamMain = ''
      if (this.$route.meta.section === 'team') {
        this.$store.state.teams.forEach(team => {
          if (team.id === this.$store.state.user.team_id) {
            teamMain = '#' + team.main_color
          }
        })
        return {
          '--bg-color': teamMain
        }
      } else {
        return {
          '--bg-color': '#0C4B75'
        }
      }
    }
    // checkRouteLoc () {
    //   if (this.$route)
    // },
  },
  watch: {
  },
  created () {
    this.$router.options.routes.forEach((route) => {
      if (route.children) {
        route.children.forEach((child) => {
          // console.log(child.name === this.$route.name)
          if (child.name === this.$route.name) {
            this.teamManagement = true
          } else {
            this.teamManagement = false
          }
        })
      //   this.teamManagement = true
      // } else {
      //   this.teamManagement = false
      }
    })

    this.initCurrentSeason()

    this.initTeams()

    this.initLevels()

    this.initSchedule()

    // if (this.teamManagement) {
    //   this.styles = {
    //     navColor: '#B42625'
    //   }
    // } else {
    //   this.styles = {
    //     navColor: '#0C4B75'
    //   }
    // }
  },
  methods: {
    initCurrentSeason () {
      api.getCurrentSeasons().then(response => {
        this.$store.dispatch('setSeasons', response.data)
      })
    },
    initTeams () {
      api.getTeams().then(response => {
        this.$store.dispatch('setTeams', response.data.team)
      })
    },
    initLevels () {
      api.getLevels().then(response => {
        // console.log(response)
        this.$store.dispatch('setLevels', response.data)
      })
    },
    initSchedule () {
      api.getSchedule().then(response => {
        let fixedData = []
        response.data.forEach(game => {
          if (game.game_time === '12:00 AM ') {
            game.game_time = 'TBD'
          }
          fixedData.push(game)
        })
        this.$store.dispatch('setFullSchedule', fixedData)
      })
    },
    clickAway () {
      this.$root.$emit('close', true)
    }
  }
}
</script>

<style lang="less">
  body {
    min-height: 100vh;
    height: 100%;
  }
  .body {
    // margin-top: 112px;
    // padding-top: 112px;
    padding-top: 7rem;
    color: #021A2B;
  }
 .team {
    background-color: #CFCDCD;
    overflow: auto;
  }
  .public {
    min-height: 100vh;
    margin: 0;
    padding-bottom: 2rem;
    /*Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f4f7f9+0,9fc7e3+21,8cbcde+25,2784c3+100 */
    background: rgb(244,247,249); /* Old browsers */
    background: -moz-linear-gradient(-45deg, rgba(244,247,249,1) 0%, rgba(159,199,227,1) 21%, rgba(140,188,222,1) 25%, rgba(39,132,195,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, rgba(244,247,249,1) 0%,rgba(159,199,227,1) 21%,rgba(140,188,222,1) 25%,rgba(39,132,195,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, rgba(244,247,249,1) 0%,rgba(159,199,227,1) 21%,rgba(140,188,222,1) 25%,rgba(39,132,195,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f4f7f9', endColorstr='#2784c3',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
    background-attachment: fixed;
  }

  .contentPad {
      padding: 0rem 4rem;
    }
</style>
