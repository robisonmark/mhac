<template>
  <header :style="styles">
    <div class="container">
      <div class="con-logo">
        <router-link :to="{ path: '/'}" class="">
          <img class="logo" src="../assets/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
        </router-link>
      </div>
      <div class="right">
        <div class="top-hat">
          <nav class="schoolNav">
            <div class="mobile-drop" @click="collapse = !collapse">
              <img v-show="!collapse" class="logo" src="../assets/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
              <div>Schools <font-awesome-icon :icon="['fas', 'chevron-down']"></font-awesome-icon></div>
            </div>
            <ul class="top-hat__list" :class="[collapse === true ? 'collapse' : 'open']">
              <li>
                <a href="http://www.wkytrailblazers.com/">
                  <div>
                    <img src="../assets/color-team-logos/blazers.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
              <li>
                <a href="https://d1academy.org/">
                  <div>
                    <img src="../assets/color-team-logos/d1a.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
              <li>
                <a href="http://cca-huntsville.org/">
                  <div>
                    <img src="../assets/color-team-logos/falcons.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
              <li>
                <a href="https://tnheatsports.com/">
                  <div>
                    <img src="../assets/color-team-logos/heat.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
              <li>
                <a href="https://lifechristianacademy.org/">
                  <div>
                    <img src="../assets/color-team-logos/lca.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
              <li>
                <a href="http://patriot-basketball.com/">
                  <div>
                    <img src="../assets/color-team-logos/patriots.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
              <li>
                <a href="http://hendersonvilleroyals.com/">
                  <div>
                    <img src="../assets/color-team-logos/royals.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.nccwarriors.com/">
                  <div>
                    <img src="../assets/color-team-logos/warriors.png" alt="Link to Team Site" />
                  </div>
                </a>
              </li>
            </ul>
              <!-- <div class="button" @click="showLogin = !showLogin" ref="showLogin">
                <span>Login</span>
              </div> -->
              <div v-if="showLogin" class="teamlogin" ref="teamlogin">
                <form v-if="!loggedIn">
                  <label for="username">
                    Username
                  </label>
                  <input type="text" id="username" v-model="username" />
                  <label for="password">
                    Password
                  </label>
                  <input type="password" id="password" v-model="password" />
                  <button @click.prevent="login()">
                    Login
                  </button>
                </form>
                <div v-else>
                  <button @click.prevent="signout()">
                    Signout
                  </button>
                </div>
              </div>
          </nav>

          <!-- <nav class="mobileScreen">
            <div class="dropdown">
              <a href="http://www.wkytrailblazers.com/">
                <img src="../assets/color-team-logos/blazers.png" alt="Link to Team Site" />
              </a>
              <a href="https://d1academy.org/">
                <img src="../assets/color-team-logos/d1a.png" alt="Link to Team Site" />
              </a>
              <a href="http://cca-huntsville.org/">
                <img src="../assets/color-team-logos/falcons.png" alt="Link to Team Site" />
              </a>
              <a href="https://tnheatsports.com/">
                <img src="../assets/color-team-logos/heat.png" alt="Link to Team Site" />
              </a>
              <a href="https://lifechristianacademy.org/">
                <img src="../assets/color-team-logos/lca.png" alt="Link to Team Site" />
              </a>
              <a href="http://patriot-basketball.com/">
                <img src="../assets/color-team-logos/patriots.png" alt="Link to Team Site" />
              </a>
              <a href="http://hendersonvilleroyals.com/">
                <img src="../assets/color-team-logos/royals.png" alt="Link to Team Site" />
              </a>
              <a href="https://www.nccwarriors.com/">
                <img src="../assets/color-team-logos/warriors.png" alt="Link to Team Site" />
              </a>
              <div class="button" @click="showLogin = !showLogin" ref="showLogin">
                <span>Login</span>
              </div>

            </div>
            <div v-if="showLogin" class="teamlogin" ref="teamlogin">
                <form v-if="!loggedIn">
                  <label for="username">
                    Username
                  </label>
                  <input type="text" id="username" v-model="username" />
                  <label for="password">
                    Password
                  </label>
                  <input type="password" id="password" v-model="password" />
                  <button @click.prevent="login()">
                    Login
                  </button>
                </form>
                <div v-else>
                  <button @click.prevent="signout()">
                    Signout
                  </button>
                </div>
              </div>
          </nav> -->
        </div>
        <div class="main-nav">
          <nav>
            <!-- <ul> -->
              <!-- <li> -->
                <router-link :to="{ path: '/' }">Home</router-link>
              <!-- </li> -->
              <!-- <li> -->
                <router-link :to="{ path: '/compliance' }">Compliance</router-link>
              <!-- </li> -->
              <!-- <li> -->
                <router-link :to="{ path: '/schedules' }">Schedules</router-link>
              <!-- </li> -->
              <!-- <li> -->
                <router-link :to="{ path: '/stats' }">Stats</router-link>
              <!-- </li> -->
              <!-- <li> -->
                <div class="dropdown" @click="showSchools = !showSchools" ref="schoolDropDown"  @mouseover="showSchools = true" @mouseleave="showSchools = false">
                <!-- <div class="dropdown" @click="showSchools = !showSchools" ref="schoolDropDown"> -->
                  Schools <font-awesome-icon class="dropIcon" v-if="showSchools === false " :icon="['fas', 'angle-down']"></font-awesome-icon> <font-awesome-icon class="dropIcon" v-if="showSchools === true " :icon="['fas', 'angle-up']"></font-awesome-icon>
                  <ul v-show="showSchools" class="nav_dropdown">
                    <router-link v-for="team in teams" :key="team.id" :to="{ name: 'schools', params: { slug: team.slug.toLowerCase(), school: team.team_name.toLowerCase(), id: team.id }}" tag="li">{{team.team_name}}</router-link>
                  </ul>
                </div>
              <!-- </li> -->
            <!-- </ul> -->
            <!-- <router-link :to="{ path: '/contact' }">Contact</router-link> -->
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import { api } from '@/api/endpoints'

