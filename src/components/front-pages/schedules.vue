<template>
  <div class="container">
    <div class="page-styles">
      <div class="col-12">
        <div class="row filter-bar">
          <div class="col-4">
            <h2>2019 - 2020 Schedule</h2>
          </div>
          <div class="col-6">
            <div class="filters">
              <div class="custom-select" @click="showDatePicker = !showDatePicker, showTeams = false, showLevels = false">
                <div disabled>All Dates</div>
                <div class="options-menu" @click.stop="showDatePicker = true">
                  <input class="option noHover" v-show="showDatePicker" type="date" v-model="filterBy.dateRange.start_date"/>
                </div>
              </div>

              <div class="custom-select"  @click="showLevels = !showLevels, showTeams = false, showDatePicker = false">
                <div disabled>{{filterBy.level.lvl}}</div>
                <div class="options-menu">
                  <template>
                    <div class="option" v-for="lvl in levels" :key="lvl.id" v-show="showLevels" @click="setLvl(lvl)">
                      {{lvl.level_name}}
                    </div>
                  </template>
                </div>
              </div>

              <div class="custom-select" @click="showTeams = !showTeams, showDatePicker = false, showLevels = false">
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
          <div class="col-2">
            <div class="button ghost">
              Print
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
          <div class="col-2">
            Location
          </div>
        </div>
        <div class="row game" v-for="game in games" :key="game.game_id">
          <div class="col-2 date">
            {{game.game_date}}
            <div class="time">{{game.game_time}}</div>

            <!-- {{game.game_date}} {{game.game_time}} -->
          </div>

          <div class="col-1 score" :class="[(game.final_score.home > game.final_score.away) ? 'winner': 'loser']">
          </div>

          <div class="col-2 team_info" :class="[(game.final_score.home > game.final_score.away) ? 'winner': 'loser']">
            <div class="team_name">{{game.away_team.name}}</div>
            <span class="level" v-if="game.away_team.team_level" v-html="game.away_team.team_level"></span>
          </div>

          <div class="col-1">
            <span class="at">@</span>
          </div>

          <div class="col-2 team_info">
            <div class="team_name" :class="[(game.final_score.home < game.final_score.away) ? 'winner': 'loser']">{{game.home_team.name}}</div>
            <span class="level" v-if="game.home_team.team_level" v-html="game.home_team.team_level"></span>
          </div>

          <div class="col-1 score" :class="[(game.final_score.home < game.final_score.away) ? 'winner': 'loser']">
          </div>

          <div class="col-3 location">
            <div>{{game.home_team.address_name}}</div>
            <br/>
            <div>{{game.home_team.address_lines}}</div>
            <div>{{game.home_team.city_state_zip}}</div>
          </div>

        </div>
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
      filterBy: {
        team: {
          id: '',
          name: 'All Teams'
        },
        level: {
          id: '',
          lvl: 'All Levels'
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
      const levels = [{id: '', level_name: 'All Levels'}, ...this.$store.state.levels]
      return levels
    }
  },
  watch: {
    'filterBy.team': {
      deep: true,
      handler (newValue, oldValue) {
        this.initSchedule(newValue.id)
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
    initSchedule (team) {
      api.getSchedule(team).then(response => {
        let fixedData = []
        response.data.forEach(game => {
          if (game.game_time === '12:00 AM ') {
            game.game_time = 'TBD'
          }

          fixedData.push(game)
        })
        this.games = fixedData
      })
    },
    setTeam (team) {
      this.filterBy.team.id = team.slug
      this.filterBy.team.name = team.team_name
      // this.showTeams = false
      // console.log(this.showTeams)
    },
    setLvl (lvl) {
      this.filterBy.level.id = lvl.id
      this.filterBy.level.lvl = lvl.level_name
      // this.showTeams = false
      // console.log(this.showTeams)
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
.button.ghost {
  border: 1px solid #fff;
  width: 4rem;
  text-align: center;
  &:hover {
    background-color: #fff;
    color: #0C4B75;
  }
}
.game {
  padding-top: 1rem;
  &:after {
    content: '';
    border-bottom: 1px solid #707070;
    width: calc(100% - 2rem);
    margin: auto;
    padding-bottom: 1rem;
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
  font-size: 2rem;
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
}

@media print {
 .filters {
   display: none;
 }
 .button.ghost {
   display: none;
 }
}
</style>
