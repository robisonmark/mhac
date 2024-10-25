<template>
  <div class="container">
    <div class="page-styles">
      <div class="row print-only align-items-start justify-content-between">
        <div class="col">
          <h2>2024 - 2025 Schedule</h2>
        </div>
        <div class="col right">
          <div>{{ filterBy.team.name }}</div>
          <div>{{ filterBy.level.level }}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="row filter-bar">
          <div class="col-md-4">
            <div v-if="edit === false" @click="edit = !edit">
              <h2>{{ activeYear.name }} Schedule</h2>
            </div>
            <div v-if="edit === true">
              <ul class="options-menu">
                <li class="option" v-for="year in years" :key="year.year" @click="setYear(year)"> {{ year.name }} </li>
              </ul>
              <h2>{{ activeYear.name }} Schedule</h2>
            </div>
          </div>
          <div class="col-md-6">
            <div class="filters">
              <!-- <div class="custom-select" @click="showDatePicker = !showDatePicker, showTeams = false, showLevels = false">
                <div disabled>All Dates</div>
                <div class="options-menu" @click.stop="showDatePicker = true">
                  <input class="option noHover" v-show="showDatePicker" type="date" v-model="filterBy.dateRange.start_date"/>
                </div>
              </div> -->

              <div class="custom-select" @click="showLevels = !showLevels, showTeams = false, showDatePicker = false">
                <div disabled>{{ filterBy.level.level }}</div>
                <div class="options-menu">
                  <div class="option" v-for="lvl in levels" :key="lvl.season_id" v-show="showLevels" @click="setLvl(lvl)">
                    {{ lvl.level }}
                  </div>
                </div>
              </div>

              <div class="custom-select" :disabled="filterBy.level.season_id === ''"
                @click="showTeams = !showTeams, showDatePicker = false, showLevels = false">
                <div disabled>{{ filterBy.team.name }}</div>
                <div class="options-menu">
                  <div class="option" v-for="team in teams" :key="team.id" v-show="showTeams" @click="setTeam(team)">
                    {{ team.team_name }} {{ team.team_mascot }}
                  </div>
                </div>
              </div>

              <div class="holder"></div>
            </div>
          </div>
          <div class="col-md-2 text-right">
            <!-- <div class="button ghost print" @click="print()">
              <font-awesome-icon :icon="['fas', 'print']"></font-awesome-icon> Print
            </div> -->
          </div>
        </div>
      </div>
      <div class="content">
        <table>
          <tbody>
            <tr class="sticky">
              <td class="firstPadding">Date/Time</td>
              <td></td>
              <td class="text-center">Away</td>
              <td></td>
              <td class="text-center">Home</td>
              <td></td>
              <td class="location text-right lastPadding"><font-awesome-icon
                  :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</td>
            </tr>
          </tbody>
          <tbody>
            <template v-if="filteredGames.length >= 1">
              <tr class="game" v-for="game in filteredGames" :key="game.game_id">
                <td class="date">
                  {{ $config.formatDate(game.game_date) }}
                  <div class="time">{{ $config.formatTime(game.game_time) }}</div>
                </td>

                <!-- AWAY TEAM -->
                <td class="score" :class="checkResult(game.final_scores.away, game.final_scores.home)">
                  {{ game.final_scores.away }}
                </td>
                <td class="team_info">
                  <img class="team_img"
                    :src="'/static/color-team-logos/' + programInfo(game.away_team.team_name).logo_color" />
                  <div class="team_name" :class="checkResult(game.final_scores.away_score, game.final_scores.home_score)">
                    {{ game.away_team.team_name }}</div>
                  <span class="level" v-if="game.away_team.level_name" v-html="game.away_team.level_name"></span>
                </td>
                <td class="score" :class="checkResult(game.final_scores.home_score, game.final_scores.away_score)">
                  {{ game.final_scores.away_score }}
                </td>
                <td><span class="at">@</span></td>

                <!-- HOME TEAM -->
                <td class="team_info">
                  <img class="team_img"
                    :src="'/static/color-team-logos/' + programInfo(game.home_team.team_name).logo_color" />
                  <div class="team_name" :class="checkResult(game.final_scores.home_score, game.final_scores.away_score)">
                    {{ game.home_team.team_name }}</div>
                  <span class="level" v-if="game.home_team.level_name" v-html="game.home_team.level_name"></span>
                </td>
                <td class="score" :class="checkResult(game.final_scores.home_score, game.final_scores.away_score)">
                  {{ game.final_scores.home_score }}
                </td>

                <!-- <td class="location text-right">
                  <div>{{game.home_team.address_name}}</div>
                  <br/>
                  <span class="address" :href="'https://maps.google.com/?q=' + game.home_team.address_lines + ' ' + game.home_team.city_state_zip" @click.stop="goToMap('https://maps.google.com/?q=' + game.home_team.address_lines + ' ' + game.home_team.city_state_zip)">
                    <div>{{game.home_team.address_lines}}</div>
                    <div>{{game.home_team.city_state_zip}}</div>
                  </span>
                </td> -->
              </tr>
              <!-- </router-link> -->
            </template>
            <template v-else>
              <tr>
                <td colspan="7" align="center">
                  There are currently no games on the schedule <em
                    v-if="filterBy.team.slug !== '' || filterBy.level.id !== ''">that match your criteria</em>, please
                  keep checking back.
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- </div> -->
        <!-- <div class="col content">
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
        </div> -->

        <!-- <template v-if="games.length >= 1">
          <router-link :to="{ path: 'stats', query: { game: game.game_id, home_team: game.home_team.id }}" tag="div" class="row game" v-for="game in games" :key="game.game_id">
            <div class="col-2 date">
              {{game.game_date}}
              <div class="time">{{game.game_time}}</div> -->

        <!-- {{game.game_date}} {{game.game_time}} -->
        <!-- </div> -->

        <!-- AWAY TEAM -->
        <!-- <div class="col-1 score" :class="checkResult(game.final_score.away, game.final_score.home)"> -->
        <!-- {{game.final_score.away}} -->
        <!-- </div> -->

        <!-- <div class="col-2 team_info" :class="checkResult(game.final_score.home, game.final_score.away)">
              <img class="team_img" :src="'/static/color-team-logos/' + programInfo(game.away_team.name).logo_color" />
              <div class="team_name">{{game.away_team.name}}</div>
              <span class="level" v-if="game.away_team.team_level" v-html="game.away_team.team_level"></span>
            </div>

            <div class="col-1">
              <span class="at">@</span>
            </div> -->

        <!-- HOME TEAM -->
        <!-- <div class="col-2 team_info">
              <img class="team_img" :src="'/static/color-team-logos/' + programInfo(game.home_team.name).logo_color" />
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

          </router-link> -->
        <!-- </template> -->

        <!-- <template v-else>
          <div class="col" align="center">
            There are currently no games on the schedule <em v-if="filterBy.team.slug !== '' || filterBy.level.id !== ''">that match your criteria</em>, please keep checking back.
          </div>
        </template> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// api
