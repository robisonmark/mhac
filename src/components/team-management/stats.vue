// TODO: Add a modal for uploading a csv with scores...

<template>
  <div class="hello">
    <header class="contentPad">
      <h2>Stats</h2>
      <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newStats.season"></selectbox>

      <div class="buttonCon">
        <template v-if="selectedGame">
          <div class="switch" @click="backToGameStats">
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon"></font-awesome-icon> Back To Games
          </div>
          <div class='switch' @click="toggleModal()">
            <font-awesome-icon :icon="['fas', 'file-import'] " class="icon"></font-awesome-icon>
            <span class="focused">Import Scores</span>
          </div>
          <div class="switch" @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
            <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
            <span class="focused">Edit</span>
          </div>

          <div class="switch" v-if="edit" @click="saveStats()">
            <font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon>
            <span class="focused" v-if="!saving">Save</span>
            <span v-else>saving...</span>

          </div>
        </template>
      </div>
    </header>
    <div class="contentPad">
      <div class="" v-if="!selectedGame">
        <!-- add to edit table just rename columns -->
        <table id="table">
          <thead id="table-head-fixed">
            <tr class="rowOne">
              <th></th>
              <th>Date</th>
              <th>Opponent</th>
              <th>Home Team</th>
              <th>Missing Stats</th>
              <th>Level</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="game in pastGames" :key="game.id" :class="{ 'missing':  !game.missing_stats }" @click="enterStats(game)">
              <td></td>
              <td>{{game.game_date}}</td>
              <td>{{game.opponent}}</td>
              <td>{{game.home_team.team_name}}</td>
              <td>{{game.missing_stats}}</td>
              <td>{{game.level}} </td>
              <td><font-awesome-icon :icon="['far', 'eye']" class="icon"></font-awesome-icon></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="selectedGame">

        <table class="scoreTable">
         <thead>
            <tr class="rowZero" v-if="!boxscore">
              <th colspan="3">
                ** You are not the home team, and will not be able to edit the box score
              </th>
            </tr>
            <tr class="rowOne">
              <th colspan="2">Box Score</th>
              <th v-for="(quarter, key, index) in quarters" :key="index" class="text-center quarter">{{Object.keys(quarter)[0]}}</th>
              <th class="finalScore text-center">Final</th>
            </tr>
          </thead>
          <tbody>
            <tr class="teamRow" :style="{'background-color': '#' + programInfo(selectedGame.home_team.team_name).main_color}">
              <td class="teamLogo">
                <div class="imgCon" :style="{'background-color': '#' + programInfo(selectedGame.home_team.team_name).secondary_color}">
                  <img class="boxScoreImg" :src="'/static/color-team-logos/' + programInfo(selectedGame.home_team.team_name).logo_color" />
                </div>
              </td>
              <td :style="{'background-color': '#' + programInfo(selectedGame.home_team.team_name).main_color}">
                <div class="teamName">{{selectedGame.home_team.team_name}}</div>
                <div class="mascot">{{programInfo(selectedGame.home_team.team_name).team_mascot}}</div>
              </td>

              <td v-for="(period,index ) in gameScore.period_scores" :key=index class="quarter">
                <input v-if="edit === true && boxscore" type="number" min="0" v-model="gameScore.period_scores[index].home_score " />
                <template v-else>{{period.home_score}}</template>
              </td>
              <!-- <td v-for="(quarter, key, index) in gameScore.homeTeam.quarters" :key="quarter[index]" class="quarter"> -->
                <input v-if="edit === true && boxscore" type="number" min="0" v-model="gameScore.final_scores.home_score" />
                <!-- <template v-else>{{gameScore.awayTeam.quarters[key]}}</template>  -->
              <td v-else class="finalScore text-center">{{gameScore.final_scores.home_score}}</td>
            </tr>
            <tr class="teamRow" :style="{'background-color': '#' + programInfo(selectedGame.away_team.team_name).main_color}">
              <td class="teamLogo">
                <div class="imgCon" :style="{'background-color': '#' + programInfo(selectedGame.away_team.team_name).secondary_color}">
                  <img class="boxScoreImg" :src="'/static/color-team-logos/' + programInfo(selectedGame.away_team.team_name).logo_color" />
                </div>
              </td>
              <td class="teamName" :style="{'background-color': '#' + programInfo(selectedGame.away_team.team_name).main_color}">
                <div class="teamName">{{selectedGame.away_team.team_name}}</div>
                <div class="mascot">{{programInfo(selectedGame.away_team.team_name).team_mascot}}</div>
              </td>
              <td v-for="(period,index) in gameScore.period_scores" :key=index >
                  <input v-if="edit === true && boxscore" type="number" min="0" v-model="gameScore.period_scores[index].away_score" />
                <template v-else>{{period.away_score}}</template>
              </td>
              <!-- <td v-for="(quarter, key, index) in gameScore.awayTeam.quarters" :key="quarter[index]" class="quarter"> -->
                <input v-if="edit === true && boxscore" type="number" min="0" v-model="gameScore.final_scores.away_score" />
                <!-- <template v-else>{{gameScore.awayTeam.quarters[key]}}</template> -->
              <td v-else class="finalScore text-center">{{gameScore.final_scores.away_score}}</td>
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
              <div v-if="edit === true && boxscore" class="button" @click="addOvertime">
                <font-awesome-icon :icon="['fas', 'stopwatch']" class="icon"></font-awesome-icon> Add Overtime
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedGame" :id="'playerStats'">
        <editTable :columns="columns" :config="config" :tabledata="stats" v-model="newGameStats">

          <template v-slot:thead>
            <tr class="rowOne">
              <th colspan="4"></th>
              <th colspan="3" class="light">2PT</th>
              <th colspan="3" class="dark">3PT</th>
              <th colspan="3" class="light">FT</th>
              <th colspan="3" class="dark">Rebounds</th>
              <th colspan="3"></th>
            </tr>
            <tr class="rowTwo">
              <!-- <th class="text-center sticky" @click="sortTable('player_number')">#</th>
              <th class="pad-right sticky" @click="sortTable('first_name')">First Name</th>
              <th class="pad-right sticky" @click="sortTable('last_name')">Last Name</th> -->
              <!-- 2PT -->
              <!-- <th class="stat" @click="sortTable('player_stats', 'FGA')">M</th>
              <th class="stat" >A</th>
              <th class="stat">%</th> -->
              <!-- 3PT -->
              <!-- <th class="stat">M</th>
              <th class="stat">A</th>
              <th class="stat">%</th> -->
              <!-- FT -->
              <!-- <th class="stat">M</th>
              <th class="stat">A</th>
              <th class="stat">%</th> -->
              <!-- Rebounds -->
              <!-- <th class="stat">O</th>
              <th class="stat">D</th>
              <th class="stat">Tot</th> -->

              <!-- <th class="stat">To</th>
              <th class="stat">Ast</th>
              <th class="stat">Blk</th> -->

              <!-- <th class="stat">Stl</th>
              <th class="stat">Total Pts</th> -->
              <th @click="sortTable('player_number')" class="nowrap text-center" :class="[currentSort === 'player_number' ? 'sort' : '']">
                # <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th @click="sortTable('player_first_name')" class="nowrap" :class="[currentSort === 'player_first_name' ? 'sort' : '']">
                First Name <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th @click="sortTable('player_last_name')" class="nowrap" :class="[currentSort === 'player_last_name' ? 'sort' : '']">
                Last Name <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="nowrap">
                  Game Played
              </th>
              <!-- 2PT -->
              <th class="stat" @click="sortTable('player_stats','FGM')" :class="[currentSort === 'player_stats' && currentNested === 'FGM' ? 'sort' : '']">M
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'FGA')" :class="[currentSort === 'player_stats' && currentNested === 'FGA' ? 'sort' : '']">A
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats','2P%')" :class="[currentSort === 'player_stats' && currentNested === '2P%' ? 'sort' : '']">%
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <!-- 3PT -->
              <th class="stat" @click="sortTable('player_stats', 'ThreeP')" :class="[currentSort === 'player_stats' && currentNested === 'ThreePM' ? 'sort' : '']">M
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'ThreePA')" :class="[currentSort === 'player_stats' && currentNested === 'ThreePA' ? 'sort' : '']">A
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', '3P%')" :class="[currentSort === 'player_stats' && currentNested === '3P%' ? 'sort' : '']">%
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <!-- FT -->
              <th class="stat" @click="sortTable('player_stats', 'FTM')" :class="[currentSort === 'player_stats' && currentNested === 'FTM' ? 'sort' : '']">M
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'FTA')" :class="[currentSort === 'player_stats' && currentNested === 'FTA' ? 'sort' : '']">A
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'FT%')" :class="[currentSort === 'player_stats' && currentNested === 'FT%' ? 'sort' : '']" >%
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <!-- Rebounds -->
              <th class="stat" @click="sortTable('player_stats', 'OREB')" :class="[currentSort === 'player_stats' && currentNested === 'OREB' ? 'sort' : '']">O
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'DREB')" :class="[currentSort === 'player_stats' && currentNested === 'DREB' ? 'sort' : '']">D
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'total_rebounds')" :class="[currentSort === 'player_stats' && currentNested === 'total_rebounds' ? 'sort' : '']">Tot
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <th class="stat" @click="sortTable('player_stats', 'TO')" :class="[currentSort === 'player_stats' && currentNested === 'TO' ? 'sort' : '']">
                TO
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'AST')" :class="[currentSort === 'player_stats' && currentNested === 'AST' ? 'sort' : '']">AST
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
              <th class="stat" @click="sortTable('player_stats', 'BLK')" :class="[currentSort === 'player_stats' && currentNested === 'BLK' ? 'sort' : '']">BLK
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <th class="stat" @click="sortTable('player_stats', 'STEAL')" :class="[currentSort === 'player_stats' && currentNested === 'STEAL' ? 'sort' : '']">
                STL
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>

              <th class="stat" @click="sortTable('player_stats', 'total_points')" :class="[currentSort === 'player_stats' && currentNested === 'total_points' ? 'sort' : '']">Total Pts
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-down']" class="icon" :class="[currentSortDir === 'asc' ? 'asc' : 'dsc']"></font-awesome-icon>
              </th>
            </tr>
          </template>

          <template v-slot:tbody>
            <tr v-for="(player, index) in newGameStats.player_stats" :key="index">
              <td class="text-center sticky" v-html="player.player_number"></td>
              <td class="align-no-pad sticky" v-html="player.player_first_name"></td>
              <td class="align-no-pad sticky" v-html="player.player_last_name"></td>
              <!-- <td v-for="(stat, idx) in player.player_stats" :key="idx">
                {{stat}}
              </td> -->

              <!-- 2PT -->
              <td class="stat light first">
                <input v-if="edit === true" type="checkbox" v-model="player.player_stats.game_played" />
                <template v-else>
                  <font-awesome-icon v-if= "player.player_stats['game_played']" :icon=" ['fas', 'check']  " class="icon"></font-awesome-icon>
                </template>
              </td>
              <td class="stat light first">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats['FGM']" />
                <template v-else>{{player.player_stats['FGM']}}</template>
              </td>
              <td class="stat light">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats['FGA']" />
                <template v-else>{{player.player_stats['FGA']}}</template>
              </td>
              <td class="stat light">{{percentage(player.player_stats['FGA'], player.player_stats['FGM'])}}</td>

              <!-- 3PT -->
              <td class="stat dark">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats['ThreePM']" />
                <template v-else>{{player.player_stats['ThreePM']}}</template>
              </td>
              <td class="stat dark">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats['ThreePA']" />
                <template v-else>{{player.player_stats['ThreePA']}}</template>
              </td>
              <td class="stat dark">{{percentage(player.player_stats['ThreePA'], player.player_stats['ThreePM'])}}</td>

              <!-- FT -->
              <td class="stat light">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.FTM" />
                <template v-else>{{player.player_stats.FTM}}</template>
              </td>
              <td class="stat light">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.FTA" />
                <template v-else>{{player.player_stats.FTA}}</template>
              </td>
              <td class="stat light">{{percentage(player.player_stats.FTA, player.player_stats.FTM)}}</td>

              <!-- Rebounds -->
              <td class="stat dark">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.OREB" />
                <template v-else>{{player.player_stats.OREB}}</template>
              </td>
              <td class="stat dark">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.DREB" />
                <template v-else>{{player.player_stats.DREB}}</template>
              </td>
              <td class="stat dark">
                <template v-if="edit === true">{{totalRebounds(player.player_stats.OREB, player.player_stats.DREB)}}</template>
                <template v-else>{{player.player_stats.total_rebounds}}</template>
              </td>

              <td class="stat">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.TO" />
                <template v-else>{{player.player_stats.AST}}</template>
              </td>

              <td class="stat">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.AST" />
                <template v-else>{{player.player_stats.AST}}</template>
              </td>
              <td class="stat">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.BLK" />
                <template v-else>{{player.player_stats.BLK}}</template>
              </td>
              <td class="stat">
                <input v-if="edit === true" type="number" min="0" v-model.number="player.player_stats.STEAL" />
                <template v-else>{{player.player_stats.STEAL}}</template>
              </td>
              <td class="stat">
                <template v-if="edit === true">{{totalPoints(player.player_stats['FGM'], player.player_stats['ThreePM'], player.player_stats.FTM)}} </template>
                <template v-else>{{player.player_stats.total_points}}</template>
              </td>

            </tr>
          </template>

          <template v-slot:tfoot>
            <tr>
              <td colspan="4"></td>
              <td>{{teamTotal('FGM')}}</td>
              <td>{{teamTotal('FGA')}}</td>
              <td>%</td>

              <td>{{teamTotal('ThreePM')}}</td>
              <td>{{teamTotal('ThreePA')}}</td>
              <td>%</td>

              <td>{{teamTotal('FTM')}}</td>
              <td>{{teamTotal('FTA')}}</td>
              <td>%</td>

              <td>{{teamTotal('OREB')}}</td>
              <td>{{teamTotal('DREB')}}</td>
              <td>{{teamTotal('total_rebounds')}}</td>

              <td>{{teamTotal('TO')}}</td>
              <td>{{teamTotal('AST')}}</td>
              <td>{{teamTotal('BLK')}}</td>
              <td>{{teamTotal('STEAL')}}</td>
              <td>{{teamTotal('total_points')}}</td>
            </tr>
          </template>

        </editTable>
        <modal :showModal="showModal" :modalTitle="modalTitle">
           <template v-slot:modalBody>
             <fileUpload :game_id="selectedGame.game_id" :team_id="selectedGame.rosterId"> </fileUpload>
           </template>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
