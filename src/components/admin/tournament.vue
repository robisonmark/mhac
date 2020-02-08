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
      // game: []
      games: [
        {
          game: '1',
          date: 'Feburary 6th',
          time: '10:00 am',
          matchup: {
            team1: 'Chattanooga Patriots',
            scoreTeam1: '17',
            team2: 'Tennessee Heat',
            scoreTeam2: '36'
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '2',
          date: 'Feburary 6th',
          time: '11:00 am',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '23',
            team2: 'Nashville Warriors',
            scoreTeam2: '49'
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '3',
          date: 'Feburary 6th',
          time: '12:00 pm',
          matchup: {
            team1: 'Hendersonville Royals',
            scoreTeam1: '35',
            team2: 'Daniel 1 Academy',
            scoreTeam2: '52'
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '4',
          date: 'Feburary 6th',
          time: '1:00 pm',
          matchup: {
            team1: 'Life Christian Academy',
            scoreTeam1: '24',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: '68'
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '5',
          date: 'Feburary 6th',
          time: '8:00 am',
          matchup: {
            team1: 'Nashville Warriors',
            scoreTeam1: '33',
            team2: 'Chattanooga Patriots',
            scoreTeam2: '53'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '6',
          date: 'Feburary 6th',
          time: '9:30 am',
          matchup: {
            team1: 'Tennessee Heat',
            scoreTeam1: '53',
            team2: 'Hendersonville Royals',
            scoreTeam2: '55'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '7',
          date: 'Feburary 6th',
          time: '11:00 am',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '40',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: '50'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '8',
          date: 'Feburary 6th',
          time: '12:30 pm',
          matchup: {
            team1: 'Daniel 1 Academy',
            scoreTeam1: '29',
            team2: 'Life Christian Academy',
            scoreTeam2: '60'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '9',
          date: 'Feburary 6th',
          time: '2:00 pm',
          matchup: {
            team1: 'Daniel 1 Academy',
            scoreTeam1: '55',
            team2: 'Hendersonville Royals',
            scoreTeam2: '47'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '10',
          date: 'Feburary 6th',
          time: '3:00 pm',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '41',
            team2: 'Tennessee Heat',
            scoreTeam2: '43'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '11',
          date: 'Feburary 6th',
          time: '4:00 pm',
          matchup: {
            team1: 'Life Christian Academy',
            scoreTeam1: '',
            team2: 'Chattanooga Patriots',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '12',
          date: 'Feburary 6th',
          time: '12:30 pm',
          matchup: {
            team1: 'Western Kentucky Trailblazers',
            scoreTeam1: '',
            team2: 'Bye',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '13',
          date: 'Feburary 7th',
          time: '8:00 am',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '',
            team2: 'Hendersonville Royals',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '14',
          date: 'Feburary 7th',
          time: '9:00 am',
          matchup: {
            team1: 'Chattanooga Patriots',
            scoreTeam1: '',
            team2: 'Life Christian Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '15',
          date: 'Feburary 7th',
          time: '10:00 am',
          matchup: {
            team1: 'Nashville Warriors',
            scoreTeam1: '',
            team2: 'Daniel 1 Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '16',
          date: 'Feburary 7th',
          time: '11:00 am',
          matchup: {
            team1: 'Tennessee Heat',
            scoreTeam1: '',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '17',
          date: 'Feburary 7th',
          time: '12:00 pm',
          matchup: {
            team1: 'Winner Game 10',
            scoreTeam1: '',
            team2: 'Winner Game 11',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '18',
          date: 'Feburary 7th',
          time: '1:00 pm',
          matchup: {
            team1: 'Winner Game 9',
            scoreTeam1: '',
            team2: '#1 Seed',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '19',
          date: 'Feburary 7th',
          time: '2:00 pm',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '',
            team2: ' Nashville Warriors',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '20',
          date: 'Feburary 7th',
          time: '3:30 pm',
          matchup: {
            team1: 'Daniel 1 Academy',
            scoreTeam1: '',
            team2: 'Chatanooga Patriots',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '21',
          date: 'Feburary 7th',
          time: '5:00 pm',
          matchup: {
            team1: 'Tennessee Heat',
            scoreTeam1: '',
            team2: 'Covenant Christian Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '22',
          date: 'Feburary 7th',
          time: '6:30 pm',
          matchup: {
            team1: 'Nashville Warriors',
            scoreTeam1: '',
            team2: 'Daniel 1 Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '23',
          date: 'Feburary 7th',
          time: '8:00 pm',
          matchup: {
            team1: 'Hendersonville Royals',
            scoreTeam1: '',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '24',
          date: 'Feburary 7th',
          time: '9:30 pm',
          matchup: {
            team1: 'Chattanooga Patriots',
            scoreTeam1: '',
            team2: 'Life Christian Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '25',
          date: 'Feburary 8th',
          time: '8:00 am',
          matchup: {
            team1: 'Loser Game 10',
            scoreTeam1: '',
            team2: 'Loser Game 11',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '26',
          date: 'Feburary 8th',
          time: '9:00 am',
          matchup: {
            team1: 'Loser Game 19',
            scoreTeam1: '',
            team2: 'Loser Game 20',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '27',
          date: 'Feburary 8th',
          time: '10:00 am',
          matchup: {
            team1: 'Loser Game 9',
            scoreTeam1: '',
            team2: 'Winner Game 25',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '28',
          date: 'Feburary 8th',
          time: '12:00 pm',
          matchup: {
            team1: 'Winner Game 15',
            scoreTeam1: '',
            team2: 'Winner Game 16',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '29',
          date: 'Feburary 8th',
          time: '2:00 pm',
          matchup: {
            team1: 'Winner Game 17',
            scoreTeam1: '',
            team2: 'Winner Game 18',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '30',
          date: 'Feburary 8th',
          time: '4:00 pm',
          matchup: {
            team1: 'Winner Game 19',
            scoreTeam1: '',
            team2: 'Winner Game 20',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '31',
          date: 'Feburary 8th',
          time: '6:00 pm',
          matchup: {
            team1: 'Winner Game 23',
            scoreTeam1: '',
            team2: 'Winner Game 24',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        }
      ],
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
    games: {
      deep: true,
      handler (newValue, oldValue) {
        // let newgames = _.cloneDeep(this.games)
        // newValue.forEach(game => {
        //   // console.log(game.matchup)
        //   let winner = ''
        //   let loser = ''
        //   let level = ''
        //   if (game.matchup.hasOwnProperty('scoreTeam1')) {
        //     winner = this.results(game.matchup)
        //     loser = game.matchup.team1 === winner ? game.matchup.team2 : game.matchup.team1
        //     level = game.level
        //   }

        //   // console.log(winner)
        //   console.log(loser)
        //   console.log(level)

        //   let nextGameForWinner = this.games.filter(item => item.matchup.team1 === 'Winner Game ' + game.game)

        //   console.log(nextGameForWinner)
        // })
      }
    }
  },
  created () {
    // this.initTourney()
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