export default {
  // login: markrobison630@gmail.com
  // pw: Baller.03
  name: 'headerComponent',
  data () {
    return {
      collapse: true,
      showLogin: false,
      loggedIn: false,
      showSchools: false,
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
    }
  },
  filters: {
  },
  watch: {},
  created () {},
  methods: {
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
      this.$router.push('/manage/chattanooga_patriots')
      // api.login(this.username, this.password).then(response => {
      //   this.loggedIn = true
      //   this.showLogin = false
      //   this.$store.dispatch('setAuth', response.data.token)
      //   this.$router.push('/manage/royals')
      // })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    signout () {
      this.loggedIn = false
      this.$router.push('/')
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

    .container {
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
      padding: 0 6rem 0 2rem;
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
      max-width: 825px;
      padding-right: 1rem;
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
      background-color: #fff;
      display: flex;
      flex-flow: column;
      align-items: stretch;
      width: 100%;
      justify-content: center;
      &:before {
          content: '';
          height: 2.5rem;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #fff;
      }
      .mobile-drop {
        display: none;
      }
      ul {
        li {
          // height: 85%;
          // height: 1.35rem;
          height: 2.25rem;
          padding: 5px 7px;
          box-sizing: content-box;
          div {
            height: 2.25rem;
          }
          img {
            height: 100%;
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

      @media @phone {
        nav {
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .mobile-drop {
          z-index: 3;
          background: #fff;
          height: 2.5rem;
          width: 100%;
          display: flex;
          position: absolute;
          justify-content: space-around;
          top: 0;
          left: 0;
          align-items: center;
          img {
            height: 1.5rem;
          }
          // max-width: 80%;
          // text-align: center;
        }
        ul{
          z-index: 1;
          flex-flow: row wrap;
          position: absolute;
          background: #fff;
          top: 2.5rem;
          left: 0;
          width: 100%;
          height: auto;
          align-items: flex-start;
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
            a {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              div {
                position: relative;
                img {
                  height: 100%;
                  width: 100%;
                  max-width: 50px;
                  max-height: 36px;
                }
              }
            }
          }

          &.collapse {
            transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            top: -9999px;
            // display: none;
          }
          &.open {
            transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
    }

    .main-nav {
      // background-color: var(--bg-color);
      // display: flex;
      // justify-content: center;
      display: flex;
      flex-flow: column;
      align-items: stretch;
      width: 100%;
      nav {
        // height: 100%;
        // li{
          // display: flex;
          //   justify-content: center;
          //   align-items: center;
          //   height: 100%;

          a,
          div {
            color: #fff;
            text-decoration: none;
            // position: relative;
            // height: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;
          }
          div {
            display: inline-block;
          }
        // }
        .nav_dropdown {
          position: absolute;
        //   width: 200px;
          background: white;
          color: #021A2B;
        //   // top: 39px;
        //   top: 55px;
          box-shadow: 2px 2px 10px #021A2B;
        //   width: 250px;
          li {
            padding: 3px 15px;
            cursor: pointer;
            &:hover {
              background-color: rgba(12, 75, 117, .2)
            }
          }
        }
      }
    }

    ul.top-hat__list {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      // width: 81%;
      // width: calc(1380px - 21% - 100px);
      // width: 75%;
      position: relative;
      // left: 100px;
    }
  }
  .button {
    background-color: @conf-blue;
    color: #fff;
    padding: .3125rem .625rem;
    // border-radius: 5px;
    // transform: skewX(-45deg);
    &:hover {
      background-color: @nav-blue;
    }
  }

  .dropdown {
    cursor: pointer;
    .dropIcon {
      margin-left: .5rem;
    }
  }
</style>
