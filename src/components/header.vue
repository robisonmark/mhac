// TODO: Clickaway on menu
<template>
  <header :style="styles">
    <div class="container container--header">
      <div class="con-logo">
        <router-link :to="{ path: '/'}" class="">
          <img class="logo" src="/static/color-team-logos/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
        </router-link>
      </div>
      <div class="flex-spacer"></div>
      <div class="right">
        <div class="top-hat">
          <nav class="schoolNav">
            <div class="mobile-drop" @click="collapse = !collapse">
              <div>Members <font-awesome-icon :icon="['fas', 'chevron-down']"></font-awesome-icon></div>
            </div>
            <div class="schoolMenuCon" :class="[collapse === true ? 'collapse' : 'open']">
              <ul class="top-hat__list" :class="[collapse === true ? 'collapse' : 'open']">
                <li><div class="flex-spacer"></div></li>
                <li>
                  <a href="https://www.facebook.com/people/Bluegrass-Blazers-Homeschool-Basketball/100084579375555/?mibextid=LQQJ4d">
                    <img src="/static/color-team-logos/blazersLogo.png" alt="Link to Team Site" />
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com/uppercumberlandrams/">
                    <img src="/static/color-team-logos/rams.png" alt="Link to Team Site" />
                  </a>
                </li>
                <li>
                  <a href="http://cca-huntsville.org/">
                    <img src="/static/color-team-logos/rocket_city_falcons_logo.png" alt="Link to Team Site" />
                  </a>
                </li>
                <li>
                  <a href="https://tnheatsports.com/">
                    <img src="/static/color-team-logos/heat.png" alt="Link to Team Site" />
                  </a>
                </li>
                <li>
                  <a href="https://www.bradleyknights.org/">
                    <img src="/static/color-team-logos/KnightsLogo.png" alt="Link to Team Site" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="/static/color-team-logos/patriots.png" alt="Link to Team Site" />
                  </a>
                </li>
                <li>
                  <a href="https://www.nccwarriors.com/">
                    <img src="/static/color-team-logos/warriors.png" alt="Link to Team Site" />
                  </a>
                </li>
                <li class="button button--login" @click="goToLogin()" ref="showLogin">
                  <span v-if="!loggedIn">Login</span>
                  <span v-else>
                    <template v-if="isPublic">
                      Team Management
                    </template>
                    <template v-else>
                      Logout
                    </template>
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div class="main-nav" :class="[openMenu ? 'open' : 'close']">
          <div class="hamburger" @click="openMenu = !openMenu">
            <font-awesome-icon :icon="openMenu ? ['fas', 'times'] : ['fas', 'bars']" class="icon"></font-awesome-icon>
          </div>
          <nav :class="[openMenu ? 'open' : 'close']">
            <!-- Min Menu Items is 4 and a flex spacer -->
            <div class="flex-spacer"></div>
            <router-link :to="{ path: '/' }">Home</router-link>
            <span class="dropdown" @click="tournamentDrop" ref="tournamentDropDown" @mouseover="showTournament = true" @mouseleave="showTournament = false">
              Tournament Central<font-awesome-icon class="dropIcon" v-if="showTournament === false " :icon="['fas', 'angle-down']"></font-awesome-icon><font-awesome-icon class="dropIcon" v-if="showTournament" :icon="['fas', 'angle-up']"></font-awesome-icon>
                <ul v-show="showTournament" class="tourn_nav_dropdown">
                  <li><router-link :to="{ path: '/tournament'}">General Information</router-link> </li>
                  <li><router-link :to="{ path: '/tournament-brackets'}">Brackets</router-link></li>
                  <li><a href='https://jonland.smugmug.com/Event-Coverage-Root/Athletics/MHAC-2023/n-pM7CKV' target='_blank'>Tournament Photos 2023<font-awesome-icon class="dropIcon" v-if="showSchools === false " :icon="['fas', 'external-link-alt']"></font-awesome-icon></a></li>
                  <!-- https://www.dropbox.com/sh/dmk75k6rt0fu990/AABI6z3OksFGHMDbBG58A_tna?dl=0&fbclid=IwAR2CUwGfeTMck0UdXvsHrKeX1imbhk8DIdV_iPHCaQMpcpoKGnY94nXzqjMnpm  -->
                </ul>
            </span>
            <span class="about_dropdown" @click="aboutDrop" ref="aboutDropdown" @mouseover="showAbout = true" @mouseleave="showAbout = false">
              About<font-awesome-icon class="dropIcon" v-if="showAbout === false " :icon="['fas', 'angle-down']"></font-awesome-icon>
              <ul v-show="showAbout" class="about_nav_dropdown">
                  <li><router-link :to="{ path: '/about' }">Who We Are</router-link></li>
                  <li><a href="https://mhac-media-docs.s3.us-east-2.amazonaws.com/MHAC+Bylaws+March+2021.pdf" target="_blank">Bylaws  <font-awesome-icon v-if="showSchools === false " :icon="['fas', 'external-link-alt']"></font-awesome-icon> </a></li>
                  <li><router-link :to="{ path: '/hall-of-fame' }">Past Champions</router-link></li>
                  <li><a href="https://nchclive.com" target="_blank">NCHBC <font-awesome-icon v-if="showSchools === false " :icon="['fas', 'external-link-alt']"></font-awesome-icon> </a></li>
              </ul>
            </span>
            <router-link :to="{ path: '/schedules' }">Schedules</router-link>
            <span class="dropdown" @click="displayDrop" ref="schoolDropDown"  @mouseover="showSchools = true" @mouseleave="showSchools = false">
              Rosters <font-awesome-icon class="dropIcon" v-if="showSchools === false " :icon="['fas', 'angle-down']"></font-awesome-icon>
              <!-- <font-awesome-icon class="dropIcon" v-if="showSchools === true " :icon="['fas', 'angle-up']"></font-awesome-icon> -->              <ul v-show="showSchools" class="nav_dropdown">
                <router-link v-for="team in teams" :key="team.id" :to="{ name: 'schools', params: { slug: team.slug.toLowerCase(), school: team.team_name.toLowerCase(), id: team.id }}" tag="li">
                  {{team.team_name}}
                </router-link>
              </ul>
            </span>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import _ from 'lodash'