// api
import api from '@/api/endpoints'
import _ from 'lodash'
import { mapState } from 'vuex'

// components
import editTable from '@/components/editTable'
import selectbox from '../selectbox'
import modal from '@/components/modal'
import fileUpload from '@/components/file_upload'

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
        page: 'stats'
      },
      currentNested: '',
      currentSort: '',
      currentSortDir: 'asc',
      edit: false,
      gameScore: {
        final_scores: {
          home_score: 0,
          away_score: 0
        },
        period_scores: [
          {
            period: '',
            homeScore: '',
            awayScore: ''
          }
        ]
      },
      newStats: {
        season: ''
      },
      newGameStats: {
        game_id: '',
        player_stats: []
      },
      overtimeCount: 1,
      pastGames: [
      ],
      quarters: [
        { 1: 0 },
        { 2: 0 },
        { 3: 0 },
        { 4: 0 }
      ],
      roster: [
      ],
      saved: false,
      saving: false,
      selectedGame: false,
      stats: [
      ],
      showModal: false,
      modalTitle: 'Import Stats'
    }
  },
  watch: {
    '$store.state.teamAssocLvl': {
      handler (newValue) {
        this.resetStats()
        this.initSchedule(this.newStats.season.season_id, this.team)
      },
      deep: true
    },
    'newStats.season': {
      handler (newValue) {
        this.resetStats()
        this.initSchedule(newValue.season_id, this.team)
      },
      deep: true
    },
    'gameScore.period_scores': {
      handler (newValue) {
        if (this.gameScore.final_scores.home_score === 0) {
          this.gameScore.final_scores.home_score = 0
          this.gameScore.period_scores.forEach(quarter => {
            this.gameScore.final_scores.home_score += isNaN(parseInt(quarter.home_score)) ? parseInt(0) : parseInt(quarter.home_score)
          })
        }

        if (this.gameScore.final_scores.away_score === 0) {
          this.gameScore.final_scores.away_score = 0
          this.gameScore.period_scores.forEach(quarter => {
            this.gameScore.final_scores.away_score += isNaN(parseInt(quarter.away_score)) ? parseInt(0) : parseInt(quarter.away_score)
          })
        }
      },
      deep: true
    },
    'gameScore.period_scores.away_score': {
      handler (newValue) {
        if (this.gameScore.final_scores.away_score === 0) {
          this.gameScore.final_scores.away_score = 0
          this.gameScore.period_scores.forEach(quarter => {
            this.gameScore.final_scores.away_score += isNaN(parseInt(quarter.away_score)) ? parseInt(0) : parseInt(quarter.away_score)
          })
        }
      },
      deep: true
    },
    newGameStats: {
      handler (newValue) {
        console.log(newValue.player_stats)
      },
      deep: true
    },
    user (newValue, oldValue) {
      if (this.newStats.season_id) {
        this.initSchedule(this.newStats.season_id, this.team)
      } else {
        this.selectedGame = false
      }
    },
    '$route.params.slug': {
      handler (newValue) {
        this.initSchedule(undefined, newValue)
      }
    }
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    team () {
      return this.$route.params.slug
    },
    teamAssocLvl () {
      return this.$store.state.teamAssocLvl.season_team_ids
    },
    sumPoints () {
      console.log('test location')
      return ''
    },
    ...mapState(['user'])
  },
  // mixins: [
  //   root
  // ],
  components: {
    editTable: editTable,
    selectbox: selectbox,
    modal: modal,
    fileUpload: fileUpload
  },
  created () {
    this.initSchedule(undefined, this.$route.params.slug)
    this.$root.$on('toggleModal', () => { this.showModal = !this.showModal })
    this.$root.$on('initNewGameStats', (teamId) => { this.initNewGameStats(teamId) })
  },
  methods: {
    initSchedule (level, team) {
      api.getSchedule(level, team).then(response => {
        const fixedData = []
        response.data.forEach(game => {
          if (game.home_team.slug === this.team) {
            game.opponent = game.away_team.team_name
            game.rosterId = game.home_team.team_id
            game.level = game.home_team.level_name
          } else {
            game.opponent = game.home_team.team_name
            game.rosterId = game.away_team.team_id
            game.level = game.away_team.level_name
          }

          fixedData.push(game)
        })
        console.log('fixedData', fixedData)
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
        const roster = []
        response.data.forEach(player => {
          const rosterObj = {
            player_id: player.uuid,
            player_number: player.number,
            player_last_name: player.last_name,
            player_first_name: player.first_name,
            player_stats: {
              // 'gs': false,
              FGM: '',
              FGA: '',
              ThreePM: '',
              ThreePA: '',
              FTM: '',
              FTA: '',
              OREB: '',
              DREB: '',
              AST: '',
              TO: '',
              BLK: '',
              STEAL: ''
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
      // console.log("here", game, this.team)
      this.newGameStats.game_id = game.game_id
      this.initNewGameStats(game.rosterId)
      this.selectedGame = game

      if (game.home_team.slug === this.team) {
        this.boxscore = true
      }
    },
    addOvertime (homeScore, awayScore) {
      this.quarters.push({ ['OT' + this.overtimeCount]: '' })
      console.log(this.quarters, 'quarters')
      this.gameScore.period_scores.push({
        period: 'OT' + this.overtimeCount,
        homeScore: this.homeScore !== undefined ? this.homeScore : '',
        awayScore: this.awayScore !== undefined ? this.awayScore : '',
        game_order: this.overtimeCount + 4
      })
      this.overtimeCount++
    },
    backToGameStats () {
      this.newGameStats.game_id = ''
      this.selectedGame = false
      this.boxscore = false
      this.currentNested = ''
      this.currentSort = ''
      this.currentSortDir = 'asc'
      this.selectedGame = false
      this.roster = []
    },
    goToPlayerStats () {
      this.boxscore = false
    },
    async initNewGameStats (rosterId) {
      await api.getGameResults(this.newGameStats.game_id, rosterId).then(response => {
        this.newGameStats = response.data
        if (this.newGameStats.final_scores.home_score !== null) {
          this.gameScore.final_scores.home_score = this.newGameStats.final_scores.home_score
          this.gameScore.final_scores.away_score = this.newGameStats.final_scores.away_score
        }
        if (this.newGameStats.game_scores !== null) {
          this.gameScore.period_scores = this.newGameStats.game_scores
          if (this.gameScore.period_scores.length > 4) {
            const quarterAdd = this.gameScore.period_scores.length - 4

            for (var i = 1; i <= quarterAdd; i++) {
              this.addOvertime()
            }
            // } else if (this.gameScore.length < 4 && this.gameScore.length > 0) {
            //   this.gameScore.forEach(period => {

          //   })
          } else if (this.gameScore.period_scores.length === 0) {
            this.gameScore.period_scores = [
              {
                game_id: '',
                period: 1,
                home_score: 0,
                away_score: 0,
                game_order: 0
              },
              {
                game_id: '',
                period: 2,
                home_score: 0,
                away_score: 0,
                game_order: 0
              },
              {
                game_id: '',
                period: 3,
                home_score: 0,
                away_score: 0,
                game_order: 0
              },
              {
                game_id: '',
                period: 4,
                home_score: 0,
                away_score: 0,
                game_order: 0
              }
            ]
          }
        }
      })
    },
    resetStats () {
      this.currentNested = ''
      this.currentSort = ''
      this.currentSortDir = 'asc'
      this.selectedGame = false
      this.roster = []
      this.pastGames = []
    },
    saveStats () {
      this.saving = true
      const finalScores = { final_scores: {} }

      if (this.boxscore === true) {
        // finalScores.final_scores = {
        //   home_score: this.gameScore.final_scores.final,
        //   away_score: this.gameScore.awayTeam.final
        // }
        finalScores.final_scores = { ...this.gameScore.final_scores }
      }
      // const quarterScores = { game_scores: [] }

      // const quarter_scores = []
      // this.gameScore.homeTeam

      const playerStats = _.cloneDeep(this.newGameStats)

      const flattenedStats = []
      playerStats.player_stats.forEach(player => {
        const newPlayer = { ...player, ...player.player_stats }
        delete newPlayer.player_stats

        flattenedStats.push(newPlayer)
      })

      playerStats.player_stats = flattenedStats

      // console.log({...finalScores}, finalScores)
      let stats = {}
      stats = { ...playerStats, ...finalScores }

      // console.log('sent stats', JSON.stringify(stats))

      api.addGameResults(this.newGameStats.game_id, stats)
        .then(response => {
          this.saving = false

          this.saved = true
          window.setTimeout(() => {
            this.edit = false
            this.saved = false
          }, 3000)
        })
    },
    percentage (attempted, made) {
      if (attempted >= 1) {
        return ((made / attempted) * 100).toFixed(1)
      } else {
        return 0
      }
    },
    teamTotal (stat) {
      let total = 0
      this.newGameStats.player_stats.forEach(player => {
        total += (parseInt(_.get(player.player_stats, stat)) || 0)
      })

      return total
    },
    totalPoints (twos, threes, fts) {
      const twoPT = twos * 2
      const threePT = threes * 3
      const ftPT = fts * 1

      return twoPT + threePT + ftPT
    },
    totalRebounds (val1, val2) {
      if (val1 === undefined) {
        val1 = 0
      }

      if (val2 === undefined) {
        val2 = 0
      }

      return parseInt(val1) + parseInt(val2)
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

      this.newGameStats.player_stats.sort((a, b) => {
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
    toggleModal () {
      // console.log('edit pressed')
      this.showModal = !this.showModal
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@teamColor: var(--bg-color);

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

header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  padding-top: 1rem;
  margin-bottom: .5rem;
  position: sticky;
    top: 0;
    z-index: 2;
    left: 0;
    background: #CFCDCD;
  h2 {
    display: inline-block;
  }
  .buttonCon {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    // height: 3rem;
}
  .switch {
    // height: 100%;
    // display: inline-block;
    // float: right;
    line-height: 1;
    transition: ease-in-out .3s all;
    [class^="fa-"],
    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    &:hover {
      transition: ease-in-out .3s all;
      transform: scale(1.3);
    }
    &.selected {
      color: var(--team-second);
      svg {
        filter: drop-shadow(2px 3px 6px var(--team-second));
      }
    }
  }
  // h2:after {
  //   content: '';
  //   display: block;
  //   height: 40px;
  //   /* width: 100%; */
  //   width: calc(100% + 2.4rem);
  //   border-top: 1.5px solid @teamColor;
  //   border-right: 2px solid @teamColor;
  //   border-left: 2px solid transparent;
  //   position: relative;
  //   -webkit-transform: skewX(-45deg);
  //   transform: skewX(-45deg);
  //   left: -23px;
  //   margin-top: .6rem;
  // }
}

.ghostHover (@color) {
  // margin-top: .5rem;
  // margin-bottom: .5rem;
  // border-color: @color;
  color: @color;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    color: var(--team-second);
    display: inline-block;
    // width: 0px;
    height: 0px;
    position: relative;
    // left: 2rem;
    bottom: -2rem;
    transform: scale(.85);
    // transition: ease-in-out .5s all;
  }
  &:hover {
    .focused {
      // width: 100%;
      height: 100%;
      // left: 0rem;
      bottom: 0;
      // padding-left: .5rem;
      transition: ease-in-out .5s all;
    }
  }
}
.switch {
  // background-color: var(--bg-color);
  // border-color: var(--bg-color);
  .ghostHover(@teamColor)
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
      &.rowOne {
        th {
          position: sticky;
          top: 60px;
          background-color: #CFCDCD;
          &.dark {
            .dark;
          }
          &.light {
            .light;
          }
        }
      }
      &.rowTwo {
        th {
          position: sticky;
          top: 99px;
          background-color: #CFCDCD;
        }
      }
    }
    th {
      font-weight: 200;
      line-height: 1;
      white-space: nowrap;
      padding-left: 1rem;
      padding-right: 1rem;

      z-index: 4;
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
    height: 50px;
    overflow: hidden;

    &.teamLogo {
      text-align: center;
      .imgCon {
          position: relative;
          height: 50px;
          background-color: rgba(255, 255, 255, 0.2);
          width: 150px;
          margin: auto;
          justify-content: center;
          align-items: center;
          overflow: hidden;
      }
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
  .boxScoreImg {
    height: 3.5rem;;
    width: auto;
  }
}
.quarter {
  width: 55px;
      &:nth-child(odd){
      background-color: rgba(255,255,255, .6);
    }
    &:nth-child(even){
      background-color: rgba(255,255,255, .8);
    }
}
.finalScore {
  width: 75px;
}
#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}

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
      z-index: 5;
    }
  }

#playerStats {
  margin-top: 5rem;
  // overflow: auto;
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
td, th {
  &.sticky {
    position: sticky;
    // left: 0;
  }
}

th {
  // font-family: @lato;
  font-weight: 200;
  font-size: .8rem;
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
// }
</style>
