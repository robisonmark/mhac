<template>
  <div class="container">
    <div class="page-styles">
      <div class="row print-only align-items-start justify-content-between">
          <div class="col">
            <h2>2019 - 2020 Schedule</h2>
          </div>
          <div class="col right">
            <div>{{filterBy.team.name}}</div>
            <div>{{filterBy.level.level}}</div>
          </div>
        </div>
      <div class="col-12">
        <div class="row filter-bar">
          <div class="col-4">
            <h2>2019 - 2020 Schedule</h2>
          </div>
          <div class="col-6">
            <div class="filters">
              <!-- <div class="custom-select" @click="showDatePicker = !showDatePicker, showTeams = false, showLevels = false">
                <div disabled>All Dates</div>
                <div class="options-menu" @click.stop="showDatePicker = true">
                  <input class="option noHover" v-show="showDatePicker" type="date" v-model="filterBy.dateRange.start_date"/>
                </div>
              </div> -->

              <div class="custom-select"  @click="showLevels = !showLevels, showTeams = false, showDatePicker = false">
                <div disabled>{{filterBy.level.level}}</div>
                <div class="options-menu">
                  <template>
                    <div class="option" v-for="lvl in levels" :key="lvl.season_id" v-show="showLevels" @click="setLvl(lvl)">
                      {{lvl.level}}
                    </div>
                  </template>
                </div>
              </div>

              <div class="custom-select" @click="showTeams = !showTeams, showDatePicker = false, showLevels = false" v-show="filterBy.level.season_id !== ''">
                <div disabled>{{filterBy.team.name}}</div>
                <div class="options-menu">
                  <template>
                    <div class="option" v-for="team in teams" :key="team.id" v-show="showTeams" @click="setTeam(team)">
                      {{team.team_name}} {{team.team_mascot}}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2 text-right">
            <div class="button ghost print" @click="print()">
              <font-awesome-icon :icon="['fas', 'print']"></font-awesome-icon> Print
            </div>
          </div>
        </div>
      </div>
      <div class="col content">
        <div class="row">
          <div class="col-2">
            Date/Time
          </div>
          <div class="col-1">
          </div>
          <div class="col-2" align="center">
            Away
          </div>
          <div class="col-1">
          </div>
          <div class="col-2" align="center">
            Home
          </div>
          <div class="col-1">
          </div>
          <div class="col-3 text-right">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location
          </div>
        </div>

        <template v-if="games.length >= 1">
          <router-link :to="{ path: 'stats', query: { game: game.game_id, home_team: game.home_team.id }}" tag="div" class="row game" v-for="game in games" :key="game.game_id">
            <div class="col-2 date">
              {{game.game_date}}
              <div class="time">{{game.game_time}}</div>

              <!-- {{game.game_date}} {{game.game_time}} -->
            </div>

            <!-- AWAY TEAM -->
            <div class="col-1 score" :class="checkResult(game.final_score.away, game.final_score.home)">
              {{game.final_score.away}}
            </div>

            <div class="col-2 team_info" :class="checkResult(game.final_score.home, game.final_score.away)">
              <div class="team_name">{{game.away_team.name}}</div>
              <span class="level" v-if="game.away_team.team_level" v-html="game.away_team.team_level"></span>
            </div>

            <div class="col-1">
              <span class="at">@</span>
            </div>

            <!-- HOME TEAM -->
            <div class="col-2 team_info">
              <div class="team_name" :class="checkResult(game.final_score.home, game.final_score.away)">{{game.home_team.name}}</div>
              <span class="level" v-if="game.home_team.team_level" v-html="game.home_team.team_level"></span>
            </div>

            <div class="col-1 score" :class="checkResult(game.final_score.home, game.final_score.away)">
              {{game.final_score.home}}
            </div>

            <div class="col-3 location text-right">
              <div>{{game.home_team.address_name}}</div>
              <br/>
              <span class="address" :href="'https://maps.google.com/?q=' + game.home_team.address_lines + ' ' + game.home_team.city_state_zip" @click.stop="goToMap('https://maps.google.com/?q=' + game.home_team.address_lines + ' ' + game.home_team.city_state_zip)">
                <div>{{game.home_team.address_lines}}</div>
                <div>{{game.home_team.city_state_zip}}</div>
              </span>
            </div>

          </router-link>
        </template>

        <template v-else>
          <div class="col" align="center">
            There are currently no games on the schedule <em v-if="filterBy.team.slug !== '' || filterBy.level.id !== ''">that match your criteria</em>, please keep checking back.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'

// mixins
import { root } from '../../mixins/root'

