<template>
  <div id="app" :class="this.$route.meta.section" @click="clickAway()">
    <template v-if="this.$route.meta.section !== 'scoreboard'">
      <!-- <headerComponent :styles="cssVars" v-if="this.$route.meta.section !== 'admin'"></headerComponent> -->
      <headerComponent :styles="cssVars"></headerComponent>
      <main>
        <router-view class="body" />
      </main>
      <footer v-if="this.$route.meta.section === 'public'" class="main-footer" id="publicMainFooter">
        <div class="container">
          <div class="row align-items-center">
            <div class="col conference conference-info">
              <img class="conference conference-logo" src="/static/washedout-team-logo/mhac-greyscale.png" />
              <p><a href='https://www.facebook.com/mhacsports' target="_blank"><font-awesome-icon :icon="['fab','facebook-square']" size="3x"></font-awesome-icon></a>  <a href='https://www.instagram.com/mhacsports' target="_blank"><font-awesome-icon :icon="['fab','instagram']" size="3x"></font-awesome-icon></a></p>
              <p>&copy; {{ new Date().getFullYear() }} Midsouth Homeschool Athletic Conference</p>
              <p>All Rights Reserved | Terms of Service | Privacy Policy</p>
            </div>
            <div class="col-md-4">
              <div class="border">
                <img class="robros" src="/static/robros/robros-logo-optimized.png" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </template>
    <template v-else>
      <router-view class="body" />
    </template>
  </div>
</template>

<script>
// api
// import { api } from './api/endpoints.js'

// components
import headerComponent from '@/components/header.vue'

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
    headerComponent: headerComponent
  },
  computed: {
    cssVars () {
      let teamMain = ''
      if (this.$route.meta.section === 'team') {
        this.$store.state.teams.forEach(team => {
          if (team.slug === this.$store.state.user.slug) {
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
  },
  beforeCreate () {
    this.$store.dispatch('setSeasons')

    this.$store.dispatch('setTeams')

    this.$store.dispatch('setTeam')

    this.$store.dispatch('setLevels')

    this.$store.dispatch('setFullSchedule')
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
      }
    })
  },
  methods: {
    clickAway () {
      this.$root.$emit('close', true)
    }
  }
}
</script>

<style lang="less">
@import './assets/less/utils/breakpoints.less';
  body {
    min-height: 100vh;
    height: 100%;
  }
  main {
    position: relative;
  }
  .body {
    color: #021A2B;
  }
 .team {
    background-color: #CFCDCD;
    overflow: hidden;
    margin: 0;
    background-attachment: fixed;
  }
  .public {
    min-height: 100vh;
    margin: 0;
    background: #2784c3; /* Old browsers */
    background: -moz-linear-gradient(-45deg, #2784c3 49%, #1e5799 100%, #2784c3 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, #2784c3 49%,#1e5799 100%,#2784c3 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, #2784c3 49%,#1e5799 100%,#2784c3 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2784c3', endColorstr='#2784c3',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
    background-attachment: fixed;

  }

  .contentPad {
    padding: 0rem 4rem;
  }

  .fixed-footer {
    position: sticky;
    bottom: 1rem;
    text-align: right;
    margin-top: 2rem;
    margin-bottom: 1rem;
    .copy {
      margin-right: .5rem;
      font-size: 10px;
    }
  }

  .main-footer {
    background-color: #2A2A2A;
    height: 405px;
    display: flex;
    align-items: center;

    .conference {

      &-info {
        color: #fff;
        p {
          line-height: 1.5;
          margin-bottom: 0;
        }
      }
      &-logo {
        max-width: 20rem;
        margin-bottom: 2rem;
      }
      @media @phone {
        line-height: 0;
      }
    }
    .border {
      width: 100%;
      display: flex;
      align-items: center;

      &:before {
        content: '';
        width: 3px;
        height: 169px;
        margin-right: 2rem;
        background-color: #fff;
        display: inline-block;
      }
      @media @phone {
        flex-flow: column;
        &:before {
          content: '';
          width: 65%;
          height: 2px;
          background-color: #fff;
          display: block;
          clear: both;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
      }
    }
    .robros {
      width: 100%;
      max-width: calc(100% - 3px - 2rem);
      @media @phone {
        max-width: calc(100% - 3px - 5rem);
      }
    }
  }
</style>