// import { Auth } from 'aws-amplify'
import { signOut } from 'aws-amplify/auth';
// import { useAuthenticator } from '@aws-amplify/ui-vue';
// const Auth = useAuthenticator();

export default {
  name: 'headerComponent',
  data () {
    return {
      collapse: true,
      openMenu: false,
      showLogin: false,
      showSchools: false,
      showTournament: false,
      showAbout: false,
      thinking: false,
      username: '',
      password: ''
    }
  },
  mixins: [],
  props: [
    'styles'
  ],
  components: {},
  computed: {
    routes () {
      return false
    },
    teams () {
      return this.$store.state.teams
    },
    loggedIn: {
      get: function () {
        return this.$store.getters.loggedIn
      },
      set: function () {

      }
    },
    isPublic () {
      return this.$route.meta.section === 'public'
    }
  },
  methods: {
    checkMouse () {
    },
    closeOpenOption (open) {
      this[open] = false
    },
    displayDrop () {
      this.showSchools = !this.showSchools
    },
    tournamentDrop () {
      this.showTournament = !this.showTournament
    },
    aboutDrop () {
      this.showAbout = !this.showAbout
    },
    goToLogin () {
      if (!this.loggedIn) {
        if (this.$route.name !== 'login') {
          this.$router.push({ name: 'login' })
        }
      } else {
        if (this.isPublic) {
          if (!this.userGroups || this.$store.getters.team) {
            this.signout()
            this.$router.push({name: 'login'})
          }
          if (this.userGroups?.includes('Admin')) {
            this.$router.push({name: 'admin'})
          } else {
            const team = this.$store.getters.team
            console.log(team)
            this.$router.push({ name: 'teamDashboard', params: { slug: team } })
          }
          
        } else {
          this.signout()
        }
      }
      this.collapse = true
    },
    slugCase (value) {
      if (!value) return ''
      value.toLowerCase()
      value = value.replace(' ', '_')
      value = value.replace(' ', '_')
      return value
    },
    async signout () {
      try {
        await signOut().then(() => {
          this.$store.commit('set_valid', false)
          this.$store.commit('set_loggedIn', false)
          if (this.$route.meta.section !== 'public') {
            this.$router.push('/')
          }
        })
      } catch (error) {
        console.log('error signing out: ', error);
      }
      // await Auth.signOut({ global: true })
        // .then(() => {
        //   this.$store.commit('set_valid', false)
        //   this.$store.commit('set_loggedIn', false)
        //   if (this.$route.meta.section !== 'public') {
        //     this.$router.push('/')
        //   }
        // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../assets/less/utils/variables.less';
  @import '../assets/less/utils/breakpoints.less';
  .team .con-logo {
    left: 1rem;
  }

  .flex-spacer {
    flex-grow: 1;
  }

  header {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 5;
    background: var(--bg-color);

    .container {
      padding: 0rem !important; // vuetify overide
    }

    .container--header {
      height: 7rem;
      display: flex;
      justify-content: space-between;
    }
    .con-logo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 6rem 0 0rem;
      position: absolute;
      height: 7rem;
      z-index: 2;

      &:before {
        content: '';
        display: block;
        transform: skew(-45deg);
        width: 1000px;
        height: 7rem;
        transform-origin: top right;
        position: absolute;
        z-index: -1;
        top: 0;
        right: -15px;
        background: #fff;
      }
      @media @phone {
        padding: 0 4rem 0 1rem;
      }
      .logo {
        max-width: 14rem;
        height: auto;
        width: 90%;
      }
    }
    .right {
      display: grid;
      grid-auto-rows: 2.5rem 4.5rem;
      flex-grow: 1;
    }
    .top-hat {
      height: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      &:before {
          content: '';
          height: 2.5rem;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #fff;
          z-index: 1;
      }
      .mobile-drop {
        display: none;
      }
      & nav {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        z-index: 2;
        flex-grow: 1;
      }
      ul {
        display: flex;
        flex-flow: row;
        height: 100%;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 0; // Fix for margin-block-end in chrome
        li {
          height: 2.25rem;
          padding: 0 1rem;
          box-sizing: content-box;
          div {
            height: 2.25rem;
          }
          img {
            max-height: 95%;
            max-width: 3rem;
            vertical-align: bottom;
          }
        }
      }
      .teamlogin {
        position: absolute;
        top: 40px;
        right: 0;
        background-color: #fff;
        width: auto;
        -webkit-box-shadow: 0px 11px 10px 1px rgba(0,0,0,0.26);
        -moz-box-shadow: 0px 11px 10px 1px rgba(0,0,0,0 .26);
        box-shadow: 0px 11px 10px 1px rgba(0,0,0,0.26);
        z-index: 2;
        padding: 15px;
        text-align: left;
        label,
        button {
          display: block;
        }
        button {
          text-align: right;
        }
      }

      @media @tablet-max {
        nav {
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: center;
          position: static;
        }
        .mobile-drop {
          z-index: 3;
          height: 2.5rem;
          width: 100%;
          display: flex;
          position: absolute;
          justify-content: flex-end;
          top: 0;
          left: 0;
          align-items: center;
          div {
            margin-right: 1rem;
          }
        }
        ul{
          z-index: 1;
          flex-flow: row wrap;
          position: absolute;
          top: 7rem;
          right: 0;
          width: 100%;
          width: 500px;
          align-items: flex-start;

          .logo {
            height: 1.5rem;
            position: absolute;
            left: 1rem;
            top: -2rem;
          }

          li {
            border: 1px solid @conf-blue;
            width: 33.333%;
            padding-bottom: 33.333%;
            height: 50px;
            box-sizing: border-box;
            position: relative;
            flex: 0 1 auto;
            flex-grow: 1;
            background: #fff;
            a, span {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                max-width: 6rem;
              }
            }
          }
        }

        .schoolMenuCon {
          width: 100%;
          position: absolute;
          top: 0;
          right: 0;
          overflow: hidden;
          &.collapse {
            transition: height .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            height: 0;
            ul {
              transition: height .5s cubic-bezier(0.075, 0.82, 0.165, 1);
              height: 0;
            }
          }
          &.open {
            transition: height .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            height: 100vh;
            ul {
              height: auto;
              &:before {
                content: '';
                height: 100vh;
                width: 100vw;
                position: absolute;
                background: rgba(0,0,0, 0.8);
              }
            }
          }
        }

        &.collapse {
          transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &.open {
          transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      @media @phone {
        ul {
          width: 100%;
        }
      }
    }

    .main-nav {
      height: 100%;
      display: flex;
      flex-flow: row;
      z-index: 1;
      flex-shrink: 1;

      &_wrapper {
        width: calc(100% - 13rem);
      }

      nav {
        display: flex;
        position: relative;
        width: 100%;
        z-index: 1;
        flex-grow: 1;
        .icon {
          display: none;
        }
        a,
        span {
          color: #fff;
          text-decoration: none;
          position: relative;
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          max-width: 200px;
          &:hover{
            background-color: #fff;
            color: var(--bg-color);
            font-weight: 600;
          }
          @media @desktop-min {
            max-width: 200px;
          }
        }

        .nav_dropdown {
          color: #2A2A2A;
          top: 4.5rem;
          box-shadow: 0 3px 5px rgba(1, 2, 2, 0.2), 0 0px rgba(0, 0, 0, 0.15);
          right: 0;
          position: absolute;
          width: auto;
          font-weight: 400;
          text-align: right;
          white-space: nowrap;
          background: rgba(255,255,255, 0.95);
          font-size: .9rem;
          letter-spacing: -.2px;
          li {
            padding: .2rem 1rem;
            cursor: pointer;
            font-family: 'Lato';
            &:after {
              height: 1px;
              background: var(--bg-color);
              width: calc(100% + .75rem);
              margin-right: -.5rem;
              float: right;
            }
            .imgCon {
              height: 60px;
              width: 50px
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
            &:hover {
              color: @conf-blue;
            }
          }
        }

        .about_nav_dropdown {
          color: #2A2A2A;
          top: 4.5rem;
          box-shadow: 0 3px 5px rgba(1, 2, 2, 0.2), 0 0px rgba(0, 0, 0, 0.15);
          right: 200;
          position: absolute;
          width: auto;
          font-weight: 400;
          text-align: right;
          white-space: nowrap;
          background: rgba(255,255,255, 0.95);
          font-size: .9rem;
          letter-spacing: -.2px;
          li {
            padding: .2rem 1rem;

            cursor: pointer;
            font-family: 'Lato';
            &:after {
              height: 1px;
              background: var(--bg-color);
              width: calc(100% + .75rem);
              margin-right: -.5rem;
              float: right;
            }
            .imgCon {
              height: 60px;
              width: 50px
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
            &:hover {
              color: @conf-blue;
            }
            a {
              color: #2A2A2A;
              width: calc(100% + .80rem);
            }
          }
        }

        .tourn_nav_dropdown {
          color: #2A2A2A;
          top: 4.5rem;
          box-shadow: 0 3px 5px rgba(1, 2, 2, 0.2), 0 0px rgba(0, 0, 0, 0.15);
          right: 200;
          position: absolute;
          width: auto;
          font-weight: 400;
          text-align: right;
          white-space: nowrap;
          background: rgba(255,255,255, 0.95);
          font-size: .9rem;
          letter-spacing: -.2px;
          li {
            padding: .2rem 1rem;

            cursor: pointer;
            font-family: 'Lato';
            &:after {
              height: 1px;
              background: var(--bg-color);
              width: calc(100% + .75rem);
              margin-right: -.5rem;
              float: right;
            }
            .imgCon {
              height: 60px;
              width: 50px
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
            &:hover {
              color: @conf-blue;
            }
            a {
              color: #2A2A2A;
              width: calc(100% + .80rem);
            }
          }
        }

        ul {
          // TODO: understand individual styles
          width: 100% !important; // This is overwriting individual styles
        }

      }

      .hamburger {
        display: none;
      }

       @media @tablet-max {
        &.open:before {
          content: '';
          height: 100vh;
          width: 100vw;
          position: absolute;
          top: 7rem;
          left: 0;
          background: rgba(0,0,0, 0.8);
        }

        .hamburger {
          color: #fff;
          display: flex;
          align-items: center;
          position: relative;
          width: 100%;
          justify-content: flex-end;
          right: 1rem;
          .icon {
            height: 1.5rem;
            width: 1.5rem;
            height: 1.5rem;
            width: 1.5rem;
            right: 1rem;
          }
        }
        .close {
          position: absolute;
          left: 0;
          top: 7rem;
          background-color: var(--bg-color);
          flex-flow: column;
          height: 0;
          overflow: hidden;
          transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        .open {
          position: absolute;
          left: 0;
          top: 7rem;
          background-color: var(--bg-color);
          flex-flow: column;
          min-height: 100%;
          line-height: 3;
          transform: rotate(0) translate3d(0px, 0px, 0px);
          transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
          .icon {
            transform: rotate(0)
          }
          .dropdown {
            position: relative;
            ul {
              position: relative;
              top: 0;
              font-size: 14px;
              width: calc(100vw + 2rem);
              margin-left: -1rem;
            }
          };

          .about_dropdown {
            position: relative;
            ul {
              position: absolute;
              left: 0;
              top: 35px;
              font-size: 14px;
              position: relative;
              /* left: -1rem; */
              top: 0;
              font-size: 14px;
              width: calc(100vw + 2rem);
              margin-left: -1rem;
              li {
                max-height: 35px;
              }
            }
          };
        }
        nav a,
        nav span {
          flex-grow: 0;
          justify-content: flex-start;
          padding-left: 1rem;
        }
      }

      @media @phone {
        right: 0;
        left: unset;
      }

    }
  }
  .button,
  button,
  [type="button"] {
    background-color: @conf-blue;
    color: #fff;
    padding: .3125rem .625rem;
    border-style: unset;
    white-space: nowrap;
    &:hover {
      background-color: @nav-blue;
      span {
        background-color: @nav-blue;
      }
    }
  }

  .button--login {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    span {
      background-color: @conf-blue;
    }
  }

  @keyframes fa-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}
  .login {
    margin-top: .5rem;
    .animate {
      animation: fa-spin 4s infinite linear;
    }
  }

  .dropdown {
    cursor: pointer;
    .dropIcon {
      margin-left: .5rem;
    }
  }

  .about_dropdown {
    cursor: pointer;
    .dropIcon {
      margin-left: .5rem;
    }
  }
</style>
