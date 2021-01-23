<template>
  <div class="">
    <header class="contentPad">
      
      <!-- CREATE A Tournament

      
      <br/>
  
      <ul v-for="(tournament, index) in this.activeTournaments" :key="index">
        <li>{{ tournament.season.level + ' ' + tournament.year }} </li>
      </ul> -->

      <div class="buttonCon">
        <div class="switch" v-if="edit === false"  @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="edit = !edit">
          <font-awesome-icon :icon="['fas', 'check']" class="icon"></font-awesome-icon>
          <span class="focused">Done Editing</span>

        </div>
      </div>
    </header>


    <div class="contentPad">
      <!-- <ul v-for="(tournament, index) in this.activeTournaments" :key="index">
        <li>{{ tournament.season.level + ' ' + tournament.year }} </li>
      </ul> -->
      <editTable :columns="columns" :config="config" :tabledata="tournamentGame" v-model="tournamentGame" :edit="edit" >
<!--         
        <template slot="tbody" v-if="!edit">
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
              </tr>
            </tbody>
          </table>

        </template>
         -->
        <template slot="tbody" v-if="edit">
          <tr v-for="(data, index) in games" :key="index">
            <!-- <td>
              {{data}}
            </td> -->
            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="data.seasons"></selectbox>
            </td>
            <td class="input-con">
              <input type="date" v-model="data.date" />
            </td>
            <td class="input-con">
              <input type="time" v-model="data.time" />
            </td>
            <td class="input-con">
              <input type="int" v-model="data.matchup.team1Seed" />
            </td>
            <td class="input-con">
              <input type="int" v-model="data.matchup.team2Seed" />
            </td>
            <td>
              {{data.matchup.team1}}
            </td>
            <td class="input-con">
              <input type="int" v-model="data.matchup.team1Score" />
            </td>
            <td>
              {{data.matchup.team2}}
            </td>
            <td class="input-con">
              <input type="int" v-model="data.matchup.team2Score" />
            </td>
            <td class="input-con">
              <input type="int" v-model="data.matchup.winner_to" />
            </td>
            <td class="input-con">
              <input type="int" v-model="data.matchup.loser_to" />
            </td>
          </tr>
          
          <!-- <tr>

            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newTournamentGame.seasons"></selectbox>
            </td>
            <td class="input-con">
              <input type="date" v-model="newTournamentGame.date" />
            </td>
            <td class="input-con">
              <input type="time" v-model="newTournamentGame.time" />
            </td>
            <td class="input-con">
              <input type="int" v-model="newTournamentGame.matchup.team1Seed" />
            </td>
            <td class="input-con">
              <input type="int" v-model="newTournamentGame.matchup.team2Seed" />
            </td>
            <td class="input-con">
              <input type="int" v-model="newTournamentGame.matchup.team1Score" />
            </td>
            <td class="input-con">
              <input type="int" v-model="newTournamentGame.matchup.team2Score" />
            </td>
            <td class="input-con">
              <input type="int" v-model="newTournamentGame.matchup.winner_to" />
            </td>
            <td class="input-con">
              <input type="int" v-model="newTournamentGame.matchup.loser_to" />
            </td>
          </tr> -->



          <!-- <tr v-for="(data,index) in sixteenUBoys" :key="index">
            <td class="input-con">
              {{data}}
            </td>
            <td class="input-con">
              <input type="date" v-model="data.game_date" />
            </td>
            <td class="input-con">
              <input type="time" v-model="data.game_time" />
            </td>
            <td class="input-con">
              SELECT HIGH SEEDED SCHOOL
            </td>
            <td class="input-con">
              <!-- <selectbox id="tournaments" :options="levels" :trackby="'level'" placeholder="Select Level" v-model="data.season"></selectbox> -->
              <!-- <input type='text' v-model="data.team1Seed" />
            </td>         
            <td class="input-con">
              SELECT LOWER SEEDED SCHOOL
            </td>
            <td class="input-con">
              <!-- <selectbox id="tournaments" :options="levels" :trackby="'level'" placeholder="Select Level" v-model="data.season"></selectbox> -->
              <!-- <input type='text' v-model="data.team2Seed" />
            </td>   
            <td class="input-con">
              <selectbox id="tournaments" :options="levels" :trackby="'level'" placeholder="Select Level" v-model="data.season"></selectbox>
            </td>
          </tr> -->
        </template>
      </editTable>
    </div>


    <div class="tournamentSchedule">
      <button @click="save()">
        Save
      </button>
        <!-- <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">14U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th>Level</th>
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
            </tr>
          </tbody>
        </table>-->


              <!-- <th class="final">Final Score</th> -->
              <!-- <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th> -->
            <!-- </tr>
          </thead> -->
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
            <!-- </tr>
          </tbody>
        </table> -->
