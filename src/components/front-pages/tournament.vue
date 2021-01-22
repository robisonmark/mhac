<template>
   <div class="container">
     <div class="page-styles">
      <h2>MHAC Conference Tournament Information - 2021</h2>
      <h5><a href="static/docs/MHAC Conference 2021 Tournament.pdf" class="download" download type="application/pdf">Download Tournament Packet</a></h5>
      <p>There will be four tournaments. The semi-final and championship games will be played at Madison Church of Christ, 106 Gallatin Pike N, Madison, TN 37115. The first round games of the tournament will be played at the higher seeds home gym once seeding has been determined.  We will be charging a gate fee to help offset the cost of the tournament.  Madison CoC will be hosting a concession stand there for those wanting a meal, snack or drink.
      </p>

      <p> 
        The tournament schedule is based on 8 teams for 18U(HSV) boys, 6 teams for 16u(HSJV) boys, 7 teams for 14U(MSV) boys and 4 teams for 18U(HSV) girls.
      </p>

      <p>
        <b>Gate fees:</b>
        <ul>
          <li>Daily Adult - $10</li>
          <li>Daily Student - $7</li>
          <li>Families with 5 or more - $34</li>
          <li>Tournament Adult(2 days) - $17</li>
          <li>Tournament Student(2 days) - $11</li>
          <li>Tournament Family with 5 or more - $60 </li>
          <li>6 years old and under will get in free</li>
        </ul>

        There will be a total of 16 games in the tournament, Friday Feb 12 & Saturday 13th.
      </p>
      <p>
        <b>Payment Methods</b>
         <ul>
           <li> We will be setting up the Square app to be able to pay at the gate using a debit or credit card</li>
           <li> We will also take checks made out to “Hendersonville Royals” with “Tournament Gate” in the memo line</li>
         </ul>

      </p>
        Please <a href="static/docs/MHAC Conference 2021 Tournament.pdf" class="download" download type="application/pdf">download the tournament packet</a> for more information.
      </p>
      
      <br />

      <p>
         Don't forget to order merchandise for the 2020-2021 tournament. This year we are offering T-Shirts, Crewneck Sweatshirts, and Hoodies. To order, visit <a href="https://mhac-merch.square.site/">https://mhac-merch.square.site</a>.  
      </p>
      <div class="tournamentSchedule">
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
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in fourteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td >
                <template v-if="game.matchup.team1 !== null || game.matchup.team2 !== null">
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                  vs.
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
                </template>
                <template v-else>
                  <span > {{game.game_description}} </span>
                </template>
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
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in sixteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                     <template v-if="game.matchup.team1 !== null || game.matchup.team2 !== null">
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                  vs.
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
                </template>
                <template v-else>
                  <span > {{game.game_description}} </span>
                </template>
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
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in eighteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
       <template v-if="game.matchup.team1 !== null || game.matchup.team2 !== null">
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                  vs.
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
                </template>
                <template v-else>
                  <span > {{game.game_description}} </span>
                </template>
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
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in eighteenUGirls" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <template v-if="game.matchup.team1 !== null || game.matchup.team2 !== null">
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                  vs.
                  <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
                </template>
                <template v-else>
                  <span > {{game.game_description}} </span>
                </template>
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
            </tr>
          </tbody>
        </table>
      </div>
      <div class="sponsors">
      </div>
    </div>
    <div class="bracketModal" v-if="showBracket">
      <div class="custom-select"  @click="showLevels = !showLevels">
        <div disabled>{{filterBy.level.level}}</div>
        <div class="options-menu">
          <template>
            <div class="option" v-for="lvl in levels" :key="lvl.season_id" v-show="showLevels" @click="setLvl(lvl)">
              {{lvl.level}}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../../api/endpoints.js'

export default {
  name: 'tournament2020',
  data () {
    return {
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
      showBracket: false
    }
  },
  computed: {
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
  created () {
    this.initTourney()
  },
  methods: {
    results (matchup) {
      if (parseInt(matchup.scoreTeam1) > parseInt(matchup.scoreTeam2)) {
        return matchup.team1
      } else {
        return matchup.team2
      }
    },
    initTourney () {
      // this.thinking = true
      // this.$router.push('/manage/chattanooga_patriots')
      api.getTournamentInformation().then(response => {
        this.games = response.data.games
      })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page-styles{
  min-height: 100vh;
  background-color: #fff;
  padding: 2rem 1rem;
  // margin-right: 1rem;
  // margin-left: 1rem;
}
h5 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.tournamentSchedule {
  margin-top: 4rem;
}
table {
  width: 100%;
  margin-bottom: 2rem;
  td, th {
    padding: .3rem .5rem;
  }
  th {
    font-weight: 200;
  }
  tbody tr {
    border-bottom: 1px solid #CFCDCD;
    // padding:.75rem;
  }
}
.winner {
  font-weight: 600;
}
.final {
  text-align: right;
  div{
    font-style: italic;
  }
}
.levelHead {
  padding:.75rem;
  background-color: rgba(39,132,195,1);
  color: #fff;
}
</style>
