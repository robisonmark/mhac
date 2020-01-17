<template>
  <div class="hello">
    <header>
      <h2>Stats</h2>
      <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="" v-model="newStats.season"></selectbox>
      <div class="switch" @click="edit = !edit">
        <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
        <span class="focused">Edit</span>
      </div>

      <div class="switch" @click="edit = !edit">
        <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
      </div>
    </header>

    <div class="" v-if="!selectedGame">
      <!-- add to edit table just rename columns -->
      <table id="table">
        <thead id="table-head-fixed">
          <tr>
            <th></th>
            <th>Date</th>
            <th>Opponent</th>
            <th>Home Team</th>
            <th>Missing Stats</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="game in pastGames" :key="game.id" :class="{ 'missing':  !game.missing_stats }" @click="enterStats(game)">
            <td></td>
            <td>{{game.game_date}}</td>
            <td>{{game.opponent}}</td>
            <td>{{game.home_team.name}}</td>
            <td>{{game.missing_stats}}</td>
            <td><font-awesome-icon :icon="['far', 'eye']" class="icon"></font-awesome-icon></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="selectedGame && boxscore">

      <table class="scoreTable">
        <thead>
          <tr>
            <th colspan="2">Box Score</th>
            <th v-for="(quarter, key, index) in quarters" :key="index" class="text-center quarter">{{Object.keys(quarter)[0]}}</th>
            <!-- <th class="text-center">2</th>
            <th class="text-center">3</th>
            <th class="text-center">4</th> -->
            <th class="finalScore text-center">Final</th>
          </tr>
        </thead>
        <tbody>
          <tr class="teamRow" :style="{'background-color': '#' + programInfo(selectedGame.home_team.name).main_color}">
            <td class="teamLogo">{{programInfo(selectedGame.home_team.name).team_mascot}}</td>
            <td :style="{'background-color': '#' + programInfo(selectedGame.home_team.name).main_color}">
              <div class="teamName">{{selectedGame.home_team.name}}</div>
              <div class="mascot">{{programInfo(selectedGame.home_team.name).team_mascot}}</div>
            </td>
            <td v-for="(quarter, key, index) in gameScore.homeTeam.quarters" :key="quarter[index]"><input type="number" v-model="gameScore.homeTeam.quarters[key]" />
            <td class="finalScore text-center">{{gameScore.homeTeam.final}}</td>
          </tr>
          <tr class="teamRow" :style="{'background-color': '#' + programInfo(selectedGame.away_team.name).main_color}">
            <td class="teamLogo">{{programInfo(selectedGame.away_team.name).team_mascot}}</td>
            <td class="teamName" :style="{'background-color': '#' + programInfo(selectedGame.away_team.name).main_color}">
              <div class="teamName">{{selectedGame.away_team.name}}</div>
              <div class="mascot">{{programInfo(selectedGame.away_team.name).team_mascot}}</div>
            </td>
            <td v-for="(quarter, key, index) in gameScore.awayTeam.quarters" :key="quarter[index]" class="quarter"><input type="number" v-model="gameScore.awayTeam.quarters[key]" />
            <td class="finalScore text-center">{{gameScore.awayTeam.final}}</td>
          </tr>
        </tbody>
      </table>
      <div class="container">
        <div class="row justify-content-end">
          <div class="col">
            <!-- <div class="button" @click="backToGameStats">
              Back To Games
            </div> -->
          </div>
          <div class="col text-right">
            <div class="button" @click="addOvertime">
              Add Overtime
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedGame" :id="[boxscore ? 'playerStats' : '']">
      <editTable :columns="columns" :config="config" :tabledata="stats" v-model="newGameStats">
        <template slot="thead">
          <tr>
            <th colspan="3"></th>
            <th colspan="3" class="light">2PT</th>
            <th colspan="3" class="dark">3PT</th>
            <th colspan="3" class="light">FT</th>
            <th colspan="3" class="dark">Rebounds</th>
            <th colspan="4"></th>
          </tr>
          <tr>
            <th class="text-center">#</th>
            <th class="pad-right">First Name</th>
            <th class="pad-right">Last Name</th>
            <!-- 2PT -->
            <th class="stat">A</th>
            <th class="stat">M</th>
            <th class="stat">%</th>
            <!-- 3PT -->
            <th class="stat">A</th>
            <th class="stat">M</th>
            <th class="stat">%</th>
            <!-- FT -->
            <th class="stat">A</th>
            <th class="stat">M</th>
            <th class="stat">%</th>
            <!-- Rebounds -->
            <th class="stat">O</th>
            <th class="stat">D</th>
            <th class="stat">Tot</th>

            <th class="stat">A</th>
            <th class="stat">BLK</th>

            <th class="stat">STL</th>
            <th class="stat">Total Pts</th>
          </tr>
        </template>

        <template slot="tbody">
          <tr v-for="(player, index) in newGameStats.player_stats" :key="index">
            <td class="text-center" v-html="player.player_number"></td>
            <td class="align-no-pad" v-html="player.player_first_name"></td>
            <td class="align-no-pad" v-html="player.player_last_name"></td>
            <!-- <td v-for="(stat, idx) in player.player_stats" :key="idx">
              {{stat}}
            </td> -->

            <!-- 2PT -->
            <td class="stat light first">
              <input v-if="edit === true" type="number" v-model="player.player_stats['2PA']" />
              <template v-else>{{player.player_stats['2PA']}}</template>
            </td>
            <td class="stat light">
              <input v-if="edit === true" type="number" v-model="player.player_stats['2PM']" />
              <template v-else>{{player.player_stats['2PM']}}</template>
            </td>
            <td class="stat light">{{percentage(player.player_stats['2PA'], player.player_stats['2PM'])}}</td>

            <!-- 3PT -->
            <td class="stat dark">
              <input v-if="edit === true" type="number" v-model="player.player_stats['3PA']" />
              <template v-else>{{player.player_stats['3PA']}}</template>
            </td>
            <td class="stat dark">
              <input v-if="edit === true" type="number" v-model="player.player_stats['3PM']" />
              <template v-else>{{player.player_stats['3PM']}}</template>
            </td>
            <td class="stat dark">{{percentage(player.player_stats['3PA'], player.player_stats['3PM'])}}</td>

            <!-- FT -->
            <td class="stat light">
              <input v-if="edit === true" type="number" v-model="player.player_stats.FTA" />
              <template v-else>{{player.player_stats.FTA}}</template>
            </td>
            <td class="stat light">
              <input v-if="edit === true" type="number" v-model="player.player_stats.FTM" />
              <template v-else>{{player.player_stats.FTM}}</template>
            </td>
            <td class="stat light">{{percentage(player.player_stats.FTA, player.player_stats.FTM)}}</td>

            <!-- Rebounds -->
            <td class="stat dark">
              <input v-if="edit === true" type="number" v-model="player.player_stats.offensive_rebounds" />
              <template v-else>{{player.player_stats.offensive_rebounds}}</template>
            </td>
            <td class="stat dark">
              <input v-if="edit === true" type="number" v-model="player.player_stats.defensive_rebounds" />
              <template v-else>{{player.player_stats.defensive_rebounds}}</template>
            </td>
            <td class="stat dark" v-html="player.player_stats.total_rebounds">{{total(player.player_stats.offensive_rebounds, player.player_stats.defensive_rebounds)}}</td>

            <td class="stat">
              <input v-if="edit === true" type="number" v-model="player.player_stats.assists" />
              <template v-else>{{player.player_stats.assists}}</template>
            </td>
            <td class="stat">
              <input v-if="edit === true" type="number" v-model="player.player_stats.blocks" />
              <template v-else>{{player.player_stats.blocks}}</template>
            </td>
            <td class="stat">
              <input v-if="edit === true" type="number" v-model="player.player_stats.steals" />
              <template v-else>{{player.player_stats.steals}}</template>
            </td>
            <td class="stat">
              <input v-if="edit === true" type="number" v-model="player.player_stats.total_points" />
              <template v-else>{{player.player_stats.total_points}}</template>
            </td>

          </tr>
        </template>

      </editTable>
      <div class="button" @click="backToGameStats">
        Back To Games
      </div>
    </div>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'

