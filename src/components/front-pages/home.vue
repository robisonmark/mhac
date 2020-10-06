<template>
  <div class="container">
    <div class="row hero-standings">
      <div class="col-md-8 col-lg-9">
        <div class="hero">
          <div class="tagline">
            <h2>And so it begins...</h2>
            <h2>2019-20 is offically under way!</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-3">
        <div class="standings">
          <div class="addPadding">
            <h3>2019-20 Standings</h3>
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
                <!-- <tr>
                  <td colspan="5" class="section-description">
                    No Standings
                  </td>
                </tr> -->

                <tr>
                  <td class="padding"></td>
                  <td colspan="3">
                    No Stats have been loaded. Please check back soon.
                  </td>
                  <!-- <td>{{team_name}}</td>
                  <td>{{team_record}}</td>
                  <td>{{last_result}}</td> -->
                  <td class="padding"></td>
                </tr>
              </template>

              <template v-else>
                <tr v-for="(standing, idx) in currentStandings" :key="idx">
                  <td class="padding"></td>
                  <td class="mw-150px">{{standing.team_name}}</td>
                  <td class="center">{{standing.wins}}-{{standing.losses}}</td>
                  <!-- <td class="center">--</td> -->
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
        <h1>Midsouth Homeschool Athletic Conference</h1>
        <p>The MidSouth Homeschool Athletic Conference (MHAC) was formed in 2018, and is part of the Southeast Region for the National Christian HomeSchool Championships.  The MHAC has 8 member teams located in Tennesee, Southern Kentucky, and Northern Alabama. These teams currently compete in Boys and Girls 18U Basketball, and Boys 16U and 14U Basketball.</p>
        <p>Each year the MHAC holds tournaments in each 18U, 16U and 14U age brackets.</p>
        <!-- <p>To inquire about joining the conference please email: email@personinconference.org</p> -->

        <h3>For Information on the 2020 Tournament please go to <router-link :to="{ 'path': '/tournament2020' }">Tournament Central</router-link></h3>
      </div>

      <!-- <footer class="col-12 text-right">
        Midsouth Homeschool Athletic Conference &copy; {{ new Date().getFullYear() }}
      </footer> -->
    </div>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'
import _ from 'lodash'

export default {
  name: 'home',
  data () {
    return {
      currentStandings: {},
      noStandings: Boolean,
      season: ''
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
    this.initStandings('')
  },
  methods: {
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
  background: url('../../assets/img/MHAC_2-optimized.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 51vh;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(26,26,26);
    background: -moz-linear-gradient(27deg, rgba(26,26,26,0.68) 1%, rgba(242,242,242,0.1) 100%);
    background: -webkit-linear-gradient(27deg, rgba(26,26,26,0.68) 1%, rgba(242,242,242,0.1) 100%);
    background: linear-gradient(27deg, rgba(26,26,26,0.68) 1%, rgba(242,242,242,0.1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1a1a1a",endColorstr="#f2f2f2",GradientType=1);
  }
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
    h1 {
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