export default {
  name: 'schedules',
  data () {
    return {
      currentSort: 'game_date',
      currentSortDir: 'asc',
      filterBy: {
        team: {
          slug: '',
          name: 'All Teams'
        },
        level: {
          season_id: '',
          level: 'All Levels'
        },
        dateRange: {
          start_date: '',
          end_date: ''
        }
      },
      games: [],
      showDatePicker: false,
      showLevels: false,
      showTeams: false
    }
  },
  mixins: [root],
  computed: {
    teams () {
      const teams = [{slug: '', team_name: 'All Teams'}, ...this.$store.state.teams]
      return teams
    },
    levels () {
      const levels = [{season_id: '', level: 'All Levels'}, ...this.$store.state.seasons]
      return levels
    }
  },
  watch: {
    'filterBy.team': {
      deep: true,
      handler (newValue, oldValue) {
        this.initSchedule(this.filterBy.level.season_id, newValue.slug)
      }
    },
    'filterBy.level': {
      deep: true,
      handler (newValue, oldValue) {
        this.initSchedule(newValue.season_id)
      }
    }
  },
  created () {
    this.initSchedule()

    this.$root.$on('close', payload => {
      // this.showDatePicker = false
      // this.showTeams = false
    })
  },
  methods: {
    goToMap (url) {
      window.location.replace(url)
    },
    initSchedule (level, team) {
      api.getSchedule(level, team).then(response => {
        let fixedData = []
        response.data.forEach(game => {
          if (game.game_time === '12:00 AM ') {
            game.game_time = 'TBD'
          }
          fixedData.push(game)
        })
        this.games = fixedData
        this.sortTable('game_date', false)
      })
    },
    checkResult (me, opponent) {
      if (me !== null && opponent !== null) {
        if (me > opponent) {
          return 'winner'
        } else {
          return 'loser'
        }
      } else {
        return ''
      }
    },
    setTeam (team) {
      this.filterBy.team.slug = team.slug
      this.filterBy.team.name = team.team_name
      // this.showTeams = false
      // console.log(this.showTeams)
    },
    setLvl (lvl) {
      this.filterBy.level.season_id = lvl.season_id
      this.filterBy.level.level = lvl.level
      // this.showTeams = false
      // console.log(this.showTeams)
    },
    sortTable (s, nested) {
      // if s == current sort, reverse
      this.currentSort = s

      this.games.sort((a, b) => {
        let modifier = 1
        if (nested) {
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort][nested] !== '') {
            if (a[this.currentSort][nested] < b[this.currentSort][nested]) return -1 * modifier
            if (a[this.currentSort][nested] > b[this.currentSort][nested]) return 1 * modifier
          }
          return 0
        } else if (s === 'game_date') {
          /*
            this fix is in place because of wanting a string display date
            function converts the month to a number through an array located in root.js using indexOf
            it then takes into account the season starting toward the end (october) of the year and rolling into the next.
            lastly I add in the date to allow to sort by date
          */
          a[this.currentSort].split(' ')
          let monthANumber = this.months.indexOf(a[this.currentSort].split(' ')[0])
          let monthBNumber = this.months.indexOf(b[this.currentSort].split(' ')[0])

          if (monthANumber <= 9) monthANumber = monthANumber + 12
          monthANumber = monthANumber + a[this.currentSort].split(' ')[1]
          monthBNumber = monthBNumber + b[this.currentSort].split(' ')[1]

          if (this.currentSortDir === 'desc') modifier = -1
          if (monthANumber < monthBNumber) return -1 * modifier
          if (monthANumber > monthBNumber) return 1 * modifier
          return 0
        } else {
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
.page-styles{
  min-height: 100vh;
  background-color: #fff;
  margin-right: 1rem;
  margin-left: 1rem;
}
.filter-bar {
  background-color: @nav-blue;
  color: #fff;
  height: 3rem;
  align-items: center;
  .filters {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
  }
}
.content {
  padding: 2rem 1rem;
}

h2 {
  font-family: @open-sans;
  font-size: 1.1rem;
  font-weight: 600;
  font-style: italic;
}

.custom-select {
  display: inline-block;
  position: relative;
  font-size: .8rem;
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: .2rem .2rem 0 .2rem;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    right: -1rem;
    top: 8px;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    transform: skewX(-45deg);
    border-bottom: 2px solid;
    border-right: 2px solid;
    width: 130%;
    height: 1.5rem;
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
.button.ghost.print {
  border: 1px solid #fff;
  max-width: 6rem;
  text-align: center;
  &:hover {
    background-color: #fff;
    color: #0C4B75;
  }
}
.game {
  padding-top: 1rem;
  cursor: pointer;
  &:after {
    content: '';
    border-bottom: 1px solid #707070;
    width: calc(100% - 2rem);
    margin: auto;
    padding-bottom: 1rem;
  }
  &:hover {
    background: #eee;
  }
}
.date {
  font-family: @lato;
  font-size: 1.2rem;
  line-height: 1;
  .time {
    padding-top: .8rem;
    font-weight: 200;
  }
}
.team_info {
  font-family: @lato;
  font-weight: 400;
  font-size: 1.1rem;
  font-style: italic;
  text-align: center;
  line-height: 1.1;
  .level {
    display: block;
    font-size: .9rem;
    font-weight: 200;
  }
  .winner {
    font-weight: 500;
  }
  .loser {
    font-weight: 200;
  }
}
.at {
  font-family: @lato;
  font-weight: 700;
  font-style: italic;
  font-size: 2.5rem;
  color: @conf-blue;
}
.score {
  font-size: 3rem;
  &.winner {
    font-weight: 900;
    color: #2784C3;
  }
  &.loser {
    font-weight: 100;
    color: #707070;
  }
}
.location{
  font-family: @lato;
  font-weight: 200;
  line-height: 1.1;
  .address{
    color: #2784C3;
    &:hover {
      text-decoration: none;
      color: lighten(#2784C3, 20%)
    }
  }
}
</style>
