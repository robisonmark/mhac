<template>
  <div class="">
    <header class="contentPad">
      <div class="buttonCon">
        <div class = "switch">

        </div>
      </div>
    </header>

    <div class="contentPad">
      <editTable :columns="columns" :config="config" :tabledata="tournamentGame" v-model="tournamentGame" :edit="edit" @lookup="updateBracket">

        <template v-slot:tbody>
            <tournamentGame v-for="(data, index) in games" :game="data" :key="index" />
            <template v-if="newGame">
              <tournamentGame :game=newTournamentGame :new_game=true @add-game="addGame" />
            </template>
            <div>
              <font-awesome-icon :icon="['fas', 'plus']" class="icon" @click="newGame = !newGame"></font-awesome-icon>
              Add Tournament Game
            </div>

        </template>
      </editTable>
    </div>

    <div class="tournamentSchedule">
      <!-- <button @click="save()">
        Save
      </button> -->
    </div>
  </div>
</template>

<script>
import Admin from '@/api/admin'

import editTable from '@/components/editTable'
// import selectbox from '../selectbox'
import tournamentGame from './tournamentGame'

import _ from 'lodash'

// mixins
// import { root } from '@/mixins/root'

export default {
  name: 'adminTournament',
  data () {
    return {
      games: [],
      oldBracket: [],
      newGame: false,
      columns: [
        {
          name: 'Game_Number',
          field_name: 'game',
          type: 'number'
        },
        {
          name: 'Date',
          field_name: 'date',
          type: 'date'
        },
        {
          name: 'Time',
          field_name: 'time',
          type: 'time'
        },
        {
          name: 'Description',
          field_name: 'Game Description',
          type: 'text'
        },
        {
          name: 'Home Seed',
          field_name: 'matchup.team1Seed',
          type: 'text'
        },
        {
          name: 'Home Team',
          field_name: 'matchup.team1',
          type: 'text'
        },
        {
          name: 'Away Seed',
          field_name: 'matchup.team2Seed',
          type: 'text'
        },
        {
          name: 'Away team',
          field_name: 'matchup.team2',
          type: 'text'
        },
        {
          name: 'Home Score',
          field_name: 'matchup.team1Score',
          type: 'number'
        },
        {
          name: 'Away Score',
          field_name: 'matchup.team2Score',
          type: 'number'
        },
        {
          name: 'Winner To Game',
          field_name: 'matchup.winners_to',
          type: 'text'
        },
        {
          name: 'Loser To Game',
          field_name: 'matchup.losers_to',
          type: 'text'
        },
        {
          name: 'Tournament Level',
          field_name: 'tournament',
          type: 'text'
        },
        {
          name: 'Display',
          field_name: 'display',
          type: 'boolean'
        }
      ],
      config: {
        page: 'tournament'
      },
      tournament: [],
      newTournamentGame: {
        logical_game_number: '',
        game: '',
        date: '',
        time: '',
        game_description: '',
        matchup: {
          // team1: '',
          // team1Seed: '',
          // team2: '',
          // team2Seed: '',
          // winner_to: '',
          // loser_to: ''
        },
        location: {
          address: '',
          name: ''
        },
        seasons: {},
        display: false
      },
      tournamentGame: {},
      edit: false,
      activeTournaments: []
    }
  },
  components: {
    editTable: editTable,
    // selectbox: selectbox,
    tournamentGame: tournamentGame
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    levels () {
      const levels = [{ season_id: '', level: 'All Levels' }, ...this.$store.state.seasons]
      return levels
    },
    fourteenUBoys () {
      return this.games.filter(game => { return game.level === '14U Boys' })
    },
    sixteenUBoys () {
      return this.games.filter(game => { return game.level === '16U Boys' })
    },
    eighteenUBoys () {
      return this.games.filter(game => { return game.level === '18U Boys' })
    },
    eighteenUGirls () {
      return this.games.filter(game => { return game.level === '18U Girls' })
    }
  },
  watch: {
  },
  created () {
    this.initTourney()
    this.$root.$on('toggleEdit', () => { this.edit = !this.edit })
    this.$root.$on('newGame', () => { this.newGame = !this.newGame })
  },
  methods: {
    toggleEdit () {
      this.edit = !this.edit
    },
    initTourney () {
      this.thinking = true
      // this.$router.push('/manage/chattanooga_patriots')
      Admin.getTournamentInformation().then(response => {
        this.games = response.data.games
      })
        .catch(err => {
          console.log(err)
        })
    },
    updateBracket (game) {
      if (game.matchup.scoreTeam1 !== '' && game.matchup.scoreTeam2 !== '') {
        const winner = this.results(game.matchup)
        const loser = game.matchup.team1 === winner ? game.matchup.team2 : game.matchup.team1

        let winnerStr = 'Winner Game'
        let loserStr = 'Loser Game'
        const gameNumber = game.game

        winnerStr = winnerStr.concat(' ', gameNumber)
        loserStr = loserStr.concat(' ', gameNumber)

        this.games.forEach(indGame => {
          if (indGame.matchup.team1 === winnerStr) {
            this.oldBracket.push(_.cloneDeep(indGame))
            indGame.matchup.team1 = winner
          } else if (indGame.matchup.team2 === winnerStr) {
            this.oldBracket.push(_.cloneDeep(indGame))
            indGame.matchup.team2 = winner
          }
        })

        this.games.forEach(indGame => {
          if (indGame.matchup.team1 === loserStr) {
            this.oldBracket.push(_.cloneDeep(indGame))
            indGame.matchup.team1 = loser
          } else if (indGame.matchup.team2 === loserStr) {
            this.oldBracket.push(_.cloneDeep(indGame))
            indGame.matchup.team2 = loser
          }
        })
      } else if (this.oldBracket.length > 0) {
        this.games.forEach(indGame => {
          if (indGame.game === this.oldBracket[0].game) {
            indGame.matchup.team1 = this.oldBracket[0].matchup.team1
            indGame.matchup.team2 = this.oldBracket[0].matchup.team2
          }

          if (indGame.game === this.oldBracket[1].game) {
            indGame.matchup.team1 = this.oldBracket[1].matchup.team1
            indGame.matchup.team2 = this.oldBracket[1].matchup.team2
          }
        })
      }
    },
    results (matchup) {
      if (parseInt(matchup.scoreTeam1) > parseInt(matchup.scoreTeam2)) {
        return matchup.team1
      } else {
        return matchup.team2
      }
    },
    addGame (game) {
      console.log(game)
      this.games.push(game)
    },
    newLookup () {

    },
    lookupTeam (teamSeed, seasonId, team) {
      // TODO: Figure out Use
      console.log(seasonId)
      // console.log("LookupTeam:", teamSeed, this.game.seasons.season_id)
      if (teamSeed !== null && this.game.seasons.season_id !== undefined) {
        Admin.getTeamByStandings(this.game.seasons.season_id, teamSeed).then(response => {
          // console.log("Lookup team", team, response.data.team_name)
          if (team === 1) {
            this.game.matchup.team1 = response.data.team_name
          }
          if (team === 2) {
            this.game.matchup.team2 = response.data.team_name
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

@import '../../assets/less/utils/variables.less';
@import '../../assets/less/utils/breakpoints.less';

main{
  display:flex;
  flex-direction:row;
}
.round{
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:200px;
  list-style:none;
  padding:0;
}

.round .spacer{ flex-grow:1; }
.round .spacer:first-child,
.round .spacer:last-child{ flex-grow:.5; }

.round .game-spacer{
  flex-grow:1;
}

/*
 *  General Styles
*/
body{
  font-family:sans-serif;
  font-size:small;
  padding:10px;
  line-height:1.4em;
}

li.game{
  padding-left:20px;
}

li.game.winner{
  font-weight:bold;
}
li.game span{
  float:right;
  margin-right:5px;
}

li.game-top{ border-bottom:1px solid #aaa; }

li.game-spacer{
  border-right:1px solid #aaa;
  min-height:40px;
}

li.game-bottom{
  border-top:1px solid #aaa;
}

table {
  // margin-top: -40px;
  &:before {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    width: calc(100% + 2.4rem);
    border-left: 2px solid transparent;
    position: absolute;
    -webkit-transform: skewX(-45deg);
    transform: skewX(-45deg);
    top: 0;
    right: -20px;
    z-index: 5;
  }
}

#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}

@media @phone{

}

</style>
