<template>
  <div class="container">
    <div class="row">
      <div class="logo-color col">
        <img src="@/assets/color-team-logos/royals2.png" alt="Hendersonville Royals"/>
      </div>
      <div class="col-7 top-layer">
        <div class="content-container">
          <div class="row filter-bar">
            <div class="col">
              <div class="filters">
                <div class="custom-select"  @click="showSeasons = !showSeasons, showSections = false">
                  <div disabled>{{filterBy.seasons.season}}</div>
                  <div class="options-menu">
                    <template>
                      <div class="option" v-for="season in seasons" :key="season.id" v-show="showSeasons" @click="setSeason(season)">
                        {{createSeasonDisplay(season)}}
                      </div>
                    </template>
                  </div>
                </div>

                <div class="custom-select" @click="showSections = !showSections, showSeasons = false">
                  <div disabled>{{filterBy.team.name}}</div>
                  <div class="options-menu">
                    <template>
                      <!-- <div class="option" v-for="team in teams" :key="team.id" v-show="showTeams" @click="setTeam(team)">
                        {{team.team_name}} {{team.team_mascot}}
                      </div> -->
                    </template>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="content-divider">
          </div>

          <div v-if="selectedSection === 'Schedule'">
            <table>
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Location</th>
                  <th>Results</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="game in games" :key="game.id">
                  <td></td>
                  <td v-html="game.location"></td>
                  <td v-html="game.final_score"></td>
                </tr>
              </tbody>
            </table>
          </div>
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
      filterBy: {
        team: {
          id: '',
          name: 'All Teams'
        },
        seasons: {
          id: '3323edf0-d806-4e32-9fd2-cb698a27b3a9',
          season: 'Boys 18U Basketball'
        },
        dateRange: {
          start_date: '',
          end_date: ''
        }
      },
      sections: [
        'Schedule',
        'Roster',
        'Staff'
      ],
      selectedSection: 'Schedule',
      showDatePicker: false,
      showSeasons: false,
      showSections: false
    }
  },
  computed: {
    seasons () {
      const seasons = [...this.$store.state.seasons]
      return seasons
    }
  },
  watch: {
    $route (to, from) {
      this.initSchool()
    },
    'filterBy.team': {
      deep: true,
      handler (newValue, oldValue) {
        this.initSchedule(newValue.id)
      }
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
    },
    createSeasonDisplay (season) {
      let nameSplit = season.level.split(' ')
      let gender = ''
      if (nameSplit[1] === 'Boys') {
        gender = 'Boys'
      } else {
        gender = 'Girls'
      }

      return gender + ' ' + nameSplit[0] + ' ' + season.sport
      // return season.season_name + ' ' + season.sport
    },
    setSeason (season) {
      this.filterBy.seasons.id = season.id
      this.filterBy.season.season = season.level_name
      // this.showTeams = false
      console.log(this.showTeams)
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
  box-shadow: 9px 6px 9px rgba(0, 0, 0, 0.16);
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
  position: relative;
  padding-left: 2rem;
  padding-right: 1rem;
  padding-top: 1rem;
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
.filter-bar {
  color: #fff;
  height: 3rem;
  align-items: center;
  padding-top: 1rem;
  width: 100%;
  .filters {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
}
.content {
  padding: 2rem 1rem;
}
.custom-select {
  display: inline-block;
  position: relative;
  font-size: 1rem;
  width: 45%;
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: .3rem .3rem 0 .3rem;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    right: 5px;
    top: calc(50% - .3rem);
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    transform: skewX(-45deg);
    border-bottom: 2px solid;
    border-right: 2px solid;
    width: 100%;
    height: 1.8rem;
    top: 0;
    left: .5rem;
  }
}
.options-menu {
  position: absolute;
  width: 250px;
  background: #0C4B75;
  // padding: .5rem;
  top: calc(1.5rem);
  left: -3px;
  z-index: 2;
  box-shadow: 1px 2px 4px #0C4B75;
  .option {
    padding: .2rem .5rem;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: lighten(#0C4B75, 10%);
    }
    &.noHover:hover {
      background-color: #fff;
    }
  }
}
</style>
