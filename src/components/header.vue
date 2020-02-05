<template>
  <header :style="styles">
    <div class="container container--header">
      <div class="con-logo">
        <router-link :to="{ path: '/'}" class="">
          <img class="logo" src="/static/color-team-logos/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
        </router-link>
      </div>
      <div class="right">
        <div class="top-hat">
          <nav class="schoolNav">
            <div class="mobile-drop" @click="collapse = !collapse">

              <div>Members <font-awesome-icon :icon="['fas', 'chevron-down']"></font-awesome-icon></div>
            </div>
    <!-- <div class="con-logo">
      <router-link :to="{ path: '/'}" class="con-logo">
        <img class="logo" src="/static/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
      </router-link>
    </div>
    <div class="right">
      <div class="top-hat">
        <nav class="largeScreen"> -->
          <div class="schoolMenuCon" :class="[collapse === true ? 'collapse' : 'open']">
            <ul class="top-hat__list" :class="[collapse === true ? 'collapse' : 'open']">
              <!-- <img v-show="!collapse" class="logo" src="/static/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" /> -->
              <li>
                <a href="http://www.wkytrailblazers.com/">
                  <img src="/static/color-team-logos/blazers.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <a href="https://d1academy.org/">
                  <img src="/static/color-team-logos/d1a.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <a href="http://cca-huntsville.org/">
                  <img src="/static/color-team-logos/falcons.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <a href="https://tnheatsports.com/">
                  <img src="/static/color-team-logos/heat.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <a href="https://lifechristianacademy.org/">
                  <img src="/static/color-team-logos/lca.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <a href="http://patriot-basketball.com/">
                  <img src="/static/color-team-logos/patriots.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <a href="http://hendersonvilleroyals.com/">
                  <img src="/static/color-team-logos/royals.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <a href="https://www.nccwarriors.com/">
                  <img src="/static/color-team-logos/warriors.png" alt="Link to Team Site" />
                </a>
              </li>
              <li>
                <div class="button" @click="toggleLogin" ref="showLogin">
                  <span v-if="!loggedIn">Login</span>
                  <span v-else>Hi, AD <font-awesome-icon :icon="['fas', 'chevron-circle-down']"></font-awesome-icon></span>
                </div>
              </li>
            </ul>
          </div>

            <div v-if="showLogin" class="teamlogin" ref="teamlogin">
              <form v-if="!loggedIn">
                <label for="username">
                  Username
                </label>
                <input type="text" id="username" v-model="username" @click.stop />
                <label for="password">
                  Password
                </label>
                <input type="password" id="password" v-model="password" @click.stop />
                <button @click.prevent.stop="login()" class="login">
                  <font-awesome-icon :icon="['fas', 'basketball-ball']" :class="{'animate': thinking}"></font-awesome-icon> Login
                </button>
              </form>
              <div v-else class="text-right">
                <!-- <router-link :to="{name: 'teamDashboard', params: { slug: team.slug.toLowerCase() }}">Go To Team Dashboard</router-link> -->
                <router-link :to="{name: 'teamDashboard', params: { slug: 'hendersonville_royals' }}">Go To Team Dashboard</router-link>
                <button @click.prevent="signout()" class="login">
                  <font-awesome-icon :icon="['fas', 'basketball-ball']"></font-awesome-icon> Signout
                </button>
              </div>
            </div>
          </nav>
        </div>
        <div class="main-nav" :class="[openMenu ? 'open' : 'close']">
          <div class="hamburger" @click="openMenu = !openMenu">
            <font-awesome-icon :icon="openMenu ? ['fas', 'times'] : ['fas', 'bars']" class="icon"></font-awesome-icon>
          </div>
          <nav :class="[openMenu ? 'open' : 'close']">
            <router-link :to="{ path: '/' }">Home</router-link>
            <router-link :to="{ path: '/tournament2020' }">Tournament Central</router-link>
            <router-link :to="{ path: '/compliance' }">Compliance</router-link>
            <router-link :to="{ path: '/schedules' }">Schedules</router-link>
            <router-link :to="{ path: '/stats' }">Stats</router-link>
            <span class="dropdown" @click="displayDrop" ref="schoolDropDown"  @mouseover="showSchools = true" @mouseleave="showSchools = false">
            <!-- <div class="dropdown" @click="showSchools = !showSchools" ref="schoolDropDown"> -->
              Schools <font-awesome-icon class="dropIcon" v-if="showSchools === false " :icon="['fas', 'angle-down']"></font-awesome-icon> <font-awesome-icon class="dropIcon" v-if="showSchools === true " :icon="['fas', 'angle-up']"></font-awesome-icon>
              <ul v-show="showSchools" class="nav_dropdown">
                <router-link v-for="team in teams" :key="team.id" :to="{ name: 'schools', params: { slug: team.slug.toLowerCase(), school: team.team_name.toLowerCase(), id: team.id }}" tag="li">
                  {{team.team_name}}
                  <!-- <span class="imgCon"><img :src="'/static/color-team-logos/' + team.logo_color" :alt="team.team_name + ' ' + team.team_mascot"/></span> -->
                </router-link>
              </ul>
            </span>
            <!-- <router-link :to="{ path: '/contact' }">Contact</router-link> -->
          </nav>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import { api } from '@/api/endpoints'