import api from '../../api/endpoints.js'

// mixins
import { useRootMixin } from '../../mixins/root'

const config = {
  page: 'schedules'
};
const store = useStore();
const route = useRoute();

const activeYear = reactive({
  name: '',
  year: ''
});

const currentSort = ref('game_date');
const currentSortdir = ref('asc');
const edit = ref(false);
const filterBy =  ref({
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
      });
const games = ref([]);
const level_filter = ref('')
const showDatePicker = ref(false);
const showLevels = ref(false);
const showTeams = ref(false);
const years = ref([]);

const teams = computed(() => {
      const teams = [{ slug: '', team_name: 'All Teams' }, ...store.state.teams]
      return teams
    }

)
const levels = computed(() => {
      const levels = [{ season_id: '', level: 'All Levels' }, ...store.state.seasons]
      return levels
    })

const filteredGames = computed(() =>{
      if (level_filter === '') {
        return games
      }
      return games.value.filter(game => (game.season.season_id === level_filter))
    }
)

watch('filterBy.team', (newValue, oldvalue) => {
  initSchedule(filterBy.level.season_id, newValue.slug)
})

watch('filterBy.level', (newValue, oldValue) => {
  level_filter = newValue.season_id
})

onMounted(() => {
  getActiveYear();
  getYears();
  initSchedule();
})


// this.$root.$on('close', payload => {
//       // this.showDatePicker = false
//       // this.showTeams = false
//     })

const getActiveYear = () => {
      api.getYear(true).then(response => {
        activeYear.value = response.data
      })
    };

const getYears = () => {
      api.getYear(false).then(response => {
        years.value = response.data
      })
    };

const goToMap = (url) => {
      window.location.replace(url)
    };

const initSchedule = (level, team, year) => {
      console.log("InitSchedule", level, team, year)
      api.getSchedule(level, team, year).then(response => {
        const fixedData = []
        response.data.forEach(game => {
          if (game.game_time === '12:00 AM ') {
            game.game_time = 'TBD'
          }
          fixedData.push(game)
        })
        games.value = fixedData
      })
    };

