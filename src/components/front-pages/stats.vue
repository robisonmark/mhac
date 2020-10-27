<template>
  <div class="container">
    <div class="page-styles">
      <div class="row print-only align-items-start justify-content-between">
        <div class="col-4">
          <h2>2019 - 2020 Stats</h2>
        </div>
        <div class="col right">
          <div>{{filterBy.game.teams}}</div>
          <div>{{filterBy.team.name}}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="row filter-bar">
          <div class="col-md-4">
            <h2>2019 - 2020 Stats</h2>
          </div>
          <div class="col-md-6">
            <div class="filters">

              <div class="custom-select"  @click="showLevels = !showLevels, showTeams = false, showDatePicker = false">
                <div class="selected" disabled>{{filterBy.level.level}}</div>
                <div class="options-menu">
                  <template>
                    <div class="option" v-for="lvl in levels" :key="lvl.season_id" v-show="showLevels" @click="setLvl(lvl)">
                      {{lvl.level}}
                    </div>
                  </template>
                </div>
              </div>

              <div class="custom-select" @click="showGames = !showGames">
                <div class="selected" disabled>{{filterBy.game.teams}}</div>
                <div class="options-menu">
                  <template >
                    <div class="option" v-for="game in games" :key="game.game_id" v-show="showGames" @click="setGame(game)">
                      {{game.teams}} <!-- {{game.game_date}} -->
                    </div>
                  </template>
                </div>
              </div>

              <div class="custom-select"  :disabled="filterBy.game.game_id === ''" @click="showTeams = !showTeams">
                <div class="selected" disabled>{{filterBy.team.name}}</div>
                <div class="options-menu">
                  <template >
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
      <!-- <div class="goBack">
        <span @click="$router.back()">
          Go Back
        </span>
      </div> -->
      <div class="col content" align="center" v-if="message">
        <h4><em>{{this.message}}</em></h4>
      </div>

      <div class="col content" align="center" v-else>
        <table class="public-stats-table">
          <thead>
            <tr class="rowOne">
              <th colspan="4" v-if="compositStats"></th>
              <th colspan="3" v-else></th>
              <th colspan="3" class="light">2PT</th>
              <th colspan="3" class="dark">3PT</th>
              <th colspan="3" class="light">FT</th>
              <th colspan="3" class="dark">Rebounds</th>
              <th colspan="6"></th>
            </tr>
            <tr class="rowTwo">
              <th @click="sortTable('player_number')" class="nowrap" :class="[currentSort === 'player_number' ? 'sort' : '']">
                # <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th @click="sortTable('player_first_name')" class="nowrap" :class="[currentSort === 'player_first_name' ? 'sort' : '']">
                First Name <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th @click="sortTable('player_last_name')" class="nowrap" :class="[currentSort === 'player_last_name' ? 'sort' : '']">
                Last Name <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th v-if="compositStats" @click="sortTable('team_name')" class="nowrap" :class="[currentSort === 'team_name' ? 'sort' : '']">
                Team <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <!-- 2PT -->
              <th class="stat" @click="sortTable('player_stats', '2PA')" :class="[currentSort === 'player_stats' && currentNested === '2PA' ? 'sort' : '']">A
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats','2PM')" :class="[currentSort === 'player_stats' && currentNested === '2PM' ? 'sort' : '']">M
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats','2P%')" :class="[currentSort === 'player_stats' && currentNested === '2P%' ? 'sort' : '']">%
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <!-- 3PT -->
              <th class="stat" @click="sortTable('player_stats', '3PA')" :class="[currentSort === 'player_stats' && currentNested === '3PA' ? 'sort' : '']">A
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', '3PM')" :class="[currentSort === 'player_stats' && currentNested === '3PM' ? 'sort' : '']">M
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', '3P%')" :class="[currentSort === 'player_stats' && currentNested === '3P%' ? 'sort' : '']">%
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <!-- FT -->
              <th class="stat" @click="sortTable('player_stats', 'FTA')" :class="[currentSort === 'player_stats' && currentNested === 'FTA' ? 'sort' : '']">A
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'FTM')" :class="[currentSort === 'player_stats' && currentNested === 'FTM' ? 'sort' : '']">M
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'FT%')" :class="[currentSort === 'player_stats' && currentNested === 'FT%' ? 'sort' : '']" >%
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <!-- Rebounds -->
              <th class="stat" @click="sortTable('player_stats', 'offensive_rebounds')" :class="[currentSort === 'player_stats' && currentNested === 'offensive_rebounds' ? 'sort' : '']">O
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'defensive_rebounds')" :class="[currentSort === 'player_stats' && currentNested === 'defensive_rebounds' ? 'sort' : '']">D
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'total_rebounds')" :class="[currentSort === 'player_stats' && currentNested === 'total_rebounds' ? 'sort' : '']">Tot
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <th class="stat" @click="sortTable('player_stats', 'assists')" :class="[currentSort === 'player_stats' && currentNested === 'assists' ? 'sort' : '']">AST
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'blocks')" :class="[currentSort === 'player_stats' && currentNested === 'blocks' ? 'sort' : '']">BLK
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <th class="stat" @click="sortTable('player_stats', 'steals')" :class="[currentSort === 'player_stats' && currentNested === 'steals' ? 'sort' : '']">
                STL
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" v-if="compositStats" @click="sortTable('player_stats', 'turnovers')" :class="[currentSort === 'player_stats' && currentNested === 'turnovers' ? 'sort' : '']">
                TO
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <th class="stat" @click="sortTable('player_stats', 'total_points')" :class="[currentSort === 'player_stats' && currentNested === 'total_points' ? 'sort' : '']">Total Pts
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" v-if="compositStats" @click="sortTable('player_stats', 'points_per_game')" :class="[currentSort === 'player_stats' && currentNested === 'points_per_game' ? 'sort' : '']">
                PPG
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in stats" :key="index">
              <td v-html="player.player_number" class="nowrap"></td>
              <td v-html="player.player_first_name" class="nowrap"></td>
              <td v-html="player.player_last_name" class="nowrap"></td>
              <td v-if="compositStats" v-html="player.team_name" class="nowrap"></td>
              <!-- <td v-for="(stat, idx) in player.player_stats" :key="idx">
                {{stat}}
              </td> -->

              <!-- 2PT -->
              <td class="stat light" v-html="player.player_stats['2PA']"></td>
              <td class="stat light" v-html="player.player_stats['2PM']"></td>
              <td class="stat light">{{percentage(player.player_stats['2PA'], player.player_stats['2PM'])}}</td>

              <!-- 3PT -->
              <td class="stat dark" v-html="player.player_stats['3PA']"></td>
              <td class="stat dark" v-html="player.player_stats['3PM']"></td>
              <td class="stat dark">{{percentage(player.player_stats['3PA'], player.player_stats['3PM'])}}</td>

              <!-- FT -->
              <td class="stat light" v-html="player.player_stats.FTA"></td>
              <td class="stat light" v-html="player.player_stats.FTM"></td>
              <td class="stat light">{{percentage(player.player_stats.FTA, player.player_stats.FTM)}}</td>

              <!-- Rebounds -->
              <td class="stat dark" v-html="player.player_stats.offensive_rebounds"></td>
              <td class="stat dark" v-html="player.player_stats.defensive_rebounds"></td>
              <td class="stat dark">{{totalRebounds(player.player_stats.total_rebounds, player.player_stats.offensive_rebounds, player.player_stats.defensive_rebounds)}}</td>

              <td class="stat" v-html="player.player_stats.assists"></td>
              <td class="stat" v-html="player.player_stats.blocks"></td>
              <td class="stat" v-html="player.player_stats.steals"></td>
              <td class="stat" v-if="compositStats" v-html="player.player_stats.turnovers"></td>

              <td class="stat" v-html="player.player_stats.total_points"></td>
              <td class="stat" v-if="compositStats" v-html="player.player_stats.points_per_game.toFixed(2)"></td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'
