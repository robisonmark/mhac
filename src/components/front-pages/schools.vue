<template>
  <div class="container">
    <div class="row">
      <div class="logo-color col">
        <img src="@/assets/color-team-logos/royals2.png" alt="Hendersonville Royals"/>
      </div>
      <div class="col-7 top-layer">
        <div class="content-container">
        </div>
      </div>
      <div class="team-info">
        <div class="top">
          <a href="hendsonvilleroyals.com">hendsonvilleroyals.com</a>
          <span class="location">Hendersonville, Tn</span>
        </div>
        <div class="bottom">
          <h5>Home Gym</h5>
          <a href="">
            106 Gallatin Pike N
            Madison, Tn 37115
          </a>
        </div>
      </div>
    </div>
    <div class="bottom-logo">
      <img class="bottom-logo" src="@/assets/washedout-team-logo/royals-grayscale.png" />
    </div>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'

export default {
  name: 'schools',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch: {
    $route (to, from) {
      this.initSchool()
    }
  },
  created () {
    this.initSchool()
  },
  methods: {
    initSchool () {
      const slug = this.$route.params.school
      // console.log(this.$route)
      api.getTeams(slug).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.logo-color {
  height: 25rem;
  min-width: 20rem;
  width: 16%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  position: sticky;
  top: 130px;
  z-index: 2;
  // margin-top: 1rem;
  img {
    height: 72%;
  }
}
.content-container {
  width: 100%;
  border-radius: 15px;
  height: 152vh;
  background-color: #0C4B75;
  margin-top: 3rem;
  margin-left: -2rem;
}
.team-info {
  width: 16%;
  position: sticky;
  right: 1rem;
  text-align: right;
  top: 180px;
  height: 290px;
  color: #fff;
  a{
    color: #fff;
  }
}
.top-layer {
  z-index: 1;
}
.bottom-logo {
    position: fixed;
    right: 0;
    bottom: 0;
    max-height: 30rem;
    z-index: 0;
    opacity: .6;
  }
</style>