const checkResult = (me, opponent) => {
      if (me !== null && opponent !== null) {
        if (me > opponent) {
          return 'winner'
        } else {
          return 'loser'
        }
      } else {
        return ''
      }
    };

const setYear = (year) => {
      activeYear = year
      edit = false
      initSchedule(undefined, undefined, year.year)
    };

const setTeam = (team) => {
      filterBy.team.slug = team.slug
      filterBy.team.name = team.team_name
    };

const setLvl = (lvl) => {
      console.log(lvl)
      filterBy.level.season_id = lvl.season_id
      filterBy.level.level = lvl.level
    };

const sortTable = (s, nested) => {
      // if s == current sort, reverse
      currentSort = s

      games.sort((a, b) => {
        let modifier = 1
        if (nested) {
          if (currentSortDir === 'desc') modifier = -1
          if (a[currentSort][nested] !== '') {
            if (a[currentSort][nested] < b[currentSort][nested]) return -1 * modifier
            if (a[currentSort][nested] > b[currentSort][nested]) return 1 * modifier
          }
          return 0
        } else if (s === 'game_date') {
          /*
            this fix is in place because of wanting a string display date
            function converts the month to a number through an array located in root.js using indexOf
            it then takes into account the season starting toward the end (october) of the year and rolling into the next.
            lastly I add in the date to allow to sort by date
          */
          a[currentSort].split(' ')
          let monthANumber = months.indexOf(a[currentSort].split(' ')[0])
          let monthBNumber = months.indexOf(b[currentSort].split(' ')[0])

          if (monthANumber <= 9) monthANumber = monthANumber + 12
          monthANumber = monthANumber + a[currentSort].split(' ')[1]
          monthBNumber = monthBNumber + b[currentSort].split(' ')[1]

          if (currentSortDir === 'desc') modifier = -1
          if (monthANumber < monthBNumber) return -1 * modifier
          if (monthANumber > monthBNumber) return 1 * modifier
          return 0
        } else {
          if (currentSortDir === 'desc') modifier = -1
          if (a[currentSort] < b[currentSort]) return -1 * modifier
          if (a[currentSort] > b[currentSort]) return 1 * modifier
          return 0
        }
      })
    };

const programInfo = (teamName) => {
      const team = store.state.teams.filter(team => {
        if (team.team_name === teamName) {
          return team
        }
      })
      return team[0]
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
@import '../../assets/less/utils/breakpoints.less';

.team_img {
  height: 2.5rem;
  // width: 6rem;
  margin-bottom: .5rem;
}

.page-styles {
  // min-height: 100vh;
  background-color: #fff;
  // margin-right: 1rem;
  // margin-left: 1rem;
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

  @media @phone {
    height: auto;
    padding: 1rem 0;

    .filters {
      min-height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.content {
  // padding: 2rem 1rem;
  height: calc(100vh - 13.5rem);
  overflow: auto;

  table {
    width: 100%;
  }
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

  &[disabled='disabled'] {
    color: #bbb;

    &:before {
      border-color: #bbb transparent transparent transparent
    }
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
  td {
    padding-top: 1rem;
    padding-bottom: 1rem;
    // &:after {
    content: '';
    cursor: pointer;
    // position: absolute;
    // bottom: -1px;
    border-bottom: 1px solid #707070;
    // width: calc(100% - 2rem);
    // margin: auto;
    // padding-bottom: 1rem;
    // }

    &.date {
      padding-left: 1rem;
    }

    &.location {
      padding-right: 1rem;
    }
  }

  &:hover {
    background: #eee;
  }
}

.firstPadding {
  padding-left: 1rem;
}

.lastPadding {
  padding-right: 1rem;
}

.sticky {

  td {
    position: sticky;
    top: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: #fff;
  }
}

.date {
  font-family: @lato;
  font-size: 1.2rem;
  line-height: 1;
  white-space: nowrap;

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
  min-width: 75px;
  text-align: center;

  &.winner {
    font-weight: 900;
    color: #2784C3;
  }

  &.loser {
    font-weight: 100;
    color: #707070;
  }
}

.location {
  font-family: @lato;
  font-weight: 200;
  line-height: 1.1;
  white-space: nowrap;

  .address {
    color: #2784C3;

    &:hover {
      text-decoration: none;
      color: lighten(#2784C3, 20%)
    }
  }
}

ul {
  background: #2784C3;
  z-index: 1;
}</style>
