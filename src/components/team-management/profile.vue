<template>
  <div class="hello">
    <h2>Team Profile</h2>

    <form class="container">
      <div class="row">
        <div class="formGroup col-4">
          <label for="school">School/Location</label>
          <input type="text" id="school" v-model="team.team_name" />
        </div>
        <div class="formGroup col-4">
          <label for="mascot">Name/Mascot</label>
          <input type="text" id="mascot" v-model="team.team_mascot" />
        </div>
        <div class="formGroup col-4">
          <label for="website">Website</label>
          <input type="url" id="website" v-model="team.website" />
        </div>
      </div>

      <!-- <div class="row formBlock">
        <div class="formGroup col-5">
          <label for="street_address">Street Address</label>
          <input type="text" id="street_address" v-model="team.team_name"/>
        </div>
        <div class="formGroup col-5 offset-2">
          <label for="address_2">Address 2</label>
          <input type="text" id="address_2" v-model="team.team_name"/>
        </div>
      </div>

      <div class="row">
        <div class="formGroup col-4">
          <label for="city">City</label>
          <input type="text" id="city" v-model="team.team_name"/>
        </div>
        <div class="formGroup col-4">
          <label for="state">State</label>
          <input type="text" id="state" v-model="team.team_name"/>
        </div>
        <div class="formGroup col-4">
          <label for="zip">Zip</label>
          <input type="number" id="zip" v-model="team.team_name"/>
        </div>
      </div> -->

      <div class="row formBlock">
        <div class="formGroup col-4">
          <label for="primary_color">Primary Color</label>
          <input type="text" id="primary_color" v-model="team.main_color" />
        </div>
        <div class="formGroup col-4 offset-4">
          <label for="secondary_color">Secondary Color</label>
          <input type="text" id="secondary_color" v-model="team.secondary_color"/>
        </div>
      </div>

      <div class="row formBlock">
        <div class="formGroup col-5">
          <label for="color_logo">Color Logo</label>
          <input type="file" id="color_logo" />
        </div>
        <div class="formGroup col-5 offset-2">
          <label for="grayscale_logo">Grayscale Logo</label>
          <input type="file" id="grayscale_logo" />
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import api from '@/api/endpoints.js'
// import { mapState } from 'vuex'

export default {
  name: 'profile',
  data () {
    return {
      team: {

      }
    }
  },
  created () {
    this.getTeam()
  },
  watch: {
    '$route.params.slug': {
      handler (newValue) {
        this.getTeam()
      }
    }
  },
  methods: {
    getTeam () {
      api.getTeams(this.$route.params.slug).then(response => {
        this.team = response.data[0]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2:after {
  content: '';
  display: block;
  height: 40px;
  /* width: 100%; */
  width: calc(100% + 2.4rem);
  border-top: 1.5px solid #B42625;
  border-right: 2px solid #B42625;
  border-left: 2px solid transparent;
  position: relative;
  -webkit-transform: skewX(-45deg);
  transform: skewX(-45deg);
  left: -23px;
  margin-top: .6rem;
}
form {
  margin-top: -40px;
}
.swatch {
  font-size: 16px;
  background-color:#B42625;
  display: inline;
}
</style>
