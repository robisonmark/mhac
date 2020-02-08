<template>
  <div class="">
    <!-- <div class="bracket fourteenU">
      <ul v-for="(game, index) in fourteenUBoys" :key="index">
        <td>{{game.game}}</td>
        <td>{{game.date}}</td>
        <td>{{game.time}}</td>
        <td>
          <span v-html="game.matchup.team1"></span>
          vs.
          <span v-html="game.matchup.team2"></span>
        </td>
        <td class="final">
          <template v-if="game.matchup.scoreTeam1">
            {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
            <div>{{results(game.matchup)}}</div>
          </template>
          <template v-else>
            --
          </template>
        </td>
        <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
      </ul>
    </div> -->
    <div class="tournamentSchedule">
      <button @click="save()">
        Save
      </button>
        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">14U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <!-- <th></th> -->
              <!-- <th class="final">Final Score</th> -->
              <!-- <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in fourteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span v-html="game.matchup.team1"></span>
                <input v-model.number="game.matchup.scoreTeam1" @blur="updateBracket(game)" />
                vs.
                <span v-html="game.matchup.team2"></span>
                <input v-model.number="game.matchup.scoreTeam2" @blur="updateBracket(game)" />
              </td>
              <!-- <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template> -->
              <!-- </td> -->
              <!-- <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td> -->
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">16U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <!-- <th class="final">Final Score</th> -->
              <!-- <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in sixteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span v-html="game.matchup.team1"></span>
                <input v-model.number="game.matchup.scoreTeam1" @blur="updateBracket(game)" />
                vs.
                <span v-html="game.matchup.team2"></span>
                <input v-model.number="game.matchup.scoreTeam2" @blur="updateBracket(game)" />
              </td>
              <!-- <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template> -->
              <!-- </td> -->
              <!-- <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td> -->
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">18U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <!-- <th class="final">Final Score</th> -->
              <!-- <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in eighteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span v-html="game.matchup.team1"></span>
                <input v-model.number="game.matchup.scoreTeam1" @blur="updateBracket(game)" />
                vs.
                <span v-html="game.matchup.team2"></span>
                <input v-model.number="game.matchup.scoreTeam2" @blur="updateBracket(game)" />
              </td>
              <!-- <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template> -->
              <!-- </td> -->
              <!-- <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td> -->
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">18U Girls</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <!-- <th class="final">Final Score</th> -->
              <!-- <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <template>
              <tableRow v-model="game"></tableRow>
            </template> -->
            <tr v-for="(game, index) in eighteenUGirls" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span v-html="game.matchup.team1"></span>
                <input v-model.number="game.matchup.scoreTeam1" @blur="updateBracket(game)" />
                vs.
                <span v-html="game.matchup.team2"></span>
                <input v-model.number="game.matchup.scoreTeam2" @blur="updateBracket(game)" />
              </td>
              <!-- <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template> -->
              <!-- </td> -->
              <!-- <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td> -->
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { api } from '@/api/endpoints'
import _ from 'lodash'

export default {
  data () {
    return {
      game: [],
      oldBracket: []
    }
  },
  components: {
  },
  computed: {
    levels () {
      const levels = [{season_id: '', level: 'All Levels'}, ...this.$store.state.seasons]
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
    }
  },
  created () {
    this.initTourney()
  },
  methods: {
    initTourney () {
      this.thinking = true
      // this.$router.push('/manage/chattanooga_patriots')
      api.getTournamentInformation().then(response => {
        this.games = response.data.games
      })
        .catch(err => {
          console.log(err)
        })
    },
    updateBracket (game) {
      // this.oldBracket = _.cloneDeep(this.games)
      if (game.matchup.scoreTeam1 !== '' && game.matchup.scoreTeam2 !== '') {
        let winner = this.results(game.matchup)
        let loser = game.matchup.team1 === winner ? game.matchup.team2 : game.matchup.team1

        let winnerStr = 'Winner Game'
        let loserStr = 'Loser Game'
        let gameNumber = game.game

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
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
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
</style>