import _ from 'lodash'

export default {
  // login: markrobison630@gmail.com
  // pw: Baller.03
  name: 'headerComponent',
  data () {
    return {
      collapse: true,
      openMenu: false,
      showLogin: false,
      // loggedIn: false,
      showSchools: false,
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
        // let auth =
        return this.$store.getters.authenticated !== ''
      },
      set: function () {

      }
    }
  },
  filters: {
  },
  watch: {},
  created () {
    this.$root.$on('close', payload => {
      this.showLogin = false
      // this.collapse = false
      // this.open = false
    })
  },
  methods: {
    displayDrop () {
      this.showSchools = !this.showSchools
    },
    toggleLogin () {
      let isOpen = _.cloneDeep(this.showLogin)
      // this.$root.$emit('close')

      // this.open = !isOpen
      window.setTimeout(() => {
        this.showLogin = !isOpen
      }, 1)
    },
    checkMouse () {
      // window.setTimeout(() => {
      //   this.showSchools = false
      // }, 500)
    },
    slugCase (value) {
      if (!value) return ''
      value.toLowerCase()
      value = value.replace(' ', '_')
      value = value.replace(' ', '_')
      return value
    },
    closeOpenOption (open) {
      this[open] = false
    },
    login () {
      this.thinking = true
      // this.$router.push('/manage/chattanooga_patriots')
      api.login(this.username, this.password).then(response => {
        // console.log(response)
        this.loggedIn = true
        this.showLogin = false
        this.$store.dispatch('setAuth', response.data.token)
        this.$router.push('/manage/hendersonville_royals')
      })
        .catch(err => {
          console.log(err)
        })
    },
    signout () {
      this.loggedIn = false
      this.$store.dispatch('setAuth', '')
      if (this.$route.meta.section !== 'public') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../assets/less/utils/variables.less';
  @import '../assets/less/utils/breakpoints.less';
  header {
    // display: grid;
    // grid-template-columns: minmax(10rem, 21%) auto;
    // grid-auto-rows: minmax(35px, auto);

    position: sticky;
    top: 0;
    width: 100%;
    z-index: 5;
    background: var(--bg-color);

    @media @phone {

    }

    .container--header {
      height: 7rem;
      display: flex;
      justify-content: space-between;
    }
    .con-logo {
      // width: 100%;
      // height: 100%;
      // height: 7rem;
      // height: 112px;
      // background-color: #fff;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 6rem 0 rem;
      // left: -4%;
      // left: 0;
      // transform: skew(-45deg);
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
      // &:after {
      //   content: '';
      //   display: block;
      //   width: 0;
      //   height: 0;
      //   position: absolute;
      //   top: 0;
      //   left: 100%;
      //   border-top: 7rem solid #fff;
      //   border-right: 7rem solid transparent;
      // }
      .logo {
        max-width: 14rem;
        height: auto;
        // position: absolute;
        // right: 0;
        width: 90%;
      }
    }
    .right {
      display: grid;
      grid-auto-rows: 2.5rem 4.5rem;
      flex-grow: 1;
      // max-width: 825px;
      // padding-right: 1rem;
      // position: relative;
      // &:before {
      //   border-top: 7rem solid #fff;
      //   border-right: 7rem solid transparent;
      //   content: '';
      //   display: block;
      //   width: 0;
      //   height: 0;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      // }
    }
    .top-hat {
      height: 100%;
      // background-color: #fff;
      display: flex;
      flex-flow: row;
      align-items: center;
      // align-items: stretch;
      // width: 100%;
      // justify-content: center;
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
        /* flex-grow: 1; */
        height: 100%;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 0; // Fix for margin-block-end in chrome
        li {
          // height: 85%;
          // height: 1.35rem;
          height: 2.25rem;
          padding: 0 1rem;
          box-sizing: content-box;
          div {
            height: 2.25rem;
          }
          img {
            // height: 100%;
            max-height: 95%;
            max-width: 3rem;
            vertical-align: bottom;
          }
          &:last-child {
            padding-right: 0;
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
        // display: none;
        nav {
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: center;
          position: static;
        }
        .mobile-drop {
          z-index: 3;
          // background: #fff;
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
          // max-width: 80%;
          // text-align: center;
        }
        ul{
          z-index: 1;
          flex-flow: row wrap;
          position: absolute;
          // background: #fff;
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
            // padding: 1rem .5rem;
            height: 50px;
            box-sizing: border-box;
            position: relative;
            flex: 0 1 auto;
            flex-grow: 1;
            background: #fff;
            a {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              // div {
              //   position: relative;
                img {
                  // height: 100%;
                  // width: 100%;
                  // max-width: 50px;
                  // max-height: 36px;
                  max-width: 6rem;
                }
              // }
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
                // transition: height .5s cubic-bezier(0.075, 0.82, 0.165, 1);
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
            // top: -9999px;

            // display: none;
          }
          &.open {
            transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            // top: 2.5rem;

          }
        }
      // }

      @media @phone {
        ul {
          width: 100%;
        }
      }
    }

    .main-nav {
      height: 100%;
      // background-color: #fff;
      display: flex;
      flex-flow: row;
      z-index: 1;
      // align-items: stretch;
      // width: 100%;
      // justify-content: center;

      nav {
        display: flex;
        // flex-direction: column;
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
          // position: relative;
          // height: 100%;
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
          height: 100%;
          flex-grow: 1;
          // &.router-link-exact-active{
          &:hover{
            background-color: #fff;
            color: var(--bg-color);
            font-weight: 600;
          }
        }

        .nav_dropdown {
          // position: fixed;
          //   width: 200px;
          // background: rgba(255,255,255, 0.95);
          color: #2A2A2A;
          // top: 39px;
          top: 4.5rem;
          // top: 7rem;
          box-shadow: 0 3px 5px rgba(1, 2, 2, 0.2), 0 0px rgba(0, 0, 0, 0.15);
          // width: 250px;
          right: 0;
          // width: 100%;
          // columns: 2;
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
              // content: '';
              // display: inline-block;
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
              // background-color: rgba(12, 75, 117, .2)
            }
          }
        }
      }
      .hamburger {
        display: none;
      }

       @media @tablet-max {
        // position: relative;
        // left: 0;
        // width: 100%;
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
          // position: fixed;
          right: 1rem;
          // transform: translate(0px, 1rem);
          .icon {
            height: 1.5rem;
            width: 1.5rem;
            height: 1.5rem;
            width: 1.5rem;
            right: 1rem;
            // transform: rotate(-45deg);
            // transform-origin: center;
          }
        }
        .close {
          // display: none !important;
          position: absolute;
          left: 0;
          top: 7rem;
          background-color: var(--bg-color);
          flex-flow: column;
          height: 0;
          overflow: hidden;
          // transform: rotate(-135deg) translate3d(-38px, 445px, 0px);
          // transform: rotate(-135deg) translate3d(87px, 0px, 0px);
          transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
          // transform-origin: top right;
        }

        .open {
          position: absolute;
          left: 0;
          top: 7rem;
          background-color: var(--bg-color);
          flex-flow: column;
          // height: calc(100vh - 7rem);
          height: 200px;
          transform: rotate(0) translate3d(0px, 0px, 0px);
          transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
          // transform-origin: top right;
          .icon {
             transform: rotate(0)
          }
          .dropdown {
            position: relative;
            ul {
              position: absolute;
              left: 0;
              top: 35px;
              font-size: 14px;
              li {
                max-height: 35px;
              }
            }
          }
        }
        nav a,
        nav span {
            // height: auto;
            flex-grow: 0;
            justify-content: flex-start;
                padding-left: 1rem;
          }
      }

      @media @phone {
        // width: 250px;
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
    // border-radius: 5px;
    // transform: skewX(-45deg);
    &:hover {
      background-color: @nav-blue;
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
</style>
