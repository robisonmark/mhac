<template>
  <div class="container">
    <div class="row">
      <div class="logo-color col">
        <!-- <div class="image-con"> -->
          <img v-if="program.logo_color" :src="'/static/color-team-logos/' + program.logo_color" :alt="program.team_name + ' ' + program.team_mascot"/>

        <!-- </div> -->
      </div>
      <div class="col-8 top-layer">
        <div class="content-container">
          <div class="row filter-bar">
            <div class="col">
              <div class="filters">
                <div class="custom-select"  @click.stop="showSeasons = !showSeasons, showSections = false">
                  <div disabled>{{filterBy.team.level_name}}</div>
                  <div class="options-menu">
                    <template>
                      <div class="option" v-for="season in teamAssocLvl" :key="season.id" v-show="showSeasons" @click="filterBy.team = season">
                        {{season.level_name}}
                      </div>
                    </template>
                  </div>
                </div>

                <div class="custom-select" @click.stop="showSections = !showSections, showSeasons = false">
                  <div disabled>{{selectedSection}}</div>
                  <div class="options-menu">
                    <template>
                      <div class="option" v-for="(section, index) in sections" :key="index" v-show="showSections" @click="selectedSection = section">
                        {{section}}
                      </div>
                    </template>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="content-divider">
            <div class="button ghost print" @click="print()">
              <font-awesome-icon :icon="['fas', 'print']"></font-awesome-icon> Print
            </div>
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
                <tr v-for="game in schedule" :key="game.id">
                  <td>
                    <div class="game--date">{{game.game_date}}  / <span class="font-weight-light">{{game.game_time}}</span></div>
                    <div class="game--opponent">
                      <span v-if="game.host">vs </span>
                      <span v-else>@ </span>

                      <b v-html="game.opponent.team_name"></b>
                    </div>
                  </td>
                  <td class="game--location">
                    {{game.location.name}}
                    <br />

                    <a class="address" :href="'https://maps.google.com/?q=' + game.location.street + ' ' + game.location.city_state_zip" @click.stop="goToMap('https://maps.google.com/?q=' + game.location.street + ' ' + game.location.city_state_zip)">
                      <div>{{game.location.street}}</div>
                      <div>{{game.location.city_state_zip}}</div>
                    </a>

                  </td>
                  <td>
                    <span v-if="Object.keys(game.results).length >= 1">
                      <span class="win_loss">{{game.results.win_loss}}</span> {{game.results.home}} - {{game.results.away}}
                    </span>
                    <div v-else class="text-center"> -- </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else-if="selectedSection === 'Roster'">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Age</th>
                  <th>Height</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player in roster" :key="player.id">
                  <td v-html="player.player_number"></td>
                  <td>{{player.first_name}} {{player.last_name}}</td>
                  <td v-html="player.position"></td>
                  <td v-html="player.age"></td>
                  <td v-html="player.height"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="team-info">
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
      </div> -->
    </div>
    <div class="bottom-logo" ref="bottomLogo">
      <img v-if="program.logo_grey" :src="'/static/washedout-team-logo/' + program.logo_grey" :alt="program.team_name + ' ' + program.team_mascot"/>
    </div>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'
import _ from 'lodash'

