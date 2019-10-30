<template>
  <header :style="cssVars">
    <div class="con-logo">
      <router-link :to="{ path: '/'}" class="con-logo">
        <img class="logo" src="../assets/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
      </router-link>
    </div>
    <div class="right">
      <div class="top-hat">
        <nav>
            <a href="">
              <img src="../assets/color-team-logos/blazers-dark.png" alt="Link to Team Site" />
            </a>
            <a href="">
              <img src="../assets/color-team-logos/d1a.png" alt="Link to Team Site" />
            </a>
            <a href="">
              <img src="../assets/color-team-logos/falcons.png" alt="Link to Team Site" />
            </a>
            <a href="">
              <img src="../assets/color-team-logos/heat.png" alt="Link to Team Site" />
            </a>
            <a href="">
              <img src="../assets/color-team-logos/lca.png" alt="Link to Team Site" />
            </a>
            <a href="">
              <img src="../assets/color-team-logos/patriots.png" alt="Link to Team Site" />
            </a>
            <a href="">
              <img src="../assets/color-team-logos/royals.png" alt="Link to Team Site" />
            </a>
            <a href="">
              <img src="../assets/color-team-logos/warriors.png" alt="Link to Team Site" />
            </a>
            <div class="button" @click="showLogin = !showLogin">
              <span>Login</span>
            </div>
            <div v-if="showLogin" class="teamlogin">
              <form v-if="!loggedIn">
                <label for="username">
                  Username
                </label>
                <input type="text" id="username" />
                <label for="password">
                  Password
                </label>
                <input type="text" id="password" />
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
      </div>
      <div class="main-nav">
        <nav>
          <router-link :to="{ path: '/' }">Home</router-link>
          <router-link :to="{ path: '/compliance' }">Compliance</router-link>
          <router-link :to="{ path: '/schedules' }">Schedules</router-link>
          <router-link :to="{ path: '/stats' }">Stats</router-link>
          <router-link :to="{ path: '/schools' }">Schools</router-link>
          <router-link :to="{ path: '/contact' }">Contact</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'headerComponent',
  data () {
    return {
      showLogin: false,
      loggedIn: false
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
    cssVars () {
      return {
        '--bg-color': this.styles.navColor
      }
    }
  },
  watch: {},
  created () {},
  methods: {
    login () {
      this.loggedIn = true
      this.showLogin = false
      this.$router.push('/manage/royals')
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
    width: 100vw;
    z-index: 5;

    .con-logo {
      width: 100%;
      // height: 7rem;
      height: 112px;
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
        a {
          color: #fff;
          text-decoration: none;
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
</style>
