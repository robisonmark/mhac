<template>
  <div class="container">
    <div class="row hero-standings">
      <div class="col-md-8 col-lg-9">
        <div class="hero" :style="{ backgroundImage:  'url(' + hero + ')' }">
          <div class="tagline">
            <h2>{{ tagline_1 }}</h2>
            <h2>{{ tagline_2 }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-3">
        <div class="standings">
          <div class="addPadding">
            <h3>{{ activeYear.name }} Standings</h3>
            <select v-model="season">
              <option v-for="sport in seasons" :key="sport.season_id" :value="sport">{{createName(sport)}}</option>
            </select>
            <!-- <selectbox :options="seasons" trackby="level" placeholder="Select A Season" v-model="season"></selectbox> -->
          </div>

          <table>
            <thead>
              <tr>
                <th class="padding"></th>
                <th class="mw-150px">School</th>
                <th class="center">Record</th>
                <!-- <th class="center">Last Result</th> -->
                <th class="center">Games Back</th>
                <th class="padding"></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colspan="5" class="section-description">
                  <template v-if="season">
                    {{createSeasonDisplay(season)}}
                  </template>
                </td>
              </tr>

              <template v-if="noStandings">
                <tr>
                  <td class="padding"></td>
                  <td colspan="3">
                    No Stats have been loaded. Please check back soon.
                  </td>
                  <td class="padding"></td>
                </tr>
              </template>

              <template v-else>
                <tr v-for="(standing, idx) in currentStandings" :key="idx">
                  <td class="padding"></td>
                  <td class="mw-150px">{{standing.team_name}}</td>
                  <td class="center">{{standing.wins}}-{{standing.losses}}</td>
                  <th class="center">{{standing.games_behind}}</th>
                  <td class="padding"></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row conference-blurb">
      <div class="col-md-9 conference-blurb-content">
       <span v-html="message"></span>
        <!-- <p>To inquire about joining the conference please email: email@personinconference.org</p> -->
        <!-- <h3>NCHBC Southeast Regional Tournament </h3>
        <P>Congratulations to WKy Trailblazer's 14U Boys and NCC Warriors 16U Girls on winning the Southeast Region Championships!</p>

        <p>LCA Lions 18U boys and NCC Warriors 18U Girls both ended the tournaments with 2nd place finishes!</p>

        <p>A big shout out to the other teams competing in this weekend's tournament. </p>
        <br />
        <p>NCC Warriors 18U Boys<br />
        Hendersonville Royals 14U Boys<br />
        Hendersonville Royals 18U Boys<br />
        Daniel 1 Academy 18U Boys<br />
        Daniel 1 Academy 14U Boys<br />
        Chattanooga Patriots 18U Girls</p>
        <br />
        <b>Way to represent the MHAC!</b> -->
        <!-- <h3>For Information on the 2021 Tournament please go to <router-link :to="{ 'path': '/tournament' }">Tournament Central</router-link></h3> -->
      </div>

      <!-- <footer class="col-12 text-right">
        Midsouth Homeschool Athletic Conference &copy; {{ new Date().getFullYear() }}
      </footer> -->
    </div>
  </div>
</template>

<script>
// api
import api from '../../api/endpoints.js'
import pages from '../../api/pages.js'

import _ from 'lodash'

export default {
  name: 'home',
  data () {
    return {
      currentStandings: {},
      noStandings: Boolean,
      season: '',
      activeYear: {},
      tagline_1: '',
      tagline_2: '',
      message: '',
      hero: ''
    }
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    }
  },
  watch: {
    season: {
      deep: true,
      handler (newValue, oldValue) {
        this.initStandings(newValue.season_id)
      }
    }
  },
  created () {
    // console.log(this.$store.state.seasons)
    this.initPage()
    this.initStandings('')
    this.initYear()
  },
  methods: {
    initPage () {
      pages.get('home').then(response => {
        // console.log(response)
        this.tagline_1 = response.tagline_line1
        this.tagline_2 = response.tagline_line2
        this.message = response.message
        this.num_images = response.hero_image.length
        this.hero = import.meta.env.VITE_APP_IMAGE_API + response.hero_image[this.getRandomInt(this.num_images)].carousel_image.meta.download_url
      }).catch(() => {
        this.tagline_1 = ''
        this.tagline_2 = ''
        this.message = 'Page content API Page content API failed to load.  Please refresh page to try again.'
        this.num_images = 1
        this.hero = ''
      })
    },
    getRandomInt (max) {
      return Math.floor(Math.random() * max)
    },
    initYear () {
      api.getActiveYear().then(response => {
        this.activeYear = response.data
      })
    },
    initStandings (id) {
      id = id.length > 1 ? id : ''
      api.getStandings(id).then(response => {
        this.noStandings = false
        // response.data.forEach(result => {
        //   if (result.games_behind !== '') {
        //     result.games_behind = Math.round(result.games_behind)
        //   }
        // })

        this.currentStandings = _.sortBy(response.data, [function (o) { return o.games_behind }])
        // this.currentStandings = response.data

        if (this.season.length === 0) {
          this.season = this.$store.state.seasons.find(function (level) {
            if (level.level === '18U Boys') {
              return level
            }
          })
        }
      }).catch(err => {
        if (err.response.data === 'No season found') {
          this.noStandings = true
        }
      })
    },
    createName (season) {
      const nameSplit = season.level.split(' ')
      return nameSplit[1] + ' ' + nameSplit[0] + ' ' + season.sport
      // return season.season_name + ' ' + season.sport
    },
    createSeasonDisplay (season) {
      const nameSplit = season.level.split(' ')
      let gender = ''
      if (nameSplit[1] === 'Boys') {
        gender = 'Boys'
      } else {
        gender = 'Girls'
      }

      return gender + ' ' + nameSplit[0] + ' ' + season.sport
      // return season.season_name + ' ' + season.sport
    },
    getSpecificStandings () {
      this.initStandings(this.season.season_id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
@import '../../assets/less/utils/breakpoints.less';

.hero-standings {
  margin-top: 3.5rem;
  height: 51vh;
  @media @phone {
    height: auto;
  }
}
.hero {
  background-color: #021A2B;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 51vh;
  position: relative;
  // &:before {
  //   content: '';
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   background: rgb(26,26,26);
  //   background: -moz-linear-gradient(27deg, rgba(26,26,26,0.68) 1%, rgba(242,242,242,0.1) 100%);
  //   background: -webkit-linear-gradient(27deg, rgba(26,26,26,0.68) 1%, rgba(242,242,242,0.1) 100%);
  //   background: linear-gradient(27deg, rgba(26,26,26,0.68) 1%, rgba(242,242,242,0.1) 100%);
  //   filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1a1a1a",endColorstr="#f2f2f2",GradientType=1);
  // }
  @media @phone {
    order: 2;
  }
}
.tagline {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  h2 {
    font-size: 1.5rem;
    color: #fff;
    font-family: @montse;
    font-weight: 600;
  }
}
.addPadding {
  padding-left: 1rem;
  padding-right: 1rem;
}
.standings {
  background-color: #fff;
  width: 100%;
  overflow-y: auto;
  height: 51vh;
  color: #021A2B;
  h3 {
    font-size: 1.1rem;
    padding: 1rem 0;
    color: #0C4B75;
  }

  table {
    width: 100%;
  }
  th {
    font-size: 0.7rem;
    color: #0C4B75;
    font-weight: 600;
  }
  td{
    font-size: 0.9rem;
    color: #0C4B75;
    font-weight: 600;
  }
}
.section-description{
 text-align: center;
 background-color: #2784C3;
 color: #fff !important;
 font-size: 1.1rem !important;
}
.conference-blurb {
  background-color: #fff;
  margin: 2rem 0rem 0;
  clip: rect(auto, auto, auto, auto);

  &-content {
    padding-top: 1rem;
    padding-bottom: 1rem;
    h2 {
      font-family: @montse;
      font-weight: 300;
      font-size: 1.7rem;
      padding-bottom: .5rem;
    }

    P {
      line-height: 1.35;
      font-size: .9rem;
    }
  }
}
.padding {
  width: 1rem;
}
.mw-150px {
  max-width: 150px;
}
.center {
  text-align: center;
}
select {
  font-size: .8rem;
  height: 2.1rem;
  margin-bottom: 1rem;
  color: #021A2B;
  border-color: #021A2B;
}
footer {
  position: relative;
  bottom: 2rem;
  // width: 100%;
  // padding-right: 1rem;
}
</style>
