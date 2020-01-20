<template>
  <header :style="styles">
    <div class="con-logo">
      <router-link :to="{ path: '/'}" class="con-logo">
        <img class="logo" src="../assets/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
      </router-link>
    </div>
    <div class="right">
      <div class="top-hat">
        <nav class="largeScreen">
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
          <router-link :to="{ path: '/' }">Home</router-link>
          <router-link :to="{ path: '/compliance' }">Compliance</router-link>
          <router-link :to="{ path: '/schedules' }">Schedules</router-link>
          <router-link :to="{ path: '/stats' }">Stats</router-link>
          <div class="dropdown" @click="showSchools = !showSchools" ref="schoolDropDown"  @mouseover="showSchools = true" @mouseleave="showSchools = false">
          <!-- <div class="dropdown" @click="showSchools = !showSchools" ref="schoolDropDown"> -->
            Schools <font-awesome-icon class="dropIcon" v-if="showSchools === false " :icon="['fas', 'angle-down']"></font-awesome-icon> <font-awesome-icon class="dropIcon" v-if="showSchools === true " :icon="['fas', 'angle-up']"></font-awesome-icon>
            <ul v-show="showSchools" class="nav_dropdown">
              <router-link v-for="team in teams" :key="team.id" :to="{ name: 'schools', params: { slug: team.slug.toLowerCase(), school: team.team_name.toLowerCase(), id: team.id }}" tag="li">{{team.team_name}}</router-link>
            </ul>
          </div>
          <!-- <router-link :to="{ path: '/contact' }">Contact</router-link> -->
        </nav>
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
  header {
    display: grid;
    grid-template-columns: 21% auto;
    // grid-auto-rows: minmax(35px, auto);

    position: fixed;
    top: 0;
    width: 100%;
    z-index: 5;
    height: 7rem;

    .con-logo {
      width: 100%;
      height: 100%;
      // height: 7rem;
      // height: 112px;
      background-color: #fff;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      // left: -4%;
      left: 0;
      // transform: skew(-45deg);
      &:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 100%;
        border-top: 7rem solid #fff;
        border-right: 7rem solid transparent;
      }
      .logo {
        max-width: 14rem;
        height: auto;
        position: absolute;
        right: 0;
        width: 90%;
      }
    }
    .right {
      display: grid;
      grid-auto-rows: 2.5rem 4.5rem;
    }
    .top-hat {
      height: 100%;
      background-color: #fff;
      nav {
          a {
            // height: 85%;
            // height: 1.35rem;
            height: 2.25rem;
            padding: 5px 7px;
            box-sizing: content-box;
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
    }

    .main-nav {
      background-color: var(--bg-color);
      nav {
        a,
        div {
          color: #fff;
          text-decoration: none;
          position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

        }
        .nav_dropdown {
          position: absolute;
          width: 200px;
          background: white;
          color: #021A2B;
          // top: 39px;
          top: 55px;
          box-shadow: 2px 2px 10px #021A2B;
          width: 250px;
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

    nav {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      // width: 81%;
      // width: calc(1380px - 21% - 100px);
      width: 75%;
      position: relative;
      left: 100px;
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