import _ from 'lodash'

// mixins
import { root } from '../../mixins/root'

export default {
  name: 'stats',
  data () {
    return {
      columns: [
        {
          name: '#',
          icon: '',
          field_name: 'number',
          type: 'text'
        },
        {
          name: 'Last Name',
          icon: '',
          field_name: 'last_name',
          type: 'text'
        },
        {
          name: 'GS',
          icon: '',
          field_name: 'gs',
          type: 'checkbox'
        },
        {
          name: 'FGM',
          icon: '',
          field_name: 'fg_m',
          type: 'number'
        },
        {
          name: 'FGA',
          icon: '',
          field_name: 'fg_a',
          type: 'number'
        },
        {
          name: 'FG%',
          icon: '',
          field_name: 'fg%',
          type: 'text'
        },
        {
          name: '3PTM',
          icon: '',
          field_name: '3pt_m',
          type: 'number'
        },
        {
          name: '3PTA',
          icon: '',
          field_name: '3pt_a',
          type: 'number'
        },
        {
          name: '3PT%',
          icon: '',
          field_name: '3pt_%',
          type: 'number'
        },
        {
          name: 'FTM',
          icon: '',
          field_name: 'ft_m',
          type: 'number'
        },
        {
          name: 'FTA',
          icon: '',
          field_name: 'ft_a',
          type: 'number'
        },
        {
          name: 'FT%',
          icon: '',
          field_name: 'ft_%',
          type: 'number'
        },
        {
          name: 'RB OF',
          icon: '',
          field_name: 'rb_off',
          type: 'number'
        },
        {
          name: 'RB DE',
          icon: '',
          field_name: 'rb_def',
          type: 'number'
        },
        {
          name: 'RB TOT',
          icon: '',
          field_name: 'rb_tot',
          type: 'number'
        },
        {
          name: 'A',
          icon: '',
          field_name: 'a',
          type: 'number'
        },
        {
          name: 'TO',
          icon: '',
          field_name: 'to',
          type: 'number'
        },
        {
          name: 'A/T',
          icon: '',
          field_name: 'ato',
          type: 'number'
        },
        {
          name: 'BLK',
          icon: '',
          field_name: 'blk',
          type: 'number'
        },
        {
          name: 'PPG',
          icon: '',
          field_name: 'ppg',
          type: 'number'
        },
        {
          name: 'TPS',
          icon: '',
          field_name: 'tps',
          type: 'number'
        }
      ],
      compositStats: true,
      currentSort: '',
      currentNested: '',
      currentSortDir: 'asc',
      filterBy: {
        team: {
          id: '',
          name: 'All Teams'
        },
        level: {
          season_id: '',
          level: 'All Levels'
        },
        game: {
          game_id: '',
          teams: 'All Games',
          home_team: '',
          away_team: ''
        }
      },
      message: 'Please filter to see results.',
      showGames: false,
      showLevels: false,
      showTeams: false,
      stats: []
    }
  },
  mixins: [root],
  computed: {
    teams () {
      // let teams = [{id: '', team_name: 'All Teams'}, ...this.$store.state.teams]
      const teams = [
        { id: this.filterBy.game.home_team.id, team_name: this.filterBy.game.home_team.name },
        { id: this.filterBy.game.away_team.id, team_name: this.filterBy.game.away_team.name }
      ]
      return teams
    },
    levels () {
      // const levels = [{season_id: '', level: 'All Levels'}, ...this.$store.state.seasons]
      const levels = [...this.$store.state.seasons]
      return levels
    },
    games () {
      const gameFilter = [{ game_id: '', home_team: { team_level: 'All Levels' }, teams: 'All Games' }]

      this.$store.state.fullSchedule.forEach(game => {
        game.teams = game.home_team.name + ' vs. ' + game.away_team.name + ' - ' + game.home_team.team_level

        // delete game.home_team
        // delete game.away_team
        delete game.game_time
        delete game.schedule_id
        delete game.final_score

        gameFilter.push(game)
      })
      return gameFilter.filter((game) => {
        if (game.home_team.team_level.toLowerCase().match(this.filterBy.level.level.toLowerCase())) {
          return game.home_team.team_level.toLowerCase().match(this.filterBy.level.level.toLowerCase())
        } else if (this.filterBy.level.level === 'All Levels') {
          return game
        }
      })
    }
    // stats () {
    // }
  },
  watch: {
    'filterBy.team': {
      deep: true,
      handler (newValue, oldValue) {
        this.initStats(this.filterBy.game.game_id, newValue.id)
      }
    },
    'filterBy.level': {
      deep: true,
      handler (newValue, oldValue) {
        this.initSeasonStats()
        // this.filterList(newValue.season_id)
      }
    },
    'filterBy.game': {
      deep: true,
      handler (newValue, oldValue) {
        this.initStats(newValue.game_id)
      }
    },
    levels: {
      deep: true,
      handler (newValue, oldValue) {
        this.filterBy.level = {
          season_id: newValue[0].season_id,
          level: newValue[0].level
        }
      }
    }
  },
  created () {
    if (Object.prototype.hasOwnProperty.call(this.$route.query, 'game') &&
    Object.prototype.hasOwnProperty.call(this.$route.query, 'home_team')) {
      this.initStats(this.$route.query.game, this.$route.query.home_team)
    } else if (Object.prototype.hasOwnProperty.call(this.$route.query, 'game')) {
      this.initStats(this.$route.query.game.game_id)
    } else {
    }

    this.$root.$on('close', payload => {
      // this.showDatePicker = false
      // this.showTeams = false
    })
  },
  updated () {
    const self = this
    if (Object.prototype.hasOwnProperty.call(this.$route.query, 'game') &&
    Object.prototype.hasOwnProperty.call(this.$route.query, 'home_team')) {
      const game = self.games.find(game => {
        return game.game_id === self.$route.query.game
      })
      if (game && self.filterBy.game.game_id === '') {
        self.setGame(game)
      }

      if (game && self.filterBy.level.season_id === '') {
        const level = self.levels.find(level => { return level.level === game.home_team.team_level })
        self.setLvl(level)
      }
    }
  },
  methods: {
    initSeasonStats () {
      const data = {
        season_id: this.filterBy.level.season_id
      }
      api.getSeasonStats(data).then(response => {
        if (response.data.length >= 1) {
          this.message = false
        } else {
          this.message = 'Stats have not been provided for this team and this game.'
        }

        this.stats = response.data
      })
    },
    initStats (gameId, teamId) {
      if (gameId !== undefined && teamId === undefined) {
        teamId = this.games.find(game => { return game.game_id === gameId })
        teamId = teamId.home_team.id
        this.filterBy.team = _.cloneDeep(this.filterBy.game.home_team)
      } else if (gameId !== undefined && teamId !== undefined) {
        // gameId = gameId
        // teamId = teamId
      }
      api.getGameResults(gameId, teamId).then(response => {
        if (response.data.player_stats.length >= 1) {
          this.message = false
        } else {
          this.message = 'Stats have not been provided for this team and this game.'
        }
        this.compositStats = false
        this.stats = response.data.player_stats
      })
    },
    setLvl (lvl) {
      this.filterBy.level.season_id = lvl.season_id
      this.filterBy.level.level = lvl.level
      // this.showTeams = false
      // console.log(this.showTeams)
    },
    setTeam (team) {
      this.filterBy.team.id = team.id
      this.filterBy.team.name = team.team_name
      // this.showTeams = false
      // console.log(this.showTeams)
    },
    setGame (game) {
      this.filterBy.game.game_id = game.game_id
      this.filterBy.game.teams = game.teams
      this.filterBy.game.home_team = { id: game.home_team.id, name: game.home_team.name }
      this.filterBy.game.away_team = { id: game.away_team.id, name: game.away_team.name }
      // this.showTeams = false
      // console.log(this.showTeams)
    },
    percentage (attempted, made) {
      if (attempted >= 1) {
        return ((made / attempted) * 100).toFixed(1)
      } else {
        return 0
      }
    },
    totalRebounds (rebounds, off, def) {
      if (rebounds === null) {
        return off + def
      } else {
        return rebounds
      }
    },
    sortTable (s, nested) {
      // if s == current sort, reverse
      if (nested) {
        if (nested === this.currentNested) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        this.currentSort = s
        this.currentNested = nested
      } else {
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        this.currentSort = s
      }

      this.stats.sort((a, b) => {
        let modifier = 1
        if (nested) {
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort][nested] !== '') {
            if (a[this.currentSort][nested] < b[this.currentSort][nested]) return -1 * modifier
            if (a[this.currentSort][nested] > b[this.currentSort][nested]) return 1 * modifier
          }
          return 0
        } else {
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        }
      })
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
.page-styles{
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
}
.content {
  padding: 2rem 1rem;
  overflow: auto;
  height: calc(100vh - 13.5rem);
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
  // max-width: 250px;
  max-width: 33%;
  padding-right: 25px;
  white-space: nowrap;
  margin: 0 1rem;

  &[disabled='disabled'] {
    color: #bbb;
     &:before {
       border-color: #bbb transparent transparent transparent
     }
  }

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: .2rem .2rem 0 .2rem;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    // right: -1rem;
    right: 0;
    top: 8px;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    transform: skewX(-45deg);
    border-bottom: 2px solid;
    border-right: 2px solid;
    // width: 130%;
    width: 100%;
    height: 1.5rem;
    top: 0;
    left: .5rem;
  }
}
.options-menu {
  position: absolute;
  width: 250px;
  white-space: normal;
  background: #0C4B75;
  // padding: .5rem;
  top: calc(1.5rem);
  left: -3px;
  z-index: 2;
  box-shadow: 1px 2px 4px #0C4B75;
  max-height: 45vh;
  overflow-y: auto;

  .option {
    padding: .2rem .5rem;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      background-color: lighten(#0C4B75, 10%);
    }
  }
}
.selected {
  width: 100%;
  overflow: hidden;
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
.public-stats-table  {
  // overflow-x: auto;
  width: 100%;
}

tbody {
  tr {
    border-bottom: 1px solid #707070;
  }
  td {
    padding-top: .5rem;
    padding-bottom: .5rem;
    font-family: @open-sans;
    position: relative;
    z-index: 1;
    min-width: 2rem;
    &.nowrap {
      white-space: nowrap;
    }
    &.dark {
      background-color: rgba(2,26,43, .4);
      color: #231F20;
      font-weight: 400;
      font-style: normal;
    }
    &.light {
      background-color: rgba(39,132,195, .3);
      color: #231F20;
      font-weight: 400;
      font-style: normal;
    }
  }
}

.stat {
  text-align: center;
}
th {
  font-family: @lato;
  font-weight: 200;
  font-size: .8rem;
  position: sticky;
  z-index: 2;
  background-color: #fff;

  .rowOne & {
    top: -2rem;
    height: 1rem;
  }
  .rowTwo & {
    top: -.8rem;
  }
  cursor: pointer;
  .icon {
    display: none;
  }
  &.sort {
    font-weight: 600;
    color: #021A2B;
    .icon {
      display: inline-block;
    }
    .asc {
      transform: rotate(180deg);
      transition: ease-in-out .3s all;
    }
    .dsc {
      // transform: rotate(180deg);
      transition: ease-in-out .3s all;
    }
  }
}
.dark {
  background-color: #021A2B;
  color: white;
  text-align: center;
  font-style: italic;
}
.light {
  background-color: #2784C3;
  color: white;
  text-align: center;
  font-style: italic;
}
td {
  &:nth-child(even) {
    &:after {
      content: '';
      background-color: rgba(205,203,203, .46);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      mix-blend-mode: color-burn;
    }
  }
  &:nth-child(0),
  &:nth-child(1),
  &:nth-child(2) {
    background-color: #fff;
    &:after {
      display: none;
    }
  }
}
</style>