export default {
  name: 'schools',
  data () {
    return {
      filterBy: {
        team: {
          season_team_id: '',
          level_name: ''
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
      fullRoster: [],
      program: {},
      roster: [],
      schedule: [],
      sections: [
        'Schedule',
        'Roster'
        // 'Staff'
      ],
      selectedSection: 'Roster',
      showDatePicker: false,
      showSeasons: false,
      showSections: false,
      teamAssocLvl: []
    }
  },
  computed: {
    footerLoc: {
      get: function () {
        return document.getElementById('publicMainFooter').getBoundingClientRect().top
      },
      set: function () {
        return document.getElementById('publicMainFooter').getBoundingClientRect().top
      }
    },
    seasons () {
      const seasons = [...this.$store.state.seasons]
      return seasons
    },
    selectedTeam: {
      get: function () {
        return this.$store.state.teams.find(team => {
          const user = {
            team_id: team.id,
            slug: team.slug
          }
          this.$store.dispatch('setUser', user)
          return team.slug === this.$route.params.slug
        })
      },
      set: function (newValue) {
        const user = {
          team_id: newValue.id,
          slug: newValue.slug
        }
        this.team = newValue.slug
        this.$store.dispatch('setUser', user)
        const routeName = this.$route.name

        this.$router.push({ name: routeName, params: { slug: newValue.slug } })
        this.getSeasonTeams(newValue.slug)
      }
    }
  },
  watch: {
    $route (to, from) {
      this.initSchool()
    },
    'filterBy.team': {
      deep: true,
      handler (newValue, oldValue) {
        if (this.selectedSection === 'Schedule') {
          const season = this.seasons.filter(season => { return season.level === newValue.level_name })

          this.initLeveledSchedule(season[0].season_id, this.$route.params.slug)
        } else if (this.selectedSection === 'Roster') {
          this.initLeveledRoster(newValue.team_id)
        }
      }
    },
    selectedSection: {
      deep: true,
      handler (newValue, oldValue) {
        if (newValue === 'Schedule') {
          this.initLeveledSchedule(this.filterBy.team.season_team_id, this.$route.params.slug)
        } else if (newValue === 'Roster') {
          this.initLeveledRoster(this.filterBy.team.team_id)
        }
      }
    }
  },
  created () {
    this.initSchool()
    this.$root.$on('close', payload => {
      this.showSeasons = false
      this.showSections = false
    })
  },
  methods: {
    async initSchool () {
      const slug = this.$route.params.slug

      await api.getTeams(slug)
        .then(response => {
          this.program = response.data[0]
          this.getSeasonTeams(this.$route.params.slug)
          console.log(this.teamAssocLvl)
          this.initRoster(this.teamAssocLvl.team_id)
        })

      // window.addEventListener('scroll', this.watchLogoPos)
    },
    watchLogoPos () {
      const footerTop = document.getElementById('publicMainFooter').getBoundingClientRect()
      const bottomLogoPos = this.$refs.bottomLogo.getBoundingClientRect()

      console.log('top: ', document.getElementById('publicMainFooter').scrollTop)
      console.log('y: ', footerTop.y)
      console.log('bottom: ', bottomLogoPos.y)
      console.log('bool: ', footerTop.top <= (bottomLogoPos.bottom))
      console.log('pos: ', (bottomLogoPos.y - footerTop.y) + 'px')

      if (footerTop.top <= bottomLogoPos.bottom) {
        this.$refs.bottomLogo.style.bottom = (bottomLogoPos.bottom - footerTop.top) + 'px'
      } else {
        this.$refs.bottomLogo.style.removeProperty('bottom')
      }
    },
    initRoster (id) {
      api.getPlayers(id).then(response => {
        console.log(id, response)
        // response.data.forEach(player => {
        //   player.number = player.number
        // })
        this.roster = response.data
        this.fullRoster = _.cloneDeep(this.roster)
      })
    },
    async getSeasonTeams (slug) {
      await api.getSeasonTeams(slug)
        .then(response => {
          this.teamAssocLvl = response.data

          this.filterBy.team = response.data[0]

          // this.initLeveledSchedule(response.data.season_team_ids[0])
          // this.$store.dispatch('setTeamAssocLvl', response.data)
        })
    },
    initLeveledRoster (lvlId) {
      api.getRoster(lvlId).then(response => {
        const rosterArr = []
        console.log(response)
        // this.fullRoster.forEach(player => {
        response.data.forEach(lvlPlayer => {
          rosterArr.push(lvlPlayer)
        })
        // })

        this.roster = rosterArr
      })
    },
    initLeveledSchedule (season, slug) {
      api.getSchedule(season, slug).then(response => {
        const gameArr = []
        response.data.forEach(game => {
          const gameObj = {
            host: '',
            opponent: '',
            game_time: this.$config.formatTime(game.game_time),
            game_date: this.$config.formatDate(game.game_date),
            location: {},
            results: {},
            id: game.game_id
          }

          if (game.home_team.slug === this.$route.params.slug) {
            gameObj.host = true
            gameObj.opponent = game.away_team
            if (game.final_scores.home_score !== null) {
              if (game.final_scores.home_score > game.final_scores.away_score) {
                gameObj.results = {
                  win_loss: 'W'
                }
              } else if (game.final_scores.home_score < game.final_scores.away_score) {
                gameObj.results = {
                  win_loss: 'L'
                }
              }
            }
          } else if (game.away_team.slug === this.$route.params.slug) {
            gameObj.host = false
            gameObj.opponent = game.home_team
            if (game.final_scores.home_score !== null) {
              if (game.final_scores.home_score < game.final_scores.away_score) {
                gameObj.results = {
                  win_loss: 'W'
                }
              } else if (game.final_scores.home_score > game.final_scores.away_score) {
                gameObj.results = {
                  win_loss: 'L'
                }
              }
            }
          }

          gameObj.location = {
            street: game.home_team.address_lines,
            city_state_zip: game.home_team.city_state_zip,
            name: game.home_team.address_name
          }

          if (game.final_scores.home_score !== null) {
            gameObj.results = { ...gameObj.results, ...game.final_scores }
          }

          gameArr.push(gameObj)
        })
        this.schedule = gameArr
      })
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
    setSeason (season) {
      this.filterBy.seasons.id = season.id
      this.filterBy.season.season = season.level_name
      // this.showTeams = false
      // console.log(this.showTeams)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/elements/typography.less';
.logo-color {
  height: 20rem;
  min-width: 20rem;
  margin-left: 1rem;
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
    max-width: 98%;
    max-height: 72%;
  }
}
.content-container {
  width: calc(100% + 2rem);
  border-radius: 15px;
  // height: 152vh;
  background-color: #0C4B75;
  margin-top: 3rem;
  margin-left: -2rem;
  position: relative;
  padding-left: 2rem;
  padding-right: 1rem;
  padding-top: 1rem;
  color: #fff;
  font-family: @lato;
  min-height: 75vh;
}
.content-divider {
  width: 100%;
  // height: 2rem;
  margin-top: .7rem;
  margin-bottom: .7rem;
  background: #fff;
  color: #021A2B;
  display: flex;
  align-items: center;
  justify-content: flex-end;
   padding: 0 1rem;
}
.button.ghost.print {
  border: 1px solid #021A2B;
  max-width: 6rem;
  text-align: center;
  margin-top: .5rem;
  margin-bottom: .5rem;
  display: inline-block;
  padding: 0 1rem;
  &:hover {
    background-color: #021A2B;
    color: #fff;
  }
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
  // position: fixed;
  position: sticky;
  right: 0;
  left: 100%;
  bottom: 0;
  max-height: 30rem;
  max-width: 24rem;
  z-index: 0;
  opacity: .6;
  img {
    max-width: 98%;
    max-height: 72%;
  }
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
table {
  width: 100%;
  thead th{
    font-size: 1.1rem;
    font-weight: 100;
  }
  tr{
    vertical-align: top;
    border-bottom: 1px solid #2784C3;
  }
  td {
    line-height: 1.5;
    padding: .5rem 0;
  }
}
.game {
  &--date {
    font-size: .85rem;
  }
  &--opponent span{
    // font-size: .95rem;
    font-style: italic;
    font-weight: 100;
  }
  &--location {
    font-size: .90rem;
    font-style: italic;
    line-height: 1.3;
    .address {
      text-decoration: none;
      color: #fff;
      font-style: normal;
      font-size: .80rem;
      line-height: 1.2;
    }
  }
}
.win_loss {
  padding-right: .5rem;
}
</style>