<!-- 
        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">18U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th> -->
              <!-- <th class="final">Final Score</th> -->
              <!-- <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th> -->
            <!-- </tr>
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
              </td> -->
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
            <!-- </tr>
          </tbody>
        </table> -->

        <!-- <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">18U Girls</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th> -->
              <!-- <th class="final">Final Score</th> -->
              <!-- <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th> -->
            <!-- </tr>
          </thead>
          <tbody> -->
            <!-- <template>
              <tableRow v-model="game"></tableRow>
            </template> -->
            <!-- <tr v-for="(game, index) in eighteenUGirls" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span v-html="game.matchup.team1"></span>
                <input v-model.number="game.matchup.scoreTeam1" @blur="updateBracket(game)" />
                vs.
                <span v-html="game.matchup.team2"></span>
                <input v-model.number="game.matchup.scoreTeam2" @blur="updateBracket(game)" />
              </td> -->
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
            <!-- </tr>
          </tbody>
        </table> -->
      </div>
  </div>
</template>

<script>
import { api } from '@/api/endpoints'

import editTable from '@/components/editTable'
import selectbox from '../selectbox'

import _ from 'lodash'

// mixins
import { root } from '@/mixins/root'

export default {
  data () {
    return {
      games: [],
      oldBracket: [],
      columns: [
        // {
        //   name: 'Data',
        //   field_name: 'Data',
        //   type: 'text'
        // },
        {
          name: 'Game',
          field_name: 'game',
          type: 'text'
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
          name: 'Home Seed',
          field_name: 'matchup.team1Seed',
          type: 'text'
        },
        {
          name: 'Away Seed',
          field_name: 'matchup.team2Seed',
          type: 'text'
        },
        {
          name: 'Home Team',
          field_name: 'matchup.team1',
          type: 'text'
        },
        {
          name: 'Home Score',
          field_name: 'matchup.team1Score',
          type: 'text'
        },
        {
          name: 'Away team',
          field_name: 'matchup.team2',
          type: 'text'
        },
        {
          name: 'Away Score',
          field_name: 'matchup.team2Score',
          type: 'text'
        },
        {
          name: 'Winner From Game',
          field_name: 'matchup.winners_from',
          type: 'text'
        },
        {
          name: 'Loser From Game',
          field_name: 'matchup.losers_from',
          type: 'text'
        },
      ],
      config: {
        page: 'tournament'
      },
      tournament:[],
      newTournamentGame: {
          game: 1, 
          date: '', 
          time: '', 
          game_description: '', 
          matchup: { 
            team1: '', 
            scoreTeam1: '', 
            team1Seed: '', 
            team2: '', 
            scoreTeam2: '', 
            team2Seed: '', 
            winner_to: '', 
            loser_to: '' 
          }, 
          location: { 
            address: '', 
            name: ''
          }, 
          seasons: {}
      },
      tournamentGame: {},
      edit: false,
      activeTournaments: []
    }
  },
  components: {
    editTable: editTable,
    selectbox: selectbox
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    // tournaments () {
    //   let t = []
    //   api.getActiveTournaments().then(response => {
    //     // this.activeTournaments = response.data
    //     t = response.data
    //   })
    //   return t
    // },
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
    this.getActiveTournaments()
    this.initTourney()
  },
  methods: {
    getActiveTournaments() {
      api.getActiveTournaments().then(response => {
        response.data.forEach(season => {
          this.activeTournaments.push(season)
        })
      })
    },
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


// header {
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: space-between;
//   width: 100%;
//   padding-top: 1rem;
//   margin-bottom: .5rem;
//   position: sticky;
//     top: 0;
//     z-index: 2;
//     left: 0;
//     background: #CFCDCD;
//   .buttonCon {
//     flex-grow: 1;
//     display: flex;
//     justify-content: flex-end;
//     // height: 3rem;
//   }
// }

table {
  // margin-top: -40px;
  &:before {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    width: calc(100% + 2.4rem);
    // border-top: 1.5px solid @teamColor;
    // border-right: 2px solid @teamColor;
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

#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}


</style>