// components
import editTable from '@/components/editTable'
import selectbox from '../selectbox'

// mixins
// import { root } from '@/mixins/root'

export default {
  name: 'stats',
  data () {
    return {
      boxscore: false,
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
          name: 'First Name',
          icon: '',
          field_name: 'first_name',
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
          name: 'BLK',
          icon: '',
          field_name: 'blk',
          type: 'number'
        },
        {
          name: 'STL',
          icon: '',
          field_name: 'stl',
          type: 'number'
        }
      ],
      config: {
        'page': 'stats'
      },
      edit: false,
      gameScore: {
        homeTeam: {
          quarters: [
            '',
            '',
            '',
            ''
          ],
          final: 0
        },
        awayTeam: {
          quarters: [
            '',
            '',
            '',
            ''
          ],
          final: 0
        }
      },
      newStats: {
        season: ''
      },
      newGameStats: {
        'game_id': ''
      },
      overtimeCount: 1,
      pastGames: [
      ],
      quarters: [
        {'1': ''},
        {'2': ''},
        {'3': ''},
        {'4': ''}
      ],
      roster: [
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Player_2',
          height: 'None',
          id: 'd0e75004-a386-4954-9ae4-ec00ba95bbd1',
          last_name: 'test',
          person_type: 'None',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: 'a143e349-1d2c-43a5-b953-261425c04f8c',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: '07774cbd-14e7-48c4-943c-7c1762a02309',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: 'fba2f4f5-417c-4306-8999-808c0f251e2c',
          last_name: 'test',
          person_type: '1',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: '4d3d8200-68f3-431d-8e52-5b89da30ea63',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: 'cc57ae28-cc20-4e61-8cc6-99478ca91866',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_75',
          height: 'None',
          id: '00905a2b-fbce-4871-ab65-3c6719b426bc',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        }
      ],
      selectedGame: false,
      stats: [
      ]
    }
  },
  watch: {
    'newStats.season': {
      handler (newValue) {
        this.initSchedule(newValue.season_id, this.team)
      },
      deep: true
    },
    'gameScore.homeTeam.quarters': {
      handler (newValue) {
        this.gameScore.homeTeam.final = 0
        this.gameScore.homeTeam.quarters.forEach(quarter => {
          this.gameScore.homeTeam.final += isNaN(parseInt(quarter)) ? parseInt(0) : parseInt(quarter)
        })
      },
      deep: true
    },
    'gameScore.awayTeam.quarters': {
      handler (newValue) {
        this.gameScore.awayTeam.final = 0
        this.gameScore.awayTeam.quarters.forEach(quarter => {
          this.gameScore.awayTeam.final += isNaN(parseInt(quarter)) ? parseInt(0) : parseInt(quarter)
        })
      },
      deep: true
    }
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    team () {
      return this.$route.params.slug
    }
  },
  // mixins: [
  //   root
  // ],
  components: {
    'editTable': editTable,
    'selectbox': selectbox
  },
  created () {
    // this.initSchedule()
  },
  methods: {
    initSchedule (level, team) {
      api.getSchedule(level, team).then(response => {
        let fixedData = []
        response.data.forEach(game => {
          // if (game.game_time === '12:00 AM ') {
          //   game.game_time = 'TBD'
          // }
          if (game.home_team.slug === this.team) {
            game['opponent'] = game.home_team.name
            game['rosterId'] = game.home_team.id
          } else {
            game['opponent'] = game.away_team.name
            game['rosterId'] = game.away_team.id
          }
          fixedData.push(game)
        })
        this.pastGames = fixedData
        // this.sortTable('game_date', false)
      })
    },
    programInfo (teamName) {
      const team = this.$store.state.teams.filter(team => {
        // console.log(team)
        if (team.team_name === teamName) {
          // console.log(team)
          return team
        }
      })
      // console.log(team[0].team_mascot)
      return team[0]
    },
    initRoster (id) {
      api.getPlayers(id).then(response => {
        let roster = []
        response.data.forEach(player => {
          let rosterObj = {
            'player_id': player.uuid,
            'player_number': player.number,
            'player_last_name': player.last_name,
            'player_first_name': player.first_name,
            'player_stats': {
              // 'gs': false,
              '2PM': '',
              '2PA': '',
              '3PM': '',
              '3PA': '',
              'FTM': '',
              'FTA': '',
              'OREB': '',
              'DREB': '',
              'AST': '',
              'TO': '',
              'BLK': '',
              'STEAL': ''
            }
          }
          roster.push(rosterObj)

          delete player.birth_date
          delete player.height
          delete player.person_type
          delete player.position
        })

        this.roster = roster

        return roster
      })
    },
    enterStats (game) {
      this.newGameStats.game_id = game.game_id
      this.initNewGameStats(game.rosterId)
      // this.initRoster(game.rosterId)
      // this.initRoster('d2da3cbd-dbdb-4b40-9002-aefc705d229f')
      this.selectedGame = game

      if (game.home_team.slug === this.team) {
        this.boxscore = true
      }
    },
    addOvertime () {
      this.quarters.push({['OT' + this.overtimeCount]: ''})
      this.gameScore.homeTeam.quarters.push({['OT' + this.overtimeCount]: ''})
      this.gameScore.awayTeam.quarters.push({['OT' + this.overtimeCount]: ''})

      this.overtimeCount++
    },
    backToGameStats () {
      this.newGameStats.game_id = ''
      this.selectedGame = false
      this.boxscore = false
    },
    goToPlayerStats () {
      this.boxscore = false
    },
    initNewGameStats (rosterId) {
      api.getGameResults(this.newGameStats.game_id, rosterId).then(response => {
        // console.log(response)
        // roster = this.initRoster(response.data.team_id)

        // let teamInfo = {
        //   'team_uuid': '',
        //   'team_stats': roster
        // }

        // this.newGameStats = {
        //   ...this.newGameStats,
        //   ...teamInfo
        // }
        this.newGameStats = response.data
      })
    },
    percentage (attempted, made) {
      if (attempted >= 1) {
        return ((made / attempted) * 100).toFixed(1)
      } else {
        return 0
      }
    },
    total (val1, val2) {
      if (val1 === undefined) {
        val1 = 0
      }

      if (val2 === undefined) {
        val2 = 0
      }

      return val1 + val2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@teamColor: var(--bg-color);
header {
  display: inline-block;
  width: 100%;
  h2 {
    display: inline-block;
  }
  .switch {
    // display: inline-block;
    float: right;
    [class^="fa-"],
    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  &:after {
    content: '';
    display: block;
    height: 40px;
    /* width: 100%; */
    width: calc(100% + 2.4rem);
    border-top: 1.5px solid @teamColor;
    border-right: 2px solid @teamColor;
    border-left: 2px solid transparent;
    position: relative;
    -webkit-transform: skewX(-45deg);
    transform: skewX(-45deg);
    left: -23px;
    margin-top: .6rem;
  }
}

.ghostHover (@color) {
  margin-top: .5rem;
  margin-bottom: .5rem;
  // border-color: @color;
  color: @color;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  overflow: hidden;
  padding-left: calc(.8rem - 4px);
  padding-right: calc(.8rem - 4px);
  // width: 32px;
  .icon {
    width: 1rem;
    height: 1rem;
  }

  .focused {
    display: inline-block;
    width: 0px;
    position: relative;
    left: 2rem;
    transition: ease-in-out .5s all;
  }
  &:hover {
    .focused {
      width: 100%;
      left: 0rem;
      padding-left: .5rem;
      transition: ease-in-out .5s all;
    }
  }
}
.switch {
  background-color: var(--bg-color);
  border-color: var(--bg-color);
  .ghostHover(#fff)
}
table {
  margin-top: -40px;
  width: 100%;
  border-collapse: collapse;
  // border-spacing: 0 5px;
  position: relative;
  z-index: 1;

  th, tr {
    text-align: left;
    .number {
      text-align: center;
    }
  }

  thead {
    tr {
      height: 40px;
    }
    th {
      font-weight: 200;
      line-height: 1;
      white-space: nowrap;
      &.pad-right {
        padding-right: 1rem;
      }
    }
    // &:before {
    //   content: '';
    //   display: block;
    //   height: 40px;
    //   width: calc(100% + 45px);
    //   // width: calc(100% + 15px);
    //   // border-top: 1px solid var(--bg-color);
    //   // border-right: 1px solid var(--bg-color);
    //   border-top: 1.5px solid #B42625;
    //   border-right: 2px solid #B42625;
    //   border-left: 2px solid transparent;
    //   position: absolute;
    //   -webkit-transform: skewX(-45deg);
    //   transform: skewX(-45deg);
    //   left: -23px;
    // }
  }

  tbody {
    tr {
      background-color: #fff;
      height: 50px;
      border-bottom: 5px solid #CFCDCD;
      .add-button {
        cursor: pointer;
      }

      &.split-fields{
        td {
          border-right: 5px solid #CFCDCD;
          input[type="text"] {
            height: 50px;
            border: 0;
            outline: none;
          }
          &:last-child{
            border-right: 0px;
            // background-color: #CFCDCD;
          }
        }
      }

      // tr last child
      &:last-child {
        border-bottom: 0px;
        // background-color: #CFCDCD;
      }

      &.missing {
        background-color: #F0E9E9;
      }
    }
  }
  td {
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    &:last-child{
      border-right: 0px;
      // background-color: #CFCDCD;
    }
    &.align-no-pad {
      padding-left: 0;
    }
  }
}

.scoreTable {
  line-height: 1;
  .teamName {
    font-size: .9rem;
  }
  .mascot {
    font-size: 1.5rem;
  }
  // max-width: 400px;
  border-collapse: collapse;
  tr {
    border-bottom: 0;
  }
  td {
    color: #F0E9E9;
    padding: 0;
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    &.teamLogo {
      text-align: center;
    }
    input {
      text-align: center;
      color: #000;
      padding: 0;
      height: 50px;
      box-sizing: border-box;
    }
    &:nth-child(odd) input{
        background-color: rgba(255,255,255, .6);
      }
      &:nth-child(even) input{
        background-color: rgba(255,255,255, .8);
      }
  }
}
.quarter {
  width: 55px;
}
.finalScore {
  width: 75px;
}
#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}

#playerStats {
  margin-top: 5rem;
  table{
    margin-top: 0;
    &:before {
      content: '';
      display: block;
      height: 40px;
      width: 100%;
      width: calc(100% + 2.4rem);
      border-top: 1.5px solid @teamColor;
      border-right: 2px solid @teamColor;
      border-left: 2px solid transparent;
      position: absolute;
      -webkit-transform: skewX(-45deg);
      transform: skewX(-45deg);
      /* left: -23px; */
      /* margin-top: 0.6rem; */
      top: 0;
      right: -20px;
    }
  }
}
.dark {
  background-color: var(--team-second);
  color: white;
  text-align: center;
  font-style: italic;
  font-weight: 200;
}
.light {
  background-color: var(--bg-color);
  color: white;
  text-align: center;
  font-style: italic;
  font-weight: 200;
}

.stat{
  // td {
  border-right: 5px solid #CFCDCD;
  text-align: center;
  padding: 0;
  min-width: 50px;
  input {
    font-weight: 400;
    height: 50px;
    border: 0;
    outline: none;
    text-align: center;
  }
  &.first{
    border-left: 5px solid #CFCDCD;
    // background-color: #CFCDCD;
  }
  &:last-child{
    border-right: 0px;
    // background-color: #CFCDCD;
  }
}
// }
</style>
